import express from 'express';
import patientService from '../services/patientService';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  res.json(patientService.getNonSensitiveEntries());
});

patientsRouter.post('/', (req, res) => {
  const { dateOfBirth, gender, name, occupation, ssn } = req.body;
  const addedEntry = patientService.addPatient({ dateOfBirth, gender, name, occupation, ssn });
  res.json(addedEntry);
});

export default patientsRouter;
