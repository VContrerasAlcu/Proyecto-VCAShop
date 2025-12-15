import React, { useState } from "react";
import { 
  useMediaQuery, 
  IconButton, 
  Dialog,
  Box,
  Paper
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import BuscadorAutocompleto from "./BuscadorAutocompleto.js";

export default function BuscadorResponsivo() {
  const theme = useTheme();
  const esMovil = useMediaQuery(theme.breakpoints.down("sm"));
  const [abierto, setAbierto] = useState(false);

  return (
    <>
      {esMovil ? (
        <>
          <IconButton onClick={() => setAbierto(true)} color="inherit">
            <SearchIcon />
          </IconButton>

          <Dialog
            open={abierto}
            onClose={() => setAbierto(false)}
            fullScreen
            PaperProps={{
              sx: {
                margin: 0,
                backgroundColor: '#ffffff',
                position: 'fixed',
                top: 0,
                height: 'auto',
                minHeight: 'auto',
                borderBottomLeftRadius: 16,
                borderBottomRightRadius: 16,
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                overflow: 'visible', // IMPORTANTE: Permitir que las sugerencias se muestren fuera
              }
            }}
          >
            <Paper 
              sx={{ 
                p: 2, 
                backgroundColor: 'transparent',
                position: 'relative',
                overflow: 'visible' // IMPORTANTE
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ flexGrow: 1, position: 'relative' }}>
                  <BuscadorAutocompleto isMobileDialog={true} />
                </Box>
                <IconButton onClick={() => setAbierto(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Paper>
          </Dialog>
        </>
      ) : (
        <Box sx={{ width: 300 }}>
          <BuscadorAutocompleto />
        </Box>
      )}
    </>
  );
}