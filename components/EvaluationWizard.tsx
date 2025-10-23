
import React, { useState } from 'react';
import { UserProfile, ProgramLevel } from '../types';
import { MEDICAL_CONTRAINDICATIONS } from '../constants';
import WarningIcon from './icons/WarningIcon';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import InfoIcon from './icons/InfoIcon';

interface EvaluationWizardProps {
  onComplete: (profile: UserProfile) => void;
}

const EvaluationWizard: React.FC<EvaluationWizardProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [medicalAnswers, setMedicalAnswers] = useState<Record<string, boolean>>({});
  const [fallRiskAnswers, setFallRiskAnswers] = useState({ falls: '', tug: '', speed: '' });
  const [sppbScore, setSppbScore] = useState(0);

  const handleMedicalChange = (item: string) => {
    setMedicalAnswers(prev => ({ ...prev, [item]: !prev[item] }));
  };

  const hasAbsoluteContraindication = MEDICAL_CONTRAINDICATIONS.absolute.some(item => medicalAnswers[item]);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const calculateProfile = () => {
    let program = ProgramLevel.C1; // Default
    if (sppbScore <= 3) program = ProgramLevel.A;
    else if (sppbScore <= 6) program = ProgramLevel.B;
    else if (sppbScore <= 9) program = ProgramLevel.C1;
    else program = ProgramLevel.D;

    const fallRisk = (parseInt(fallRiskAnswers.falls) >= 2 || parseInt(fallRiskAnswers.tug) > 20 || parseFloat(fallRiskAnswers.speed) < 0.8);
    
    onComplete({ program, fallRisk, week: 1 });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Paso 1: Filtro de Seguridad Médica</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Por favor, marque cualquier condición que aplique. Es crucial para su seguridad.</p>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">Contraindicaciones Absolutas</h3>
              {MEDICAL_CONTRAINDICATIONS.absolute.map(item => (
                <label key={item} className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600">
                  <input type="checkbox" className="h-5 w-5 rounded text-blue-600 focus:ring-blue-500" onChange={() => handleMedicalChange(item)} checked={!!medicalAnswers[item]} />
                  <span className="ml-3 text-gray-700 dark:text-gray-200">{item}</span>
                </label>
              ))}
               {hasAbsoluteContraindication && (
                <div className="mt-4 p-4 bg-red-100 dark:bg-red-900 border-l-4 border-red-500 text-red-700 dark:text-red-200 rounded-md flex items-start">
                  <WarningIcon className="h-6 w-6 mr-3 text-red-500"/>
                  <p>Ha seleccionado una condición que representa un riesgo grave. Le recomendamos encarecidamente que **consulte a su médico** antes de comenzar cualquier programa de ejercicios.</p>
                </div>
              )}
            </div>
            <div className="mt-8">
                <button onClick={nextStep} disabled={hasAbsoluteContraindication} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed">
                    Siguiente
                </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Paso 2: Valoración de Riesgo de Caídas</h2>
             <p className="text-gray-600 dark:text-gray-300 mb-6">Responda honestamente para ayudarnos a ajustar su programa.</p>
            <div className="space-y-4">
                <div>
                    <label className="font-semibold text-gray-700 dark:text-gray-200">¿Cuántas caídas ha tenido en el último año?</label>
                    <input type="number" value={fallRiskAnswers.falls} onChange={e => setFallRiskAnswers({...fallRiskAnswers, falls: e.target.value})} className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Ej: 0"/>
                </div>
                <div>
                    <label className="font-semibold text-gray-700 dark:text-gray-200 flex items-center">Tiempo en Test "Levantarse y Caminar" (TUG) en segundos <InfoIcon className="h-5 w-5 ml-2 text-gray-400"/></label>
                     <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Mida cuánto tarda en levantarse, caminar 3m, volver y sentarse.</p>
                    <input type="number" value={fallRiskAnswers.tug} onChange={e => setFallRiskAnswers({...fallRiskAnswers, tug: e.target.value})} className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Ej: 15"/>
                </div>
                <div>
                    <label className="font-semibold text-gray-700 dark:text-gray-200">Velocidad de marcha (m/s). Si no la sabe, deje en blanco.</label>
                    <input type="number" step="0.1" value={fallRiskAnswers.speed} onChange={e => setFallRiskAnswers({...fallRiskAnswers, speed: e.target.value})} className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Ej: 1.2"/>
                </div>
            </div>
          </div>
        );
        case 3:
        return (
            <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Paso 3: Capacidad Funcional (SPPB Simplificado)</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Realice estas pruebas sencillas para estimar su nivel.</p>
                <div className="space-y-4">
                    <div>
                        <label className="font-semibold text-gray-700 dark:text-gray-200">Equilibrio: ¿Puede mantenerse sobre una pierna por 10 segundos?</label>
                        <select onChange={e => setSppbScore(s => s + parseInt(e.target.value))} className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            <option value="0">No, o menos de 3 seg</option>
                            <option value="2">Sí, entre 3 y 9 seg</option>
                            <option value="4">Sí, 10 seg o más</option>
                        </select>
                    </div>
                    <div>
                        <label className="font-semibold text-gray-700 dark:text-gray-200">Fuerza: ¿Cuántas veces puede levantarse de una silla en 30 segundos sin usar las manos?</label>
                         <select onChange={e => setSppbScore(s => s + parseInt(e.target.value))} className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            <option value="0">No puedo o menos de 5</option>
                            <option value="2">Entre 5 y 10</option>
                            <option value="4">11 o más</option>
                        </select>
                    </div>
                     <div>
                        <label className="font-semibold text-gray-700 dark:text-gray-200">Velocidad: ¿Camina 4 metros en menos de 5 segundos?</label>
                         <select onChange={e => setSppbScore(s => s + parseInt(e.target.value))} className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            <option value="0">No, tardo más de 8 segundos</option>
                            <option value="2">Tardo entre 5 y 8 segundos</option>
                            <option value="4">Sí, menos de 5 segundos</option>
                        </select>
                    </div>
                </div>
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-8 bg-white dark:bg-gray-800 shadow-xl rounded-2xl">
      <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(step / 3) * 100}%` }}></div>
          </div>
      </div>
      
      {renderStep()}

      <div className="mt-8 flex justify-between items-center">
        {step > 1 ? (
          <button onClick={prevStep} className="flex items-center text-gray-600 dark:text-gray-300 font-semibold hover:text-blue-600">
            <ChevronLeftIcon className="h-5 w-5 mr-2"/> Anterior
          </button>
        ) : <div/>}
        {step < 3 && (
            <button onClick={nextStep} className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300">
                Siguiente
            </button>
        )}
        {step === 3 && (
            <button onClick={calculateProfile} className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition duration-300">
                Finalizar y Ver mi Programa
            </button>
        )}
      </div>
    </div>
  );
};

export default EvaluationWizard;
