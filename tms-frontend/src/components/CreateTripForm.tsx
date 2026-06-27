import { useForm, Controller } from 'react-hook-form';
import { Box, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import api from '../api/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const CreateTripForm = ({ open, handleClose }: { open: boolean, handleClose: () => void }) => {
  const { control, handleSubmit, reset } = useForm();
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
          <Controller name="routeId" control={control} render={({ field }) => <TextField {...field} margin="normal" required fullWidth label="Route ID" type="number" />} />
          <Controller name="driverId" control={control} render={({ field }) => <TextField {...field} margin="normal" required fullWidth label="Driver ID" type="number" />} />
          <Controller name="vehicleId" control={control} render={({ field }) => <TextField {...field} margin="normal" required fullWidth label="Vehicle ID" type="number" />} />
          <Controller name="departureTime" control={control} render={({ field }) => <TextField {...field} margin="normal" required fullWidth label="Departure Time" type="datetime-local" slotProps={{ inputLabel: { shrink: true } }} />} />
          <Controller name="arrivalTime" control={control} render={({ field }) => <TextField {...field} margin="normal" required fullWidth label="Arrival Time" type="datetime-local" slotProps={{ inputLabel: { shrink: true } }} />} />
          <Controller name="price" control={control} render={({ field }) => <TextField {...field} margin="normal" required fullWidth label="Price" type="number" />} />
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
