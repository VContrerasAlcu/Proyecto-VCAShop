import * as React from "react";
import { useEffect, useContext, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  MenuItem,
  Menu,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { Link } from "react-router-dom";
import { CarroContext } from "../context/CarroContext.js";
import { ClienteContext } from "../context/ClienteContext.js";
import { CategoriaContext } from "../context/CategoriaContext.js";

import StarIcon from "@mui/icons-material/Star";
import ToysIcon from "@mui/icons-material/Toys";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import DevicesIcon from "@mui/icons-material/Devices";
import HomeIcon from "@mui/icons-material/Home";

import "@fontsource/inter";
import { useNavigate } from "react-router-dom";
import BuscadorAutocompleto from "./BuscadorAutocompleto.js";
import BuscadorResponsivo from "./BuscadorResponsivo.js";
import Chip from "@mui/material/Chip";
import PlaceIcon from '@mui/icons-material/Place';

export default function PrimarySearchAppBar() {
  const { carro, setCarro } = useContext(CarroContext);
  const { cliente, setCliente } = useContext(ClienteContext);
  const { setCategoriaSeleccionada } = useContext(CategoriaContext);
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [menuLateralAnchorEl, setMenuLateralAnchorEl] = useState(null);
  
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isMenuLateralOpen = Boolean(menuLateralAnchorEl);
  
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const clienteGuardado = sessionStorage.getItem("cliente");
    if (clienteGuardado) {
      try {
        const clienteParse = JSON.parse(clienteGuardado);
        setCliente(clienteParse);
      } catch (e) {
        console.warn("Cliente guardado malformado:", clienteGuardado);
      }
    }
  }, []);

  useEffect(() => {
    if (carro) {
      console.log("Barra re-renderizada. Productos en carro:", carro.length);
    }
  }, [carro]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMenuLateralOpen = (event) => {
    setMenuLateralAnchorEl(event.currentTarget);
  };

  const handleMenuLateralClose = () => {
    setMenuLateralAnchorEl(null);
  };

  const handleLogout = () => {
    setCliente(null);
    setCarro(null);
    sessionStorage.removeItem("carro");
    sessionStorage.removeItem("cliente");
    handleMenuClose();
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      id="primary-search-account-menu"
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{
        '& .MuiPaper-root': {
          maxWidth: 'calc(100vw - 32px)',
          mt: 1,
        }
      }}
    >
      {cliente ? (
        <>
          <MenuItem component={Link} to="/datosCliente" onClick={handleMenuClose}>
            Mi cuenta
          </MenuItem>
          <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
        </>
      ) : (
        <>
          <MenuItem component={Link} to="/validacion" onClick={handleMenuClose}>
            Entrar
          </MenuItem>
          <MenuItem component={Link} to="/registro" onClick={handleMenuClose}>
            Registrarse
          </MenuItem>
        </>
      )}
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      id="primary-search-account-menu-mobile"
      keepMounted
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      sx={{
        '& .MuiPaper-root': {
          maxWidth: 'calc(100vw - 32px)',
          mt: 1,
        }
      }}
    >
      <MenuItem onClick={handleMobileMenuClose} component={Link} to="/carro">
        <IconButton size="large" color="inherit">
          <Badge badgeContent={carro ? carro.length : 0} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <Box sx={{ ml: 2 }}>Carro</Box>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="cuenta de usuario"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Box sx={{ ml: 2 }}>Perfil</Box>
      </MenuItem>
    </Menu>
  );

  const renderMenuLateral = (
    <Menu
      anchorEl={menuLateralAnchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={isMenuLateralOpen}
      onClose={handleMenuLateralClose}
      keepMounted
      sx={{
        '& .MuiPaper-root': {
          maxWidth: 'calc(100vw - 32px)',
        }
      }}
    >
      <MenuItem onClick={() => { setCategoriaSeleccionada("juguetes"); handleMenuLateralClose(); }}>
        <ToysIcon sx={{ mr: 1 }} />
        Juguetes
      </MenuItem>
      <MenuItem onClick={() => { setCategoriaSeleccionada("ropa"); handleMenuLateralClose(); }}>
        <CheckroomIcon sx={{ mr: 1 }} />
        Ropa
      </MenuItem>
      <MenuItem onClick={() => { setCategoriaSeleccionada("electronica"); handleMenuLateralClose(); }}>
        <DevicesIcon sx={{ mr: 1 }} />
        Electrónica
      </MenuItem>
      <MenuItem onClick={() => { setCategoriaSeleccionada("hogar"); handleMenuLateralClose(); }}>
        <HomeIcon sx={{ mr: 1 }} />
        Hogar
      </MenuItem>
      <MenuItem
        onClick={() => { setCategoriaSeleccionada("destacados"); handleMenuLateralClose(); }}
        sx={{
          bgcolor: "warning.main",
          color: "white",
          fontWeight: "bold",
          "&:hover": { bgcolor: "warning.dark" },
        }}
      >
        <StarIcon sx={{ mr: 1, color: "white" }} />
        Destacados
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ 
          minHeight: { xs: 64, sm: 70 },
          flexWrap: { xs: 'wrap', sm: 'nowrap' },
          py: { xs: 1, sm: 0 }
        }}>
          {/* Primera fila en móvil: Logo y botones */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            width: { xs: '100%', sm: 'auto' },
            justifyContent: 'space-between',
            mb: { xs: 1, sm: 0 }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="categorías"
                onClick={handleMenuLateralOpen}
                sx={{ mr: { xs: 1, sm: 2 } }}
              >
                <MenuIcon />
              </IconButton>

              <IconButton component={Link} to="/" sx={{ p: 0 }}>
                <img
                  src="/logoTransp.png"
                  alt="Logo"
                  style={{ 
                    height: isMobile ? "60px" : "90px",
                    cursor: "pointer",
                    maxWidth: "100%"
                  }}
                />
              </IconButton>
            </Box>

            {/* Botones de móvil a la derecha */}
            <Box sx={{ display: { xs: 'flex', sm: 'none' }, alignItems: 'center' }}>
              <IconButton 
                color="inherit"
                component={Link}
                to="/carro"
                sx={{ mr: 1 }}
              >
                <Badge badgeContent={carro ? carro.length : 0} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              
              <IconButton
                size="large"
                aria-label="mostrar más"
                aria-controls="primary-search-account-menu-mobile"
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Segunda fila en móvil: Buscador */}
          <Box sx={{ 
            width: { xs: '100%', sm: 'auto' },
            flex: { sm: 1 },
            mx: { xs: 0, sm: 2, md: 4 }
          }}>
            <BuscadorResponsivo />
          </Box>

          {/* Tercera parte: Iconos de desktop */}
          <Box sx={{ 
            display: { xs: 'none', sm: 'flex' },
            alignItems: 'center',
            ml: 'auto'
          }}>
            <IconButton size="large" color="inherit" component={Link} to="/carro">
              <Badge badgeContent={carro ? carro.length : 0} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              edge="end"
              aria-label="cuenta de usuario"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {renderMobileMenu}
      {renderMenu}
      {renderMenuLateral}

      {/* Barra de categorías mejorada */}
      <Box sx={{ 
        bgcolor: "#8B5E3C", 
        px: { xs: 1, sm: 2 }, 
        py: 1, 
        overflowX: 'auto',
        '&::-webkit-scrollbar': {
          height: 4,
        },
        '&::-webkit-scrollbar-track': {
          background: 'rgba(255,255,255,0.1)',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(255,255,255,0.3)',
          borderRadius: 2,
        }
      }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "flex-start", sm: "center" },
            gap: { xs: 1, sm: 2 },
            fontFamily: "Inter, sans-serif",
            flexWrap: { xs: "nowrap", sm: "wrap" },
            minWidth: { xs: "max-content", sm: "auto" },
          }}
        >
          {["Juguetes", "Ropa", "Electrónica", "Hogar", "Destacados"].map((cat) => (
            <Typography
              key={cat}
              variant="body2"
              onClick={() => {
                const nomCat = cat === "Electrónica" ? "Electronica" : cat;
                setCategoriaSeleccionada(nomCat.toLowerCase());
              }}
              sx={{
                cursor: "pointer",
                textTransform: "uppercase",
                fontWeight: cat === "Destacados" ? "bold" : "normal",
                color: cat === "Destacados" ? "warning.main" : "white",
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                px: { xs: 0.8, sm: 1.2 },
                py: 0.5,
                borderRadius: 2,
                bgcolor: cat === "Destacados" ? "warning.light" : "rgba(255,255,255,0.1)",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.25)",
                },
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                whiteSpace: "nowrap",
              }}
            >
              <Box sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
                {cat === "Juguetes" && <ToysIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
                {cat === "Ropa" && <CheckroomIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
                {cat === "Electrónica" && <DevicesIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
                {cat === "Hogar" && <HomeIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
                {cat === "Destacados" && <StarIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
              </Box>
              {isMobile && cat.length > 8 ? cat.substring(0, 6) + '...' : cat}
            </Typography>
          ))}

          <Chip
            label={isMobile ? "Conócenos" : "Conócenos"}
            icon={!isMobile ? <PlaceIcon /> : undefined}
            component={Link}
            to="/conocenos"
            clickable
            sx={{
              bgcolor: "primary.main",
              color: "white",
              fontWeight: "bold",
              textTransform: "uppercase",
              "&:hover": {
                bgcolor: "primary.dark",
              },
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
              height: { xs: 28, sm: 32 },
              '.MuiChip-icon': {
                fontSize: { xs: 16, sm: 18 },
              }
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}