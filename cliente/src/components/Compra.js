import { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  Avatar,
  Tooltip,
  IconButton,
  Snackbar,
  Alert
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { ClienteContext } from "../context/ClienteContext.js";
import { CarroContext } from "../context/CarroContext.js";
import { useNavigate } from "react-router-dom";
import actualizarCliente from "../services/actualizacionClientes.js";

const Compra = () => {
  const { cliente, setCliente } = useContext(ClienteContext);
  const { carro } = useContext(CarroContext);
  const navigate = useNavigate();

  const [direccion, setDireccion] = useState(cliente?.direccion || "");
  const [telefono, setTelefono] = useState(cliente?.telefono?.replace("+34", "") || "");

  const [errorDireccion, setErrorDireccion] = useState(false);
  const [errorTelefono, setErrorTelefono] = useState(false);

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const total = carro.reduce(
    (acumulado, item) => acumulado + item.producto.precio * item.cantidad,
    0
  );

  const handleActualizarDireccion = async () => {
    const direccionValida = direccion.trim();
    const telefonoValido = telefono.trim();
    const telefonoFormatoValido = /^\d{9}$/.test(telefonoValido);

    if (direccionValida && telefonoFormatoValido) {
      const clienteActualizado = {
        ...cliente,
        direccion: direccionValida,
        telefono: `+34${telefonoValido}`
      };

      const respuestaCorrecta = await actualizarCliente(clienteActualizado);

      if (respuestaCorrecta) {
        setCliente(clienteActualizado);
        sessionStorage.setItem("cliente", JSON.stringify(clienteActualizado));
        setOpenSuccess(true);
      } else {
        setOpenError(true);
      }
    }
  };

  const enviarPagoARedsys = async () => {
    try {
      const respuesta = await fetch(`${process.env.REACT_APP_API_URL}/pago/generarPago`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cliente, carro, total })
      });

      const data = await respuesta.json();

      const form = document.createElement("form");
      form.method = "POST";
      form.action = data.url;

      const campos = {
        Ds_SignatureVersion: data.version,
        Ds_MerchantParameters: data.params,
        Ds_Signature: data.signature
      };

      for (const [key, value] of Object.entries(campos)) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      }

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error("Error al generar el formulario de pago:", error);
      setOpenError(true);
    }
  };

  const handlePagar = async () => {
    const direccionValida = direccion.trim();
    const telefonoValido = telefono.trim();
    const telefonoFormatoValido = /^\d{9}$/.test(telefonoValido);

    setErrorDireccion(!direccionValida);
    setErrorTelefono(!telefonoFormatoValido);

    if (!direccionValida || !telefonoFormatoValido) return;

    await handleActualizarDireccion();
    await enviarPagoARedsys();
  };

  const handleVolver = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (!cliente.nombre) {
      navigate('/datosCliente');
    }
  }, []);

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 4, p: 3 }}>
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Avatar
          src="/images/logo.png"
          alt="Logo"
          sx={{ width: 100, height: 100, mx: "auto" }}
        />
      </Box>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Datos del cliente
        </Typography>

        <TextField
          fullWidth
          variant="outlined"
          label="Nombre del cliente"
          value={cliente?.nombre || ""}
          InputProps={{ readOnly: true }}
          sx={{ mb: 3 }}
        />

        <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start", flexWrap: "wrap" }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Dirección de envío"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            placeholder="Introduce tu dirección de envío"
            error={errorDireccion}
            helperText={errorDireccion ? "Por favor, introduce una dirección" : ""}
            sx={{ flex: 1 }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Teléfono (9 dígitos)"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value.replace(/\D/g, ""))}
            placeholder="Ej: 612345678"
            error={errorTelefono}
            helperText={
              errorTelefono
                ? "Introduce un número válido de 9 dígitos"
                : "Se añadirá automáticamente el prefijo +34"
            }
            sx={{ flex: 1 }}
          />
          <Tooltip title="Actualizar datos">
            <IconButton
              color="primary"
              onClick={handleActualizarDireccion}
              sx={{ mt: "4px" }}
            >
              <SaveIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Paper>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Resumen del pedido
        </Typography>

        {carro.map((item) => (
          <Box key={item.producto.id} sx={{ my: 1 }}>
            <Typography>
              {item.cantidad} × {item.producto.nombre} —{" "}
              {(item.producto.precio * item.cantidad).toFixed(2)} €
            </Typography>
          </Box>
        ))}

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" align="right" sx={{ fontWeight: "bold" }}>
          Total: {total.toFixed(2)} €
        </Typography>
      </Paper>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="contained" color="secondary" onClick={handleVolver}>
          Volver
        </Button>
        <Button variant="contained" color="primary" onClick={handlePagar}>
          Pagar
        </Button>
      </Box>

      <Snackbar
        open={openSuccess}
        autoHideDuration={3000}
        onClose={() => setOpenSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled" onClose={() => setOpenSuccess(false)}>
          Datos actualizados correctamente
        </Alert>
      </Snackbar>

      <Snackbar
        open={openError}
        autoHideDuration={3000}
        onClose={() => setOpenError(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error" variant="filled" onClose={() => setOpenError(false)}>
          No se pudo actualizar los datos. Inténtalo de nuevo.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Compra;