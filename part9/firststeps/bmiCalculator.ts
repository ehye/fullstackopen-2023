/* eslint-disable */
import { isNotNumber } from "./utils";

interface BmiValues {
  height: number;
  mass: number;
}

interface BmiResult {
  weight: number;
  height: number;
  bmi: string;
}

const parseArguments = (args: any): BmiValues | { error: string } => {
  if (args.length < 2) throw new Error("Not enough arguments");
  if (args.length > 2) throw new Error("Too many arguments");

  if (!isNotNumber(args.height) && !isNotNumber(args.weight)) {
    return {
      height: Number(args.height),
      mass: Number(args.weight),
    };
  } else {
    return {
      error: "malformatted parameters",
    };
  }
};

export const calculateBmi = (args: any): BmiResult | { error: string } => {
  const arg = parseArguments(args);
  let result;
  if ("height" in arg) {
    const bmi = arg.mass / Math.pow(arg.height / 100, 2);
    result = {
      weight: arg.mass,
      height: arg.height,
      bmi: "",
    };

    if (bmi < 16.0) {
      result.bmi = "Underweight (Severe thinness)";
    } else if (16.0 <= bmi && bmi <= 16.9) {
      result.bmi = "Underweight (Moderate thinness)";
    } else if (17 <= bmi && bmi <= 18.4) {
      result.bmi = "Underweight (Mild thinness)";
    } else if (18.5 <= bmi && bmi <= 24.9) {
      result.bmi = "Normal (healthy weight)";
    } else if (25 <= bmi && bmi <= 29.9) {
      result.bmi = "Overweight";
    } else if (30.0 <= bmi && bmi <= 34.9) {
      result.bmi = "Obesity (Class I) ";
    } else if (35.0 <= bmi && bmi <= 39.9) {
      result.bmi = "Obesity (Class II) ";
    } else if (bmi >= 40) {
      result.bmi = "Obesity (Class III) ";
    }
  } else {
    result = arg;
  }

  return result;
};
