import patients from '../data/patients';
import { Patient, NewPatientEntry, NonSensitivePatient } from '../types';
import { v1 as uuid } from 'uuid';

const getPatientById = (id: string): NonSensitivePatient | undefined => patients.find(x => x.id === id);

const getNonSensitiveEntries = (): NonSensitivePatient[] =>
  patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries: [],
  }));

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default { getPatientById, getNonSensitiveEntries, addPatient };
