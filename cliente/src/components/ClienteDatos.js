// Importaciones de Material UI
import {
  Box,
  Typography,
  TextField,
  Paper,
  Avatar,
  Button,
  Snackbar,
  Alert
} from "@mui/material";

// Ícono de perfil
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// Hooks de React
import { useContext, useEffect, useState } from "react";

// Contexto global del cliente
import { ClienteContext } from "../context/ClienteContext.js";

// Navegación con React Router
import { useNavigate } from "react-router-dom";

// Función para actualizar los datos del cliente en el servidor
import actualizarCliente from "../services/actualizacionClientes.js";

/**
 * Componente ClienteDatos
 * Permite al usuario ver y editar sus datos personales.
 */
const ClienteDatos = () => {
  // Accede al cliente desde el contexto
  const { cliente, setCliente } = useContext(ClienteContext);

  // Estados locales para los campos del formulario
  const [nombre, setNombre] = useState(cliente?.nombre || "");
  const [direccion, setDireccion] = useState(cliente?.direccion || "");
  const [telefono, setTelefono] = useState(cliente?.telefono || "");

  // Estado para mostrar error si el nombre está vacío
  const [errorNombre, setErrorNombre] = useState(false);

  // Estados para mostrar mensajes de éxito o error
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  // Hook para navegar entre rutas
  const navigate = useNavigate();

  // Al montar el componente, recupera el cliente desde sessionStorage si no está en contexto
  useEffect(() => {
    if (!cliente) {
      const clienteSesion = JSON.parse(sessionStorage.getItem("cliente"));
      setCliente(clienteSesion);
    }
  }, []);

  /**
   * Maneja el guardado de los datos
   * Valida el nombre, actualiza el cliente y muestra feedback
   */
  const handleGuardar = async () => {
    if (!nombre.trim()) {
      setErrorNombre(true);
      return;
    }

    setErrorNombre(false);

    // Crea un nuevo objeto cliente con los datos actualizados
    const clienteActualizado = {
      ...cliente,
      nombre: nombre.trim(),
      direccion: direccion.trim(),
      telefono: telefono.trim()
    };

    // Llama al servicio para actualizar en el backend
    const respuestaCorrecta = await actualizarCliente(clienteActualizado);

    if (respuestaCorrecta) {
      // Actualiza el contexto y sessionStorage
      setCliente(clienteActualizado);
      sessionStorage.setItem("cliente", JSON.stringify(clienteActualizado));
      setOpenSnackbar(true); // Muestra mensaje de éxito
    } else {
      setOpenErrorSnackbar(true); // Muestra mensaje de error
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 3 }}>
      {/* Encabezado con avatar */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Avatar sx={{ width: 100, height: 100, mx: "auto", bgcolor: "primary.main" }}>
          <AccountCircleIcon sx={{ fontSize: 60 }} />
        </Avatar>
        <Typography variant="h5" sx={{ mt: 2 }}>
          Tus datos
        </Typography>
      </Box>

      {/* Formulario de edición */}
      <Paper sx={{ p: 3 }}>
        <TextField
          fullWidth
          label="Nombre"
          variant="outlined"
          required
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          error={errorNombre}
          helperText={errorNombre ? "El nombre es obligatorio" : ""}
          sx={{ mb: 3 }}
        />
        <TextField
          fullWidth
          label="Dirección"
          variant="outlined"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          sx={{ mb: 3 }}
        />
        <TextField
          fullWidth
          label="Teléfono"
          variant="outlined"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />

        {/* Botones de acción */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Volver
          </Button>
          <Button variant="contained" onClick={handleGuardar}>
            Guardar cambios
          </Button>
        </Box>
      </Paper>

      {/* Snackbar de éxito */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled" onClose={() => setOpenSnackbar(false)}>
          Datos guardados correctamente
        </Alert>
      </Snackbar>

      {/* Snackbar de error */}
      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenErrorSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error" variant="filled" onClose={() => setOpenErrorSnackbar(false)}>
          Error al guardar los datos. Inténtalo de nuevo.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ClienteDatos;