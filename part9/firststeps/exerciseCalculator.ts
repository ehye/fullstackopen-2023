interface MultipleValues {
  dailyExerciseHours: Array<number>;
  targetAmount: number;
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (args: MultipleValues): Result | { error: string } => {
  const { dailyExerciseHours, targetAmount } = args;

  const trainingDays = dailyExerciseHours.filter(x => x > 0).length;
  const average = dailyExerciseHours.reduce((a, b) => a + b, 0) / dailyExerciseHours.length;
  const ratingDescription = [
    'try harder',
    'congratulation you have finish the training ',
    'not too bad but could be better',
  ];
  const success = average >= targetAmount;

  const rating = average >= targetAmount ? 1 : average + 1 >= targetAmount ? 2 : 0;

  return {
    periodLength: dailyExerciseHours.length,
    trainingDays,
    success,
    rating,
    ratingDescription: ratingDescription[rating],
    target: targetAmount,
    average,
  };
};
