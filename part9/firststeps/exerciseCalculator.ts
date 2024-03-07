interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const calculateExercises = (dailyExerciseHours: Array<number>, targetAmount: number): Result => {
  const trainingDays = dailyExerciseHours.filter(x => x > 0).length
  const average = dailyExerciseHours.reduce((a, b) => a + b) / 7
  const ratingDescription = [
    'try harder',
    'congratulation you have finish the training ',
    'not too bad but could be better',
  ]
  const success = average >= targetAmount

  const rating = average >= targetAmount ? 1 : average + 1 >= targetAmount ? 2 : 0

  return {
    periodLength: dailyExerciseHours.length,
    trainingDays,
    success,
    rating,
    ratingDescription: ratingDescription[rating],
    target: targetAmount,
    average,
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
