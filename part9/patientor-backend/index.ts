import express from 'express';
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
