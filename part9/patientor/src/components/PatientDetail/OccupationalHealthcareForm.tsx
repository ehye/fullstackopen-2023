import { useState, SyntheticEvent } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button, Alert, Box } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { EntryFormValues } from '../../types';
import patientsService from '../../services/patients';
import { EntryFromProps, MenuProps } from '../PatientDetail/index';
import axios from 'axios';

const OccupationalHealthcareForm = ({ afterCreate, diagnosis }: EntryFromProps) => {
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<Array<string>>([]);
  const [employerName, setEmployerName] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [error, setError] = useState<string>();
  const [message, setMessage] = useState<string>();
  const { id } = useParams();

  const addEntry = async (event: SyntheticEvent) => {
    event.preventDefault();
    const entry: EntryFormValues = {
      description,
      date,
      specialist,
      type: 'OccupationalHealthcare',
      employerName,
      sickLeave: { startDate, endDate },
      diagnosisCodes,
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

  return (
    <>
      {message && <Alert severity="success">{message}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      <Box component="form" noValidate onSubmit={addEntry} autoComplete="off">
        <h3>New Occupation entry</h3>
        <TextField
          sx={{ mt: 2 }}
          label="Description"
          id="description"
          fullWidth
          variant="standard"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
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
          label="Date"
          id="date"
          type="date"
          fullWidth
          variant="standard"
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          sx={{ mt: 2 }}
          label="Specialist"
          id="specialist"
          fullWidth
          variant="standard"
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          sx={{ mt: 2 }}
          label="Employer Name"
          id="employerName"
          fullWidth
          variant="standard"
          value={employerName}
          onChange={({ target }) => setEmployerName(target.value)}
        />
        <TextField
          sx={{ mt: 2 }}
          label="Sick Leave Start"
          id="startDate"
          type="date"
          fullWidth
          variant="standard"
          value={startDate}
          onChange={({ target }) => setStartDate(target.value)}
        />
        <TextField
          sx={{ mt: 2 }}
          label="Sick Leave End"
          id="endDate"
          type="date"
          fullWidth
          variant="standard"
          value={endDate}
          onChange={({ target }) => setEndDate(target.value)}
        />
        <Button sx={{ mb: 4 }} type="submit" variant="outlined">
          Add
        </Button>
      </Box>
    </>
  );
};

export default OccupationalHealthcareForm;
