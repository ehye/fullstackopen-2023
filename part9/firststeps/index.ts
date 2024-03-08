import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import { isNumber } from './utils';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  const bmi = calculateBmi(req.query);
  res.send(bmi);
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body;
  const isNumberArray = (daily_exercises as Array<number>).every(e => isNumber(e));

  if (isNumber(target) && isNumberArray) {
    const result = calculateExercises({ dailyExerciseHours: daily_exercises, targetAmount: target });
    res.send(result);
  } else {
    res.send({ error: 'malformatted parameters' });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
