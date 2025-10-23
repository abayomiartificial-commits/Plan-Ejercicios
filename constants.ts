
import { Exercise, DailyWorkout, ProgramLevel, ExerciseType } from './types';

export const EXERCISES: Record<string, Exercise> = {
    'sit-to-stand': {
        id: 'sit-to-stand',
        name: 'Ponerse de Pie (Sit-to-Stand)',
        description: 'Sentado en una silla, levántese sin usar los brazos. Mantenga la espalda recta. Baje de forma controlada. Progrese a usar un solo brazo o ninguno para mayor dificultad.',
        type: ExerciseType.Strength,
        videoUrl: 'https://picsum.photos/seed/sit-to-stand/600/400'
    },
    'wall-push-up': {
        id: 'wall-push-up',
        name: 'Flexiones en la Pared',
        description: 'Párese frente a una pared, coloque las manos a la altura de los hombros. Flexione los codos para acercar el pecho a la pared y luego empuje para volver a la posición inicial.',
        type: ExerciseType.Strength,
        videoUrl: 'https://picsum.photos/seed/wall-push-up/600/400'
    },
    'bench-dips': {
        id: 'bench-dips',
        name: 'Fondos en Banco',
        description: 'De espaldas a una silla o banco, apoye las manos en el borde. Baje el cuerpo flexionando los codos hasta 90 grados y luego empuje hacia arriba. Mantenga las piernas estiradas para mayor dificultad.',
        type: ExerciseType.Strength,
        videoUrl: 'https://picsum.photos/seed/bench-dips/600/400'
    },
    'walking-lunges': {
        id: 'walking-lunges',
        name: 'Desplantes Caminando',
        description: 'Dé un paso adelante y baje las caderas hasta que ambas rodillas estén dobladas en un ángulo de 90 grados. La rodilla de atrás debe estar cerca del suelo. Impúlsese con la pierna delantera para dar el siguiente paso.',
        type: ExerciseType.Strength,
        videoUrl: 'https://picsum.photos/seed/walking-lunges/600/400'
    },
    'side-plank': {
        id: 'side-plank',
        name: 'Plancha Lateral',
        description: 'Acuéstese de lado, apoyado sobre su antebrazo y el costado del pie. Levante las caderas hasta que su cuerpo forme una línea recta. Mantenga la posición.',
        type: ExerciseType.Strength,
        videoUrl: 'https://picsum.photos/seed/side-plank/600/400'
    },
    'leg-swing': {
        id: 'leg-swing',
        name: 'Balanceo de Pierna',
        description: 'Apoyándose en una silla, balancee una pierna hacia adelante y hacia atrás de forma controlada. Luego, repita hacia los lados. Progrese a hacerlo sin apoyo.',
        type: ExerciseType.Balance,
        videoUrl: 'https://picsum.photos/seed/leg-swing/600/400'
    },
    'tandem-walk': {
        id: 'tandem-walk',
        name: 'Caminar en Tándem',
        description: 'Camine en línea recta colocando el talón de un pie justo delante de los dedos del otro. Use una pared como apoyo si es necesario.',
        type: ExerciseType.Balance,
        videoUrl: 'https://picsum.photos/seed/tandem-walk/600/400'
    },
    'one-leg-stand': {
        id: 'one-leg-stand',
        name: 'Equilibrio Unipodal',
        description: 'Párese sobre una pierna, manteniendo el equilibrio. Aumente la dificultad cruzando los brazos o cerrando los ojos (con supervisión).',
        type: ExerciseType.Balance,
        videoUrl: 'https://picsum.photos/seed/one-leg-stand/600/400'
    },
    'brisk-walk': {
        id: 'brisk-walk',
        name: 'Caminata Rápida',
        description: 'Camine a un ritmo constante y enérgico, lo suficiente para aumentar su ritmo cardíaco pero aún poder mantener una conversación.',
        type: ExerciseType.Cardio,
        videoUrl: 'https://picsum.photos/seed/brisk-walk/600/400'
    },
    'posture-stretch': {
        id: 'posture-stretch',
        name: 'Estiramiento Postural de Brazos',
        description: 'De pie o sentado, entrelace las manos y estire los brazos hacia arriba tanto como pueda. Mantenga la posición sintiendo el estiramiento en la espalda y los hombros.',
        type: ExerciseType.Flexibility,
        videoUrl: 'https://picsum.photos/seed/posture-stretch/600/400'
    },
    'hamstring-stretch': {
        id: 'hamstring-stretch',
        name: 'Estiramiento de Isquiotibiales',
        description: 'Sentado en el borde de una silla, estire una pierna con el talón en el suelo. Inclínese hacia adelante desde las caderas hasta sentir un estiramiento en la parte posterior del muslo.',
        type: ExerciseType.Flexibility,
        videoUrl: 'https://picsum.photos/seed/hamstring-stretch/600/400'
    },
};

