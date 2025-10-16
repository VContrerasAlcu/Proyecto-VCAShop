import React, { useState } from "react";

// Hooks y componentes de Material UI
import { useMediaQuery, IconButton, Dialog, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Ícono de búsqueda
import SearchIcon from "@mui/icons-material/Search";

// Componente de búsqueda reutilizable
import BuscadorAutocompleto from "./BuscadorAutocompleto.js";

/**
 * Componente BuscadorResponsivo
 * Muestra el buscador directamente en pantallas grandes
 * y como un diálogo emergente en móviles.
 */
export default function BuscadorResponsivo() {
  // Accede al tema actual para usar los breakpoints definidos
  const theme = useTheme();

  // Detecta si el dispositivo es móvil (pantalla pequeña)
  const esMovil = useMediaQuery(theme.breakpoints.down("sm"));

  // Estado para controlar si el diálogo está abierto
  const [abierto, setAbierto] = useState(false);

  // Abre el diálogo del buscador
  const abrirBuscador = () => setAbierto(true);

  // Cierra el diálogo del buscador
  const cerrarBuscador = () => setAbierto(false);

  return (
    <>
      {/* Si es móvil, muestra un botón con ícono que abre el buscador en un diálogo */}
      {esMovil ? (
        <>
          <IconButton onClick={abrirBuscador} color="inherit">
            <SearchIcon />
          </IconButton>

          {/* Diálogo emergente con el buscador */}
          <Dialog open={abierto} onClose={cerrarBuscador} fullWidth>
            <Box sx={{ p: 2 }}>
              <BuscadorAutocompleto />
            </Box>
          </Dialog>
        </>
      ) : (
        // Si no es móvil, muestra el buscador directamente
        <Box sx={{ width: 300 }}>
          <BuscadorAutocompleto />
        </Box>
      )}
    </>
  );
}