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

console.log(calculateBmi(180, 74))
