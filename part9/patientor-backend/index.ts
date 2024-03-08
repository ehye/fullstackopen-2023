import express from 'express';
import data from './data/diagnose';

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

app.get(`${baseUrl}/diagnoses`, (_req, res) => {
  const diagnose = data;
  res.json(diagnose);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
