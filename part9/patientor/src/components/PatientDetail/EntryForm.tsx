import { useState, SyntheticEvent } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Box } from '@mui/material';
import { TextField, Button } from '@mui/material';
import { Diagnose, Entry, EntryFormValues } from '../../types';
import patientsService from '../../services/patients';
import axios from 'axios';

const parseDiagnosisCodes = (object: unknown): Array<Diagnose['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnose['code']>;
  }

  return object.diagnosisCodes as Array<Diagnose['code']>;
};

interface Props {
  afterCreate: (addedEntry: Entry) => void;
}

const EntryForm = ({ afterCreate }: Props) => {
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string>('');
  const [error, setError] = useState<string>();
  const [message, setMessage] = useState<string>();
  const { id } = useParams();

  const addEntry = async (event: SyntheticEvent) => {
    event.preventDefault();
    const entry: EntryFormValues = {
      description,
      date,
      specialist,
      type: 'HealthCheck',
      healthCheckRating: rating,
      diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
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

  return (
    <>
      {message && <Alert severity="success">{message}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      <Box component="form" noValidate onSubmit={addEntry} autoComplete="off">
        <h3>New HealthCheck entry</h3>
        <TextField
          id="description"
          label="Description"
          fullWidth
          variant="standard"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          id="date"
          label="Date"
          fullWidth
          variant="standard"
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          id="specialist"
          label="Specialist"
          fullWidth
          variant="standard"
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          id="rating"
          label="HealthCheck rating"
          fullWidth
          variant="standard"
          value={rating}
          type="number"
          onChange={({ target }) => setRating(Number(target.value))}
        />
        <TextField
          id="diagnosisCodes"
          label="DiagnosisCodes"
          fullWidth
          variant="standard"
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
        />
        <Button style={{ marginTop: '20px' }} type="submit" variant="contained">
          Add
        </Button>
      </Box>
    </>
  );
};

export default EntryForm;
