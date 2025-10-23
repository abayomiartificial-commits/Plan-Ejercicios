
import React, { useState, useEffect } from 'react';
import { DailyWorkout, WorkoutExercise } from '../types';
import { EXERCISES } from '../constants';
import StopIcon from './icons/StopIcon';
import WarningIcon from './icons/WarningIcon';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';

interface WorkoutPlayerProps {
  workout: DailyWorkout;
  onFinish: () => void;
}

const WorkoutPlayer: React.FC<WorkoutPlayerProps> = ({ workout, onFinish }) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [restTime, setRestTime] = useState(0);

  const currentWorkoutExercise: WorkoutExercise = workout.exercises[currentExerciseIndex];
  const exerciseDetails = EXERCISES[currentWorkoutExercise.exerciseId];
  
  useEffect(() => {
    let timer: number;
    if (isResting && restTime > 0) {
      timer = window.setTimeout(() => setRestTime(r => r - 1), 1000);
    } else if (isResting && restTime === 0) {
      setIsResting(false);
      if (currentExerciseIndex < workout.exercises.length - 1) {
          setCurrentExerciseIndex(i => i + 1);
      } else {
          onFinish();
      }
    }
    return () => clearTimeout(timer);
  }, [isResting, restTime, currentExerciseIndex, onFinish, workout.exercises.length]);

  const handleNext = () => {
    if (currentWorkoutExercise.rest > 0) {
        setRestTime(currentWorkoutExercise.rest);
        setIsResting(true);
    } else {
        if (currentExerciseIndex < workout.exercises.length - 1) {
            setCurrentExerciseIndex(i => i + 1);
        } else {
            onFinish();
        }
    }
  };

  const handlePrev = () => {
      setIsResting(false);
      setRestTime(0);
      setCurrentExerciseIndex(i => Math.max(0, i-1));
  }

  if (isResting) {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-4">
            <h2 className="text-4xl font-bold mb-4">Descanso</h2>
            <p className="text-9xl font-mono font-extrabold mb-8">{restTime}</p>
            <p className="text-xl">Siguiente ejercicio: {workout.exercises[currentExerciseIndex + 1] ? EXERCISES[workout.exercises[currentExerciseIndex + 1].exerciseId].name : 'Finalizar'}</p>
            <button onClick={() => setRestTime(0)} className="mt-8 px-6 py-2 bg-yellow-500 text-black font-semibold rounded-lg">Saltar Descanso</button>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
        <header className="bg-white dark:bg-gray-800 shadow-md p-4">
             <div className="max-w-5xl mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{workout.name}</h1>
                <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">{currentExerciseIndex + 1} / {workout.exercises.length}</span>
             </div>
        </header>

        <main className="flex-grow p-4 md:p-8 max-w-5xl mx-auto w-full">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                <div className="md:flex">
                    <div className="md:flex-shrink-0">
                        <img className="h-64 w-full object-cover md:w-80" src={exerciseDetails.videoUrl} alt={`Demostración de ${exerciseDetails.name}`} />
                    </div>
                    <div className="p-8">
                        <div className="uppercase tracking-wide text-sm text-blue-500 dark:text-blue-400 font-semibold">{exerciseDetails.type}</div>
                        <h2 className="block mt-1 text-3xl leading-tight font-extrabold text-black dark:text-white">{exerciseDetails.name}</h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">{exerciseDetails.description}</p>
                        
                        <div className="mt-6 flex items-center space-x-8 text-center">
                            {currentWorkoutExercise.sets && <div><p className="text-gray-500 dark:text-gray-400">Series</p><p className="text-2xl font-bold text-gray-900 dark:text-white">{currentWorkoutExercise.sets}</p></div>}
                            {currentWorkoutExercise.reps && <div><p className="text-gray-500 dark:text-gray-400">Repeticiones</p><p className="text-2xl font-bold text-gray-900 dark:text-white">{currentWorkoutExercise.reps}</p></div>}
                            {currentWorkoutExercise.duration && <div><p className="text-gray-500 dark:text-gray-400">Duración</p><p className="text-2xl font-bold text-gray-900 dark:text-white">{currentWorkoutExercise.duration}</p></div>}
                            <div><p className="text-gray-500 dark:text-gray-400">Descanso</p><p className="text-2xl font-bold text-gray-900 dark:text-white">{currentWorkoutExercise.rest}s</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <footer className="p-4 bg-white dark:bg-gray-800 shadow-inner">
            <div className="max-w-5xl mx-auto flex justify-between items-center">
                <button onClick={handlePrev} disabled={currentExerciseIndex === 0} className="p-4 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed">
                    <ChevronLeftIcon className="h-6 w-6"/>
                </button>
                <button onClick={handleNext} className="px-8 py-4 bg-green-600 text-white font-bold text-lg rounded-lg shadow-md hover:bg-green-700 transition-transform transform hover:scale-105">
                    {currentExerciseIndex === workout.exercises.length - 1 ? 'Finalizar' : 'Siguiente'}
                </button>
                <button onClick={onFinish} className="p-4 rounded-full bg-red-500 text-white hover:bg-red-600">
                     <StopIcon className="h-6 w-6" />
                </button>
            </div>
        </footer>

        <div className="fixed bottom-20 right-4 md:bottom-4 md:right-4 bg-yellow-100 dark:bg-yellow-900 border-l-4 border-yellow-500 text-yellow-800 dark:text-yellow-200 p-4 rounded-md shadow-lg flex items-start max-w-sm">
            <WarningIcon className="h-6 w-6 mr-3 text-yellow-500 flex-shrink-0"/>
            <div>
                <p className="font-bold">Regla de "No Dolor"</p>
                <p className="text-sm">Pare inmediatamente si siente dolor de pecho, mareos, o falta de aire.</p>
            </div>
        </div>
    </div>
  );
};

export default WorkoutPlayer;
