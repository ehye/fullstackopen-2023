import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { Gender, Patient } from '../../types';
import patientService from '../../services/patients';

const PatientDetail = () => {
  let { id } = useParams();
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    patientService
      .getById(id!)
      .then(res => setPatient(res))
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

  return (
    <>
      {patient ? (
        <>
          <h2>
            {patient.name} {genderIcon(patient.gender)}
          </h2>
          <p>ssn: {patient.ssn}</p>
          <p>occupation: {patient.occupation}</p>
        </>
      ) : (
        <div>loading...</div>
      )}
    </>
  );
};

export default PatientDetail;
