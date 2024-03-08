import express from 'express';
import diaRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';

const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const baseUrl = '/api';
const PORT = 3001;

app.get(`${baseUrl}/ping`, (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use(`${baseUrl}/diagnoses`, diaRouter);
app.use(`${baseUrl}/patients`, patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
