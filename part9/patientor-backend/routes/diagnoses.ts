import express from 'express';
import data from '../data/diagnose';

const diaRouter = express.Router();

diaRouter.get('/', (_req, res) => {
  res.json(data);
});

export default diaRouter;
