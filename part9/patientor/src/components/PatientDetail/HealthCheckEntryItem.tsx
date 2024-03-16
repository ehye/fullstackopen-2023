import { Diagnose, HealthCheckEntry } from '../../types';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

const HealthCheckEntryItem = ({ entry, diagnosis }: { entry: HealthCheckEntry; diagnosis: Array<Diagnose> }) => {
  return (
    <div>
      {entry.date} <MonitorHeartIcon />
      <p>{entry.description}</p>
      {entry.diagnosisCodes?.map(code => (
        <li key={entry.id}>
          {code} {diagnosis.find(d => d.code === code)?.name}
        </li>
      ))}
    </div>
  );
};

export default HealthCheckEntryItem;
