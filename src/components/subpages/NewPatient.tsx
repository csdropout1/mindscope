import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Patient } from '@/types/users';

export default function NewPatientFormDialog({ callback }): JSX.Element {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const patient: Patient = { name: data.get('name') as string };
    callback(patient);
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add New Patient
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Patient</DialogTitle>
        <DialogContent>
          <form id="new-patient-form" onSubmit={onSubmit}>
            <TextField
              autoFocus
              fullWidth
              required
              id="name"
              label="Name"
              name="name"
              type="name"
              variant="standard"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button form="new-patient-form" type="submit">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
