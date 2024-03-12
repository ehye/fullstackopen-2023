import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { Diagnose, Gender, Patient } from '../../types';
import patientService from '../../services/patients';
import diagnoseService from '../../services/diagnose';

const PatientDetail = () => {
  let { id } = useParams();
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

  const getDiagnose = (code: string): string => diagnosis.find(d => d.code === code)?.name ?? '';

  return (
    <>
      {patient ? (
        <>
          <h2>
            {patient.name} {genderIcon(patient.gender)}
          </h2>
          <p>ssn: {patient.ssn}</p>
          <p>occupation: {patient.occupation}</p>
          <h3>entries</h3>
          {patient.entries.map((entry, i) => (
            <div key={i}>
              {entry.date} {entry.description}
              {entry.diagnosisCodes?.map((code, j) => (
                <li key={j}>
                  {code} {getDiagnose(code)}
                </li>
              ))}
            </div>
          ))}
        </>
      ) : (
        <div>loading...</div>
      )}
    </>
  );
};

export default PatientDetail;
