import patientData from '../data/patients';
import { Patient, NewPatientEntry, NonSensitivePatient, Entry, EntryWithoutId } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Patient[] = patientData;

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

const addEntity = ({ id, entry }: { id: string; entry: EntryWithoutId }): Entry | string | null => {
  const patient = patients.find(x => x.id === id);
  if (!patient) {
    return 'no such patient';
  }
  switch (entry.type) {
    case 'HealthCheck':
      if (!entry.healthCheckRating) {
        return "'healthCheckRating' field is required";
      }
      break;
    case 'OccupationalHealthcare':
      if (!entry.employerName) {
        return "'employerName' field is required";
      }
      if (!entry.sickLeave) {
        return "'sickLeave' field is required";
      }
      break;
    case 'Hospital':
      if (!entry.discharge) {
        return "'discharge' field is required";
      }
      break;
    default:
      return `Unhandled discriminated union member: ${JSON.stringify(entry)}`;
  }

  const addedEntry = {
    id: uuid(),
    ...entry,
  };
  patient.entries.push(addedEntry);
  patients.forEach(patient => {
    patient.id === id ? patient : patient;
  });

  return addedEntry;
};

export default { getPatientById, getNonSensitiveEntries, addPatient, addEntity };
