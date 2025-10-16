import React, { useState, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { productosContext } from "../context/productosContext.js";
import { TextField, Box, Typography, Paper } from "@mui/material";

/**
 * Componente BuscadorAutocompleto
 * Permite buscar productos por nombre o descripción con sugerencias dinámicas.
 */
export default function BuscadorAutocompleto() {
  
  const { productos } = useContext(productosContext);
  const [texto, setTexto] = useState("");
  const navigate = useNavigate();
  const [mostrarSugerencias, setMostrarSugerencias] = useState(true);

  /**
   * Genera una lista de sugerencias basada en el texto ingresado
   * Se actualiza solo cuando cambian el texto o los productos
   */
  const sugerencias = useMemo(() => {
    const filtro = texto.trim().toLowerCase();
    if (!filtro) return [];

    return productos
      .filter((p) =>
        `${p.nombre} ${p.descripcion}`.toLowerCase().includes(filtro)
      )
      .slice(0, 5); // Limita a 5 sugerencias
  }, [texto, productos]);

  /**
   * Maneja el evento de presionar una tecla
   * Si es Enter, redirige a la página de búsqueda
   */
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && texto.trim()) {
      setMostrarSugerencias(false);
      navigate(`/buscar?texto=${encodeURIComponent(texto.trim())}`);
      setTexto("");
    }
  };

  /**
   * Maneja la selección de una sugerencia
   * Redirige a la búsqueda del producto seleccionado
   */
  const handleSeleccion = (nombre) => {
    setTexto(nombre);
    setMostrarSugerencias(false);
    navigate(`/buscar?texto=${encodeURIComponent(nombre)}`);
  };

  return (
    <Box sx={{ position: "relative", maxWidth: 400 }}>
      {/* Campo de texto para búsqueda */}
      <TextField
        label="Buscar productos"
        variant="outlined"
        fullWidth
        value={texto}
        onChange={(e) => {
          setTexto(e.target.value);
          setMostrarSugerencias(true); // Vuelve a mostrar sugerencias mientras escribe
        }}
        onKeyDown={handleKeyDown}
        size="small"
        sx={{
          input: { color: "#fff" },
          "& label": { color: "#ccc" },
          "& label.Mui-focused": { color: "#fff" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#ccc" },
            "&:hover fieldset": { borderColor: "#fff" },
            "&.Mui-focused fieldset": { borderColor: "#1e88e5" },
            backgroundColor: "rgba(255,255,255,0.1)",
          },
        }}
      />

      {/* Lista de sugerencias mostrada debajo del campo */}
      {mostrarSugerencias && sugerencias.length > 0 && (
        <Paper
          elevation={3}
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            mt: 1,
            zIndex: 10,
            borderRadius: 1,
            overflow: "hidden",
          }}
        >
          {sugerencias.map((p) => (
            <Box
              key={p.id}
              sx={{
                px: 2,
                py: 1,
                cursor: "pointer",
                ":hover": { backgroundColor: "#f5f5f5" },
              }}
              onClick={() => handleSeleccion(p.nombre)}
            >
              <Typography variant="body2">{p.nombre}</Typography>
            </Box>
          ))}
        </Paper>
      )}
    </Box>
  );
}