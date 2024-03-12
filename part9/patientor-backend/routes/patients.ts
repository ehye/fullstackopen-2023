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

export default patientsRouter;
