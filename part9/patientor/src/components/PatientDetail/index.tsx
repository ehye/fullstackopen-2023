import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import Box from '@mui/material/Box';
import { Diagnose, Entry, Gender, Patient } from '../../types';
import patientService from '../../services/patients';
import diagnoseService from '../../services/diagnose';
import HospitalEntryItem from './HospitalEntryItem';
import HealthCheckEntryItem from './HealthCheckEntryItem';
import OccupationalHealthcareItem from './OccupationalHealthcareItem';
import EntryForm from './EntryForm';

const PatientDetail = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>();
  const [diagnosis, setDiagnosis] = useState<Diagnose[]>([]);

  useEffect(() => {
    patientService
      .getById(id!)
      .then(res => setPatient(res))
      .catch(error => {
        console.log(error);
      });

    diagnoseService
      .getAll()
      .then(res => setDiagnosis(res))
      .catch(error => {
        console.log(error);
      });
  }, []);

  const updateEntries = (addedEntry: Entry) => {
    if (patient) {
      setPatient({ ...patient, entries: [...patient.entries, addedEntry] });
      console.log('patient.entries:', patient.entries);
    }
  };

  const genderIcon = (gender: Gender) => {
    switch (gender) {
      case Gender.Male:
        return <MaleIcon />;
      case Gender.Female:
        return <FemaleIcon />;
      default:
        return <TransgenderIcon />;
    }
  };

  /**
   * Helper function for exhaustive type checking
   */
  const assertNever = (value: any): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
  };

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    const getDiagnose = (codes: Array<string> | undefined): Array<Diagnose> => {
      let result: Array<Diagnose>;
      result = [];
      codes?.forEach(code => {
        const diagnose = diagnosis.find(d => d.code === code);
        if (diagnose) {
          result.push(diagnose);
        }
      });
      return result;
    };

    switch (entry.type) {
      case 'Hospital':
        return <HospitalEntryItem entry={entry} diagnosis={getDiagnose(entry.diagnosisCodes)} />;
      case 'HealthCheck':
        return <HealthCheckEntryItem entry={entry} diagnosis={getDiagnose(entry.diagnosisCodes)} />;
      case 'OccupationalHealthcare':
        return <OccupationalHealthcareItem entry={entry} diagnosis={getDiagnose(entry.diagnosisCodes)} />;
      default:
        return assertNever(entry);
    }
  };

  return (
    <>
      {patient ? (
        <>
          <h2>
            {patient.name} {genderIcon(patient.gender)}
          </h2>
          <p>ssn: {patient.ssn}</p>
          <p>occupation: {patient.occupation}</p>
          <EntryForm afterCreate={updateEntries} />
          <h3>entries</h3>
          {patient.entries.map((entry, i) => (
            <Box key={i} sx={{ border: '2px solid grey', marginBottom: '10px', padding: '5px' }}>
              <EntryDetails entry={entry} />
              <div> diagnose by {entry.specialist}</div>
            </Box>
          ))}
        </>
      ) : (
        <div>loading...</div>
      )}
    </>
  );
};

export default PatientDetail;
