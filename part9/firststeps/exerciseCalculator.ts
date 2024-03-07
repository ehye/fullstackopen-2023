import { isNotNumber } from './utils'

interface MultipleValues {
  dailyExerciseHours: Array<number>
  targetAmount: number
}

const parseArguments = (args: string[]): MultipleValues => {
  if (args.length < 12) throw new Error('Not enough arguments')
  if (args.length > 12) throw new Error('Too many arguments')

  let dailyExerciseHours: Array<number> = []
  for (let index = 3; index < args.length; index++) {
    if (!isNotNumber(args[index])) {
      dailyExerciseHours.push(Number(args[index]))
    } else {
      throw new Error('Provided values were not numbers!')
    }
  }

  return {
    dailyExerciseHours,
    targetAmount: Number(args[2]),
  }
}

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
  console.log(dailyExerciseHours, 'length:', dailyExerciseHours.length)

  const trainingDays = dailyExerciseHours.filter(x => x > 0).length
  const average = dailyExerciseHours.reduce((a, b) => a + b, 0) / dailyExerciseHours.length
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

const { dailyExerciseHours, targetAmount } = parseArguments(process.argv)

console.log(calculateExercises(dailyExerciseHours, targetAmount))
