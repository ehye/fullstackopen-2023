import { Diagnose, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from '../../types';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import WorkIcon from '@mui/icons-material/Work';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { StyledRating } from './index';

export const HealthCheckEntryItem = ({
  entry,
  diagnosis,
}: {
  entry: HealthCheckEntry;
  diagnosis: Array<Diagnose>;
}) => {
  return (
    <div>
      {entry.date} <MonitorHeartIcon />
      <p>{entry.description}</p>
      <StyledRating
        sx={{ mt: 2 }}
        id="rating"
        icon={<FavoriteIcon fontSize="inherit" />}
        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
        value={3 - entry.healthCheckRating + 1}
        readOnly
      />
      {entry.diagnosisCodes?.map((code, i) => (
        <li key={i}>
          {code} {diagnosis.find(d => d.code === code)?.name}
        </li>
      ))}
    </div>
  );
};

export const HospitalEntryItem = ({ entry, diagnosis }: { entry: HospitalEntry; diagnosis: Array<Diagnose> }) => {
  return (
    <div>
      {entry.date} <MedicalServicesIcon />
      <p>{entry.description}</p>
      {entry.diagnosisCodes?.map((code, i) => (
        <li key={i}>
          {code} {diagnosis.find(d => d.code === code)?.name}
        </li>
      ))}
    </div>
  );
};

export const OccupationalHealthcareItem = ({
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
      {entry.diagnosisCodes?.map((code, i) => (
        <li key={i}>
          {code} {diagnosis.find(d => d.code === code)?.name}
        </li>
      ))}
    </div>
  );
};
