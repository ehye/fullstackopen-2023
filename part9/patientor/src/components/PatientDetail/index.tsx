import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { Box, Rating } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Diagnose, Entry, Gender, Patient } from '../../types';
import patientService from '../../services/patients';
import diagnoseService from '../../services/diagnose';
import { HealthCheckEntryItem, HospitalEntryItem, OccupationalHealthcareItem } from './EntryItems';
import HealthCheckEntryForm from './HealthCheckEntryForm';
import HospitalEntryForm from './HospitalEntryForm';
import OccupationalHealthcareForm from './OccupationalHealthcareForm';
import Togglable from '../Togglable';

const ITEM_HEIGHT = 64;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

export interface EntryFromProps {
  diagnosis: Array<Diagnose>;
  afterCreate: (addedEntry: Entry) => void;
}

interface TogglableProps {
  toggleVisibility: () => void;
}

function PatientDetail() {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>();
  const [diagnosis, setDiagnosis] = useState<Diagnose[]>([]);
  const entryFormRef = useRef<TogglableProps | undefined>();

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
          <Togglable buttonLabel="Add HealthCheck Entry" toggleButtonLabel="cancel" ref={entryFormRef}>
            <HealthCheckEntryForm afterCreate={updateEntries} diagnosis={diagnosis} />
          </Togglable>
          <Togglable buttonLabel="Add Hospital Entry" toggleButtonLabel="cancel" ref={entryFormRef}>
            <HospitalEntryForm afterCreate={updateEntries} diagnosis={diagnosis} />
          </Togglable>
          <Togglable buttonLabel="Add Occupational Healthcare Entry" toggleButtonLabel="cancel" ref={entryFormRef}>
            <OccupationalHealthcareForm afterCreate={updateEntries} diagnosis={diagnosis} />
          </Togglable>
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
}

export default PatientDetail;
