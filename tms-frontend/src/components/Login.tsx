import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const onSubmit = async (data: any) => {
    try {
      const response = await api.post('/auth/login', data);
      localStorage.setItem('accessToken', response.data.accessToken);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">Sign in</Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <TextField margin="normal" required fullWidth label="Email Address" {...register('email')} autoFocus />
          <TextField margin="normal" required fullWidth label="Password" type="password" {...register('password')} />
          {error && <Typography color="error">{error}</Typography>}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign In</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
