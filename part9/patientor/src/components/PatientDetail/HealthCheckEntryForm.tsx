import { useState, SyntheticEvent } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button, Alert, Box } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { EntryFormValues, HealthCheckRating } from '../../types';
import patientsService from '../../services/patients';
import { EntryFromProps, MenuProps } from '../PatientDetail/index';
import { StyledRating } from './index';
import axios from 'axios';

const HealthCheckEntryForm = ({ afterCreate, diagnosis }: EntryFromProps) => {
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [rating, setRating] = useState<number | null>(-1);
  const [diagnosisCodes, setDiagnosisCodes] = useState<Array<string>>([]);
  const [error, setError] = useState<string>();
  const [message, setMessage] = useState<string>();
  const { id } = useParams();
  const [hover, setHover] = useState(-1);

  const addEntry = async (event: SyntheticEvent) => {
    event.preventDefault();
    const entry: EntryFormValues = {
      description,
      date,
      specialist,
      type: 'HealthCheck',
      healthCheckRating: rating ?? 0,
      diagnosisCodes: diagnosisCodes,
    };

    try {
      const newEntry = await patientsService.addEntry({ id: id!, entry });
      afterCreate(newEntry);
      setMessage('New entry has created');
      setTimeout(() => {
        setMessage('');
      }, 5000);
    } catch (error: unknown) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        setError(error.response?.data);
        setTimeout(() => {
          setError('');
        }, 5000);
      }
    }
  };

  const handleChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
  };

  const getLabelText = (value: number): string =>
    `${value} Star${value !== 1 ? 's' : ''}, ${HealthCheckRating[value]}`;

  return (
    <div>
      {message && <Alert severity="success">{message}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      <Box component="form" noValidate onSubmit={addEntry} autoComplete="off">
        <h3>New HealthCheck entry</h3>
        <TextField
          sx={{ mt: 2 }}
          label="Description"
          id="description"
          fullWidth
          variant="standard"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          sx={{ mt: 2 }}
          label="Date"
          id="date"
          type="date"
          fullWidth
          variant="standard"
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <FormControl sx={{ mt: 2, width: 250 }}>
          <InputLabel id="diagnosisCodes-checkbox-label">Diagnosis Codes</InputLabel>
          <Select
            labelId="diagnosisCodes-checkbox-label"
            id="diagnosisCodes-checkbox"
            multiple
            value={diagnosisCodes}
            onChange={handleChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={selected => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {diagnosis.map(d => (
              <MenuItem key={d.code} value={d.code}>
                <Checkbox checked={diagnosisCodes.indexOf(d.code) > -1} />
                <ListItemText primary={d.code} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          sx={{ mt: 2 }}
          label="Specialist"
          id="specialist"
          fullWidth
          variant="standard"
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <StyledRating
          sx={{ mt: 2 }}
          id="rating"
          icon={<FavoriteIcon fontSize="inherit" />}
          emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
          // name="simple-controlled"
          getLabelText={getLabelText}
          value={rating}
          max={4}
          onChange={(_event, newValue) => {
            setRating(newValue);
          }}
          onChangeActive={(_event, newHover) => {
            setHover(newHover);
          }}
        />
        {rating && (
          <Box
            sx={{
              display: 'inline',
              alignItems: 'center',
            }}
          >
            {HealthCheckRating[hover !== -1 ? 3 - hover + 1 : rating]}
          </Box>
        )}
        {/* <TextField
        sx={{mt: 2}}
          label="HealthCheck rating"
          id="rating"
          fullWidth
          variant="standard"
          value={rating}
          type="number"
          onChange={({ target }) => setRating(Number(target.value))}
        /> */}
        <Button sx={{ display: 'block', mb: 4 }} style={{ marginTop: '20px' }} type="submit" variant="outlined">
          Add
        </Button>
      </Box>
    </div>
  );
};

export default HealthCheckEntryForm;
