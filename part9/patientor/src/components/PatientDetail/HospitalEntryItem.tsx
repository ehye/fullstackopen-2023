import { Diagnose, HospitalEntry } from '../../types';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

const HospitalEntryItem = ({ entry, diagnosis }: { entry: HospitalEntry; diagnosis: Array<Diagnose> }) => {
  return (
    <div>
      {entry.date} <MedicalServicesIcon />
      <p>{entry.description}</p>
      {entry.diagnosisCodes?.map(code => (
        <li>
          {code} {diagnosis.find(d => d.code === code)?.name}
        </li>
      ))}
    </div>
  );
};

export default HospitalEntryItem;
