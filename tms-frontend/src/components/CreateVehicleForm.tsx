import { useForm } from 'react-hook-form';
import { Box, Button, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import api from '../api/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const CreateVehicleForm = ({ open, handleClose }: { open: boolean, handleClose: () => void }) => {
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: any) => api.post('/vehicles', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      handleClose();
      reset();
    },
  });

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Vehicle</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit((data) => mutation.mutate(data))} sx={{ mt: 1 }}>
          <TextField margin="normal" required fullWidth label="Registration Number" {...register('registrationNumber')} />
          <TextField margin="normal" required fullWidth label="Make" {...register('make')} />
          <TextField margin="normal" required fullWidth label="Model" {...register('model')} />
          <TextField margin="normal" required fullWidth label="Capacity" type="number" {...register('capacity')} />
          <TextField margin="normal" required fullWidth label="Fuel Type" {...register('fuelType')} />
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">Add</Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CreateVehicleForm;
