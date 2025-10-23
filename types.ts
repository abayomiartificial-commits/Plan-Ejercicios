
export enum ExerciseType {
    Strength = 'Fuerza y Potencia',
    Balance = 'Equilibrio y Marcha',
    Cardio = 'Resistencia Cardiovascular',
    Flexibility = 'Flexibilidad y Movilidad'
}

export interface Exercise {
    id: string;
    name: string;
    description: string;
    type: ExerciseType;
    videoUrl: string;
}

export interface WorkoutExercise {
    exerciseId: string;
    sets?: number;
    reps?: string;
    duration?: string;
    rest: number; // in seconds
}

export interface DailyWorkout {
    day: number;
    name: string;
    exercises: WorkoutExercise[];
}

export enum ProgramLevel {
    A = 'A - Limitación Grave',
    B = 'B - Limitación Moderada',
    C1 = 'C1 - Limitación Leve (Fase 1)',
    C2 = 'C2 - Limitación Leve (Fase 2)',
    D = 'D - Sin Limitación'
}

export interface UserProfile {
    program: ProgramLevel;
    fallRisk: boolean;
    week: number;
}

export enum AppState {
    Evaluation,
    Dashboard,
    Workout,
    WorkoutSummary
}
