
import React, { useState, useMemo } from 'react';
import { AppState, UserProfile, ProgramLevel, DailyWorkout } from './types';
import EvaluationWizard from './components/EvaluationWizard';
import Dashboard from './components/Dashboard';
import WorkoutPlayer from './components/WorkoutPlayer';
import Modal from './components/Modal';
import { ROUTINES } from './constants';
import HeartIcon from './components/icons/HeartIcon';
import DumbbellIcon from './components/icons/DumbbellIcon';


const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.Evaluation);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [currentWorkout, setCurrentWorkout] = useState<DailyWorkout | null>(null);
  const [isSummaryModalOpen, setSummaryModalOpen] = useState(false);

  const handleEvaluationComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setAppState(AppState.Dashboard);
  };

  const handleStartWorkout = (workout: DailyWorkout) => {
      setCurrentWorkout(workout);
      setAppState(AppState.Workout);
  }

  const handleFinishWorkout = () => {
      setAppState(AppState.WorkoutSummary);
      setSummaryModalOpen(true);
  }
  
  const handleCloseSummary = () => {
      setSummaryModalOpen(false);
      setAppState(AppState.Dashboard);
      setCurrentWorkout(null);
  }

  const routineForUser = useMemo(() => {
    if (!userProfile) return [];
    return ROUTINES[userProfile.program] || [];
  }, [userProfile]);

  const renderContent = () => {
    switch (appState) {
      case AppState.Evaluation:
        return <EvaluationWizard onComplete={handleEvaluationComplete} />;
      case AppState.Dashboard:
        if (userProfile) {
          return <Dashboard profile={userProfile} routine={routineForUser} onStartWorkout={handleStartWorkout} />;
        }
        return null; // Should not happen
      case AppState.Workout:
        if (currentWorkout) {
            return <WorkoutPlayer workout={currentWorkout} onFinish={handleFinishWorkout} />
        }
        return null; // Should not happen
      case AppState.WorkoutSummary:
         if (userProfile) {
          return <Dashboard profile={userProfile} routine={routineForUser} onStartWorkout={handleStartWorkout} />;
        }
        return null;
      default:
        return <div>Error: Estado desconocido</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
      <div className="container mx-auto px-4 py-8">
        {renderContent()}
      </div>
       <Modal
            isOpen={isSummaryModalOpen}
            onClose={handleCloseSummary}
            title="¡Entrenamiento Completado!"
        >
            <div className="text-center">
                <HeartIcon className="h-16 w-16 text-green-500 mx-auto mb-4"/>
                <p className="text-lg mb-4">¡Excelente trabajo! Ha completado su sesión de hoy.</p>
            </div>
            <div className="mt-6 p-4 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <h4 className="font-bold text-blue-800 dark:text-blue-200 flex items-center"><DumbbellIcon className="mr-2"/>Recordatorio Nutricional</h4>
                <p className="mt-2 text-blue-700 dark:text-blue-300">
                    Para optimizar la recuperación y el crecimiento muscular, considere consumir una comida o un batido rico en proteínas dentro de la próxima hora.
                </p>
            </div>
        </Modal>
    </div>
  );
};

export default App;
