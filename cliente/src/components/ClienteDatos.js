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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useContext, useEffect, useState } from "react";
import { ClienteContext } from "../context/ClienteContext.js";
import { useNavigate } from "react-router-dom";
import actualizarCliente from "../services/actualizacionClientes.js";

const ClienteDatos = () => {
  const { cliente, setCliente } = useContext(ClienteContext);

  const [nombre, setNombre] = useState(cliente?.nombre || "");
  const [direccion, setDireccion] = useState(cliente?.direccion || "");
  const [telefono, setTelefono] = useState(cliente?.telefono?.replace("+34", "") || "");

  const [errorNombre, setErrorNombre] = useState(false);
  const [errorTelefono, setErrorTelefono] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!cliente) {
      const clienteSesion = JSON.parse(sessionStorage.getItem("cliente"));
      setCliente(clienteSesion);
    }
  }, []);

  const handleGuardar = async () => {
    const nombreValido = nombre.trim();
    const telefonoValido = telefono.trim();

    const telefonoFormatoValido = /^\d{9}$/.test(telefonoValido);

    setErrorNombre(!nombreValido);
    setErrorTelefono(!telefonoValido || !telefonoFormatoValido);

    if (!nombreValido || !telefonoValido || !telefonoFormatoValido) return;

    const clienteActualizado = {
      ...cliente,
      nombre: nombreValido,
      direccion: direccion.trim(),
      telefono: `+34${telefonoValido}`
    };

    const respuestaCorrecta = await actualizarCliente(clienteActualizado);

    if (respuestaCorrecta) {
      setCliente(clienteActualizado);
      sessionStorage.setItem("cliente", JSON.stringify(clienteActualizado));
      setOpenSnackbar(true);
    } else {
      setOpenErrorSnackbar(true);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 3 }}>
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Avatar sx={{ width: 100, height: 100, mx: "auto", bgcolor: "primary.main" }}>
          <AccountCircleIcon sx={{ fontSize: 60 }} />
        </Avatar>
        <Typography variant="h5" sx={{ mt: 2 }}>
          Tus datos
        </Typography>
      </Box>

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
          label="Teléfono (solo 9 dígitos)"
          variant="outlined"
          required
          value={telefono}
          onChange={(e) => setTelefono(e.target.value.replace(/\D/g, ""))}
          error={errorTelefono}
          helperText={
            errorTelefono
              ? "Introduce los 9 dígitos del teléfono sin prefijo"
              : "Se añadirá automáticamente el +34"
          }
          sx={{ mb: 3 }}
        />

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Volver
          </Button>
          <Button variant="contained" onClick={handleGuardar}>
            Guardar cambios
          </Button>
        </Box>
      </Paper>

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