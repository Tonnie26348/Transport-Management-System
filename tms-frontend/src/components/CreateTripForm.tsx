import { useForm } from 'react-hook-form';
import { Box, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import api from '../api/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const CreateTripForm = ({ open, handleClose }: { open: boolean, handleClose: () => void }) => {
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: any) => api.post('/trips', { ...data, status: 'SCHEDULED', recurring: false }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
      handleClose();
      reset();
    },
  });

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Schedule New Trip</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit((data) => mutation.mutate(data))} sx={{ mt: 1 }}>
          <TextField margin="normal" required fullWidth label="Route ID" type="number" {...register('routeId')} />
          <TextField margin="normal" required fullWidth label="Driver ID" type="number" {...register('driverId')} />
          <TextField margin="normal" required fullWidth label="Vehicle ID" type="number" {...register('vehicleId')} />
          <TextField margin="normal" required fullWidth label="Departure Time" type="datetime-local" InputLabelProps={{ shrink: true }} {...register('departureTime')} />
          <TextField margin="normal" required fullWidth label="Arrival Time" type="datetime-local" InputLabelProps={{ shrink: true }} {...register('arrivalTime')} />
          <TextField margin="normal" required fullWidth label="Price" type="number" {...register('price')} />
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">Schedule</Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTripForm;
