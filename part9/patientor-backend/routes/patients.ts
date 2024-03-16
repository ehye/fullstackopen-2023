import express from 'express';
import patientService from '../services/patientService';
import { isGender, isDate } from '../utils';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  res.json(patientService.getNonSensitiveEntries());
});

patientsRouter.get('/:id', (req, res) => {
  res.json(patientService.getPatientById(req.params.id));
});

patientsRouter.post('/', (req, res) => {
  const { dateOfBirth, gender, name, occupation, ssn } = req.body;
  if (isGender(gender) && isDate(dateOfBirth)) {
    const addedEntry = patientService.addPatient({ dateOfBirth, gender, name, occupation, ssn, entries: [] });
    res.json(addedEntry);
  } else {
    res.status(400).end();
  }
});

patientsRouter.post('/:id/entries', (req, res) => {
  const id = req.params.id;
  const entry = req.body;
  const addedEntry = patientService.addEntity({ id, entry });
  if (typeof addedEntry === 'string') {
    res.status(400).json(addedEntry);
  } else res.json(addedEntry);
});

export default patientsRouter;
