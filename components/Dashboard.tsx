
import React from 'react';
import { UserProfile, DailyWorkout } from '../types';
import WarningIcon from './icons/WarningIcon';
import HeartIcon from './icons/HeartIcon';
import PlayIcon from './icons/PlayIcon';
import DumbbellIcon from './icons/DumbbellIcon';

interface DashboardProps {
  profile: UserProfile;
  routine: DailyWorkout[];
  onStartWorkout: (workout: DailyWorkout) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ profile, routine, onStartWorkout }) => {
  const todayWorkout = routine[0] || null; // Simplified: always shows first day

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 text-gray-800 dark:text-gray-200">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Bienvenido a SeniorFit</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mt-2">Su plan de entrenamiento personalizado está listo.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-3 flex items-center"><DumbbellIcon className="mr-3 text-blue-500"/>Su Programa</h2>
          <p className="text-5xl font-extrabold text-blue-600 dark:text-blue-400">{profile.program.split(' ')[0]}</p>
          <p className="text-gray-500 dark:text-gray-400">{profile.program.split('-')[1].trim()}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-3 flex items-center"><WarningIcon className="mr-3 text-yellow-500"/>Riesgo de Caídas</h2>
          {profile.fallRisk ? (
            <div className="text-yellow-600 dark:text-yellow-400">
              <p className="text-2xl font-bold">Refuerzo Activado</p>
              <p className="text-sm">Su programa incluye ejercicios adicionales para mejorar el equilibrio y la estabilidad.</p>
            </div>
          ) : (
            <div className="text-green-600 dark:text-green-400">
              <p className="text-2xl font-bold">Bajo Riesgo</p>
              <p className="text-sm">Su programa mantiene un enfoque preventivo estándar.</p>
            </div>
          )}
        </div>
      </div>

      {todayWorkout ? (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Entrenamiento de Hoy: <span className="text-blue-600 dark:text-blue-400">{todayWorkout.name}</span></h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Esta sesión está diseñada para mejorar su fuerza, equilibrio y resistencia. ¡Vamos a empezar!</p>
          <button
            onClick={() => onStartWorkout(todayWorkout)}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-green-600 text-white font-bold text-lg rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition-transform transform hover:scale-105"
          >
            <PlayIcon className="h-8 w-8" />
            Comenzar Entrenamiento
          </button>
        </div>
      ) : (
         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
            <HeartIcon className="h-16 w-16 mx-auto text-gray-400 mb-4"/>
            <h2 className="text-2xl font-bold mb-2">Día de Descanso</h2>
            <p className="text-gray-600 dark:text-gray-400">No hay un entrenamiento programado para hoy. Aproveche para descansar o realizar una caminata ligera.</p>
        </div>
      )}

       <div className="mt-8 bg-blue-100 dark:bg-blue-900 border-l-4 border-blue-500 text-blue-800 dark:text-blue-200 p-4 rounded-md" role="alert">
          <p className="font-bold">Recordatorio de Seguridad</p>
          <p>Escuche a su cuerpo. Deténgase inmediatamente si siente dolor en el pecho, mareos o dificultad para respirar.</p>
        </div>
    </div>
  );
};

export default Dashboard;