export const ROUTINES: Record<ProgramLevel, DailyWorkout[]> = {
    [ProgramLevel.A]: [/* Rutinas para Limitación Grave no definidas en este ejemplo */],
    [ProgramLevel.B]: [/* Rutinas para Limitación Moderada no definidas en este ejemplo */],
    [ProgramLevel.C1]: [
        {
            day: 1,
            name: 'Día 1: Fuerza y Equilibrio',
            exercises: [
                { exerciseId: 'sit-to-stand', sets: 2, reps: '10', rest: 60 },
                { exerciseId: 'wall-push-up', sets: 2, reps: '10', rest: 60 },
                { exerciseId: 'leg-swing', duration: '30s por pierna', rest: 30 },
                { exerciseId: 'one-leg-stand', duration: '15s por pierna', rest: 30 },
                { exerciseId: 'brisk-walk', duration: '15 min', rest: 0 },
                { exerciseId: 'posture-stretch', sets: 2, reps: 'Mantener 15s', rest: 15 },
                { exerciseId: 'hamstring-stretch', sets: 2, reps: 'Mantener 15s', rest: 15 },
            ]
        },
         {
            day: 2,
            name: 'Día 2: Descanso Activo',
            exercises: [
                { exerciseId: 'brisk-walk', duration: '20 min', rest: 0 },
                { exerciseId: 'posture-stretch', sets: 2, reps: 'Mantener 15s', rest: 15 },
            ]
        },
        {
            day: 3,
            name: 'Día 3: Entrenamiento Funcional',
            exercises: [
                { exerciseId: 'sit-to-stand', sets: 2, reps: '12', rest: 60 },
                { exerciseId: 'walking-lunges', sets: 2, reps: '8 por pierna', rest: 75 },
                { exerciseId: 'tandem-walk', duration: '2 min', rest: 30 },
                { exerciseId: 'one-leg-stand', duration: '20s por pierna', rest: 30 },
                { exerciseId: 'brisk-walk', duration: '15 min', rest: 0 },
                { exerciseId: 'hamstring-stretch', sets: 2, reps: 'Mantener 15s', rest: 15 },
            ]
        },
    ],
    [ProgramLevel.C2]: [/* Rutinas para C2 no definidas en este ejemplo */],
    [ProgramLevel.D]: [/* Rutinas para Sin Limitación no definidas en este ejemplo */],
};

export const MEDICAL_CONTRAINDICATIONS = {
  absolute: [
    'Infarto de miocardio reciente (<1 mes)',
    'Hipertensión arterial no controlada (>180/110 mmHg)',
    'Fractura reciente que impide el ejercicio',
    'Angina inestable',
    'Embolia pulmonar reciente'
  ],
  relative: [
    'Dolor articular crónico severo',
    'Enfermedad cardíaca conocida (consultar médico)',
    'Uso de medicamentos que afectan el equilibrio',
    'Problemas de visión no corregidos'
  ]
};
