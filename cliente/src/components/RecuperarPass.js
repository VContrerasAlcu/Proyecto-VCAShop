import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Divider
} from "@mui/material";
import { useNavigate } from "react-router-dom";

/**
 * Componente RecuperarPass
 * Permite recuperar la contraseña en tres fases: envío de código, verificación y cambio.
 */
const RecuperarPass = () => {
  const [fase, setFase] = useState("inicio"); // 'inicio', 'codigo', 'completado'
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [nuevaPass, setNuevaPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  /**
   * Paso 1: Enviar código al correo
   */
  const iniciarRecuperacion = async () => {
    setError("");
    setMensaje("");
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/clientes/recuperar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (res.ok) {
        setMensaje(data.mensaje);
        setFase("codigo");
      } else {
        setError(data.error || "No se pudo iniciar la recuperación.");
      }
    } catch (err) {
      setError("No se pudo conectar al servidor.");
    }
  };

  /**
   * Paso 2: Verificar código y establecer nueva contraseña
   */
  const cambiarPassword = async () => {
    setError("");
    if (nuevaPass !== confirmPass) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/clientes/verificar-recuperacion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          codigo,
          nuevaPassword: nuevaPass
        })
      });
      const data = await res.json();
      if (res.ok) {
        setMensaje("Contraseña actualizada correctamente.");
        setFase("completado");
      } else {
        setError(data.error || "Error al cambiar la contraseña.");
      }
    } catch (err) {
      setError("No se pudo conectar al servidor.");
    }
  };

  /**
   * Renderiza el formulario según la fase actual
   */
  return (
    <Box
      sx={{
        maxWidth: 420,
        margin: "auto",
        mt: 6,
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#fff"
      }}
    >
      {/* Logo y título */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <img src="/logo.png" alt="Logo" style={{ maxWidth: "180px" }} />
        <Typography variant="h5" sx={{ fontWeight: "bold", mt: 1 }}>
          Recuperar contraseña
        </Typography>
      </Box>

      {/* Fase 1: Solicitar correo */}
      {fase === "inicio" && (
        <>
          <TextField
            label="Correo electrónico"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={iniciarRecuperacion}
          >
            Enviar código
          </Button>
        </>
      )}

      {/* Fase 2: Verificar código y cambiar contraseña */}
      {fase === "codigo" && (
        <>
          <Typography sx={{ mt: 2 }}>
            Ingresa el código recibido por correo y tu nueva contraseña:
          </Typography>
          <TextField
            label="Código de verificación"
            fullWidth
            margin="normal"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />
          <TextField
            label="Nueva contraseña"
            type="password"
            fullWidth
            margin="normal"
            value={nuevaPass}
            onChange={(e) => setNuevaPass(e.target.value)}
          />
          <TextField
            label="Confirmar nueva contraseña"
            type="password"
            fullWidth
            margin="normal"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />
          <Button
            variant="contained"
            color="success"
            fullWidth
            sx={{ mt: 2 }}
            onClick={cambiarPassword}
          >
            Cambiar contraseña
          </Button>
        </>
      )}

      {/* Fase 3: Confirmación */}
      {fase === "completado" && (
        <>
          <Typography color="success.main" sx={{ mt: 2 }}>
            ✔ Contraseña actualizada correctamente.
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => navigate("/validacion")}
          >
            Ir al login
          </Button>
        </>
      )}

      {/* Mensajes de error o éxito */}
      {(mensaje || error) && (
        <>
          <Divider sx={{ my: 2 }} />
          <Typography
            variant="body2"
            color={error ? "error" : "text.secondary"}
          >
            {error || mensaje}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default RecuperarPass;