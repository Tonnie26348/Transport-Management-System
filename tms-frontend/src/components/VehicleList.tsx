import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress, Button, Box } from '@mui/material';
import api from '../api/axios';
import CreateVehicleForm from './CreateVehicleForm';

const fetchVehicles = async () => {
  const response = await api.get('/vehicles');
  return response.data;
};

const VehicleList = () => {
  const [open, setOpen] = useState(false);
  const { data: vehicles, isLoading, error } = useQuery({
    queryKey: ['vehicles'],
    queryFn: fetchVehicles,
  });

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Error loading vehicles</Typography>;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Fleet Management</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>Add Vehicle</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Registration</TableCell>
              <TableCell>Make</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicles.map((vehicle: any) => (
              <TableRow key={vehicle.id}>
                <TableCell>{vehicle.registrationNumber}</TableCell>
                <TableCell>{vehicle.make}</TableCell>
                <TableCell>{vehicle.model}</TableCell>
                <TableCell>{vehicle.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CreateVehicleForm open={open} handleClose={() => setOpen(false)} />
    </Box>
  );
};

export default VehicleList;
