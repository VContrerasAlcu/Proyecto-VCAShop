// Importaciones de React y Material UI
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

// Ícono para guardar dirección
import SaveIcon from "@mui/icons-material/Save";

// Contextos globales
import { ClienteContext } from "../context/ClienteContext.js";
import { CarroContext } from "../context/CarroContext.js";

// Navegación con React Router
import { useNavigate } from "react-router-dom";

// Servicio para actualizar datos del cliente
import actualizarCliente from "../services/actualizacionClientes.js";

/**
 * Componente Compra
 * Muestra los datos del cliente, resumen del pedido y lanza el pago a Redsys.
 */
const Compra = () => {
  const { cliente, setCliente } = useContext(ClienteContext);
  const { carro } = useContext(CarroContext);
  const navigate = useNavigate();

  // Estado para la dirección de envío
  const [direccion, setDireccion] = useState(cliente?.direccion || "");

  // Validación de dirección
  const [errorDireccion, setErrorDireccion] = useState(false);

  // Estados para mostrar mensajes de éxito o error
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  // Calcula el total del pedido
  const total = carro.reduce(
    (acumulado, item) => acumulado + item.producto.precio * item.cantidad,
    0
  );

  /**
   * Actualiza la dirección del cliente en el servidor
   */
  const handleActualizarDireccion = async () => {
    if (direccion.trim()) {
      const clienteActualizado = { ...cliente, direccion: direccion.trim() };
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

  /**
   * Envía los datos del pedido al backend para generar el pago con Redsys
   */
  const enviarPagoARedsys = async () => {
    try {
      const respuesta = await fetch("http://localhost:3001/pago/generarPago", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cliente, carro, total })
      });

      const data = await respuesta.json();

      // Crea y envía el formulario a Redsys
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

  /**
   * Maneja el botón "Pagar"
   * Valida la dirección, actualiza datos y lanza el pago
   */
  const handlePagar = async () => {
    if (!direccion.trim()) {
      setErrorDireccion(true);
      return;
    }

    setErrorDireccion(false);
    await handleActualizarDireccion();
    await enviarPagoARedsys();
  };

  // Vuelve a la pantalla anterior
  const handleVolver = () => {
    navigate(-1);
  };

  // Si el cliente no tiene nombre, redirige a completar datos
  useEffect(() => {
    if (!cliente.nombre) {
      navigate('/datosCliente');
    }
  }, []);

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 4, p: 3 }}>
      {/* Logo */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Avatar
          src="/images/logo.png"
          alt="Logo"
          sx={{ width: 100, height: 100, mx: "auto" }}
        />
      </Box>

      {/* Datos del cliente */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Datos del cliente
        </Typography>

        {/* Nombre (solo lectura) */}
        <TextField
          fullWidth
          variant="outlined"
          label="Nombre del cliente"
          value={cliente?.nombre || ""}
          InputProps={{ readOnly: true }}
          sx={{ mb: 3 }}
        />

        {/* Dirección editable con botón de guardar */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Dirección de envío"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            placeholder="Introduce tu dirección de envío"
            error={errorDireccion}
            helperText={errorDireccion ? "Por favor, introduce una dirección" : ""}
          />
          <Tooltip title="Actualizar dirección">
            <IconButton
              color="primary"
              onClick={handleActualizarDireccion}
              sx={{ mt: "4px" }}
            >
              <SaveIcon />
            </IconButton>
          </Tooltip>

          {/* Snackbar de éxito */}
          <Snackbar
            open={openSuccess}
            autoHideDuration={3000}
            onClose={() => setOpenSuccess(false)}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert severity="success" variant="filled" onClose={() => setOpenSuccess(false)}>
              Dirección guardada correctamente
            </Alert>
          </Snackbar>

          {/* Snackbar de error */}
          <Snackbar
            open={openError}
            autoHideDuration={3000}
            onClose={() => setOpenError(false)}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert severity="error" variant="filled" onClose={() => setOpenError(false)}>
              No se pudo guardar la dirección. Inténtalo de nuevo.
            </Alert>
          </Snackbar>
        </Box>
      </Paper>

      {/* Resumen del pedido */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Resumen del pedido
        </Typography>

        {/* Lista de productos */}
        {carro.map((item) => (
          <Box key={item.producto.id} sx={{ my: 1 }}>
            <Typography>
              {item.cantidad} × {item.producto.nombre} —{" "}
              {(item.producto.precio * item.cantidad).toFixed(2)} €
            </Typography>
          </Box>
        ))}

        <Divider sx={{ my: 2 }} />

        {/* Total del pedido */}
        <Typography variant="h6" align="right" sx={{ fontWeight: "bold" }}>
          Total: {total.toFixed(2)} €
        </Typography>
      </Paper>

      {/* Botones de acción */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="contained" color="secondary" onClick={handleVolver}>
          Volver
        </Button>
        <Button variant="contained" color="primary" onClick={handlePagar}>
          Pagar
        </Button>
      </Box>
    </Box>
  );
};

export default Compra;