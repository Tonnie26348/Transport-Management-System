import { useQuery } from '@tanstack/react-query';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress, Button, Box } from '@mui/material';
import api from '../api/axios';
import { useState } from 'react';
import CreateTripForm from './CreateTripForm';

const fetchTrips = async () => {
  const response = await api.get('/trips');
  return response.data;
};

const TripList = () => {
  const [open, setOpen] = useState(false);
  const { data: trips, isLoading, error } = useQuery({
    queryKey: ['trips'],
    queryFn: fetchTrips,
  });

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Error loading trips</Typography>;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Trip Management</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>Schedule Trip</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Departure Time</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trips.map((trip: any) => (
              <TableRow key={trip.id}>
                <TableCell>{trip.id}</TableCell>
                <TableCell>{trip.departureTime}</TableCell>
                <TableCell>{trip.status}</TableCell>
                <TableCell>{trip.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CreateTripForm open={open} handleClose={() => setOpen(false)} />
    </Box>
  );
};

export default TripList;
