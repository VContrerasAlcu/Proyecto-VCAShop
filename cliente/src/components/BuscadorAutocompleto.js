import React, { useState, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { productosContext } from "../context/productosContext.js";
import { 
  TextField, 
  Box, 
  Typography, 
  Paper,
  useTheme
} from "@mui/material";

export default function BuscadorAutocompleto({ isMobileDialog = false }) {
  const { productos } = useContext(productosContext);
  const [texto, setTexto] = useState("");
  const navigate = useNavigate();
  const [mostrarSugerencias, setMostrarSugerencias] = useState(true);
  const theme = useTheme();

  const sugerencias = useMemo(() => {
    const filtro = texto.trim().toLowerCase();
    if (!filtro) return [];

    return productos
      .filter((p) =>
        `${p.nombre} ${p.descripcion}`.toLowerCase().includes(filtro)
      )
      .slice(0, 5);
  }, [texto, productos]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && texto.trim()) {
      setMostrarSugerencias(false);
      navigate(`/buscar?texto=${encodeURIComponent(texto.trim())}`);
      setTexto("");
    }
  };

  const handleSeleccion = (nombre) => {
    setTexto(nombre);
    setMostrarSugerencias(false);
    navigate(`/buscar?texto=${encodeURIComponent(nombre)}`);
  };

  const getTextFieldStyles = () => {
    if (isMobileDialog) {
      return {
        width: '100%',
        '& .MuiOutlinedInput-root': {
          backgroundColor: "#ffffff",
          '& fieldset': {
            borderColor: '#e0e0e0',
            borderWidth: '2px',
          },
          '&:hover fieldset': {
            borderColor: theme.palette.primary.main,
          },
          '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.main,
            borderWidth: '2px',
          },
        },
        '& .MuiInputBase-input': {
          color: "#000000 !important",
          fontSize: '16px',
        },
        '& .MuiInputLabel-root': {
          color: "#666666 !important",
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: `${theme.palette.primary.main} !important`,
        },
      };
    } else {
      return {
        "& .MuiInputBase-input": { color: "#fff" },
        "& .MuiInputLabel-root": { color: "#ccc" },
        "& .MuiInputLabel-root.Mui-focused": { color: "#fff" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "#ccc" },
          "&:hover fieldset": { borderColor: "#fff" },
          "&.Mui-focused fieldset": { borderColor: "#1e88e5" },
          backgroundColor: "rgba(255,255,255,0.1)",
        },
      };
    }
  };

  return (
    <Box sx={{ 
      position: "relative", 
      maxWidth: 400, 
      width: "100%",
      overflow: 'visible' // IMPORTANTE
    }}>
      <TextField
        label="Buscar productos"
        variant="outlined"
        fullWidth
        value={texto}
        onChange={(e) => {
          setTexto(e.target.value);
          setMostrarSugerencias(true);
        }}
        onKeyDown={handleKeyDown}
        size="small"
        autoFocus={isMobileDialog}
        sx={getTextFieldStyles()}
      />

      {mostrarSugerencias && sugerencias.length > 0 && (
        <Paper
          elevation={3}
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            mt: 1,
            zIndex: 9999, // Z-index MUY alto para móvil
            borderRadius: 1,
            overflow: "hidden",
            maxHeight: 300,
            overflowY: 'auto',
            backgroundColor: "#ffffff",
            boxShadow: '0 4px 20px rgba(0,0,0,0.25)', // Sombra más fuerte
            border: '1px solid #e0e0e0',
          }}
        >
          {sugerencias.map((p) => (
            <Box
              key={p.id}
              sx={{
                px: 2,
                py: 1.5,
                cursor: "pointer",
                "&:hover": { 
                  backgroundColor: "#f5f5f5" 
                },
                borderBottom: "1px solid #eee",
              }}
              onClick={() => handleSeleccion(p.nombre)}
            >
              <Typography 
                variant="body2" 
                sx={{ 
                  color: "#000000",
                  fontWeight: 500,
                }}
              >
                {p.nombre}
              </Typography>
            </Box>
          ))}
        </Paper>
      )}
    </Box>
  );
}