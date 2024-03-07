import { isNotNumber } from './utils'

interface BmiValues {
  height: number
  mass: number
}

const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments')
  if (args.length > 4) throw new Error('Too many arguments')

  if (!isNotNumber(args[2]) && !isNotNumber(args[3])) {
    return {
      height: Number(args[2]),
      mass: Number(args[3]),
    }
  } else {
    throw new Error('Provided values were not numbers!')
  }
}

const calculateBmi = (height: number, mass: number): string => {
  const bmi = mass / Math.pow(height / 100, 2)
  let result: string

  if (bmi < 16.0) {
    result = 'Underweight (Severe thinness)'
  } else if (16.0 <= bmi && bmi <= 16.9) {
    result = 'Underweight (Moderate thinness)'
  } else if (17 <= bmi && bmi <= 18.4) {
    result = 'Underweight (Mild thinness)'
  } else if (18.5 <= bmi && bmi <= 24.9) {
    result = 'Normal (healthy weight)'
  } else if (25 <= bmi && bmi <= 29.9) {
    result = 'Overweight'
  } else if (30.0 <= bmi && bmi <= 34.9) {
    result = 'Obesity (Class I) '
  } else if (35.0 <= bmi && bmi <= 39.9) {
    result = 'Obesity (Class II) '
  } else if (bmi >= 40) {
    result = 'Obesity (Class III) '
  }

  return result
}

const { height, mass } = parseArguments(process.argv)
console.log(calculateBmi(height, mass))
