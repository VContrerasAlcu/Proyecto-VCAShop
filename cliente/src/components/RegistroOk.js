import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

/**
 * Componente RegistroOk
 * Muestra confirmación tras la verificación exitosa del registro.
 */
function RegistroOk() {
  const navigate = useNavigate();

  /**
   * Redirige al login
   */
  const handleLoginRedirect = () => {
    navigate('/validacion');
  };

  /**
   * Renderiza la pantalla de éxito
   */
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ height: '100vh', textAlign: 'center', padding: '20px' }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        ¡Verificación Exitosa!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Gracias por verificar tu cuenta. Ya puedes iniciar sesión en tu cuenta y comprar en la tienda.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleLoginRedirect}
        sx={{ marginTop: '20px' }}
      >
        Ir a Iniciar Sesión
      </Button>
    </Box>
  );
}

export default RegistroOk;