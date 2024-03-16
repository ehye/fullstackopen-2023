import { Diagnose, OccupationalHealthcareEntry } from '../../types';
import WorkIcon from '@mui/icons-material/Work';

const OccupationalHealthcareItem = ({
  entry,
  diagnosis,
}: {
  entry: OccupationalHealthcareEntry;
  diagnosis: Array<Diagnose>;
}) => {
  return (
    <div>
      {entry.date} <WorkIcon /> {entry.employerName}
      <p>{entry.description}</p>
      {entry.diagnosisCodes?.map(code => (
        <li key={entry.id}>
          {code} {diagnosis.find(d => d.code === code)?.name}
        </li>
      ))}
    </div>
  );
};

export default OccupationalHealthcareItem;
