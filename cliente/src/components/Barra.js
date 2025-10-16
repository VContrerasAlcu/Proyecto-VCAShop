// Importaciones necesarias desde React, Material UI, React Router y contextos personalizados
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
} from "@mui/material";

// Íconos de Material UI
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// Navegación con React Router
import { Link } from "react-router-dom";

// Contextos globales para estado compartido
import { CarroContext } from "../context/CarroContext.js";
import { ClienteContext } from "../context/ClienteContext.js";
import { CategoriaContext } from "../context/CategoriaContext.js";

// Íconos para categorías
import StarIcon from "@mui/icons-material/Star";
import ToysIcon from "@mui/icons-material/Toys";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import DevicesIcon from "@mui/icons-material/Devices";
import HomeIcon from "@mui/icons-material/Home";

// Fuente personalizada
import "@fontsource/inter";

// Hook de navegación
import { useNavigate } from "react-router-dom";

// Componentes de búsqueda personalizados
import BuscadorAutocompleto from "./BuscadorAutocompleto.js";
import BuscadorResponsivo from "./BuscadorResponsivo.js";

// Componente visual adicional
import Chip from "@mui/material/Chip";
import PlaceIcon from '@mui/icons-material/Place';

// Componente principal de la barra de navegación
  export default function PrimarySearchAppBar() {
  // Acceso a los contextos globales
  const { carro, setCarro } = useContext(CarroContext);
  const { cliente, setCliente } = useContext(ClienteContext);
  const { setCategoriaSeleccionada } = useContext(CategoriaContext);

  // Estados para controlar los menús desplegables
  const [anchorEl, setAnchorEl] = useState(null); // Menú de perfil
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null); // Menú móvil
  const [menuLateralAnchorEl, setMenuLateralAnchorEl] = useState(null); // Menú lateral de categorías

  // Flags booleanos para saber si los menús están abiertos
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isMenuLateralOpen = Boolean(menuLateralAnchorEl);

  // Estado para el texto de búsqueda (no usado directamente aquí)
  const [textoBusqueda, setTextoBusqueda] = useState("");

  // Hook para redireccionar
  const navigate = useNavigate();

  // Al montar el componente, recupera el cliente desde sessionStorage
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

  // Cada vez que cambia el carrito, muestra en consola la cantidad de productos
  useEffect(() => {
    if (carro) {
      console.log("Barra re-renderizada. Productos en carro:", carro.length);
    }
  }, [carro]);

  // Abre el menú de perfil
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Cierra el menú móvil
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  // Cierra el menú de perfil y el móvil
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  // Abre el menú móvil
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  // Abre el menú lateral de categorías
  const handleMenuLateralOpen = (event) => {
    setMenuLateralAnchorEl(event.currentTarget);
  };

  // Cierra el menú lateral
  const handleMenuLateralClose = () => {
    setMenuLateralAnchorEl(null);
  };

  // Cierra sesión: limpia cliente y carro del estado y del sessionStorage
  const handleLogout = () => {
    setCliente(null);
    setCarro(null);
    sessionStorage.removeItem("carro");
    sessionStorage.removeItem("cliente");
    handleMenuClose();
  };

  // Lista de categorías disponibles
  const categorias = ["juguetes", "ropa", "electronica", "hogar", "destacados"];

  // Menú de perfil (versión desktop)
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id="primary-search-account-menu"
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {cliente ? (
        <>
          {/* Si el cliente está logueado, muestra acceso a cuenta y logout */}
          <MenuItem component={Link} to="/datosCliente" onClick={handleMenuClose}>
            Mi cuenta
          </MenuItem>
          <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
        </>
      ) : (
        <>
          {/* Si no está logueado, muestra opciones de login y registro */}
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

  // Menú móvil con acceso al carrito y perfil
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id="primary-search-account-menu-mobile"
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        {/* Icono del carrito con contador */}
        <IconButton size="large" color="inherit" component={Link} to="/carro">
          <Badge badgeContent={carro ? carro.length : 0} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Carro</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        {/* Icono de perfil */}
        <IconButton
          size="large"
          aria-label="cuenta de usuario"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Perfil</p>
      </MenuItem>
    </Menu>
  );

  // Menú lateral con categorías
  const renderMenuLateral = (
    <Menu
      anchorEl={menuLateralAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={isMenuLateralOpen}
      onClose={handleMenuLateralClose}
      keepMounted
    >
      {/* Cada categoría tiene su ícono y actualiza el estado global al seleccionarse */}
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
 // Render principal del componente
return (
  // Contenedor general con flexGrow para ocupar todo el ancho disponible
  <Box sx={{ flexGrow: 1 }}>
    {/* Barra superior fija */}
    <AppBar position="static">
      <Toolbar>
        {/* Botón para abrir el menú lateral de categorías */}
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="categorías"
          onClick={handleMenuLateralOpen}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo de la tienda, enlazado a la página principal */}
        <IconButton component={Link} to="/" sx={{ p: 0 }}>
          <img
            src="/images/logoTransp.png"
            alt="Logo"
            style={{ height: "90px", cursor: "pointer" }}
          />
        </IconButton>

        {/* Buscador responsivo (adaptado a distintos tamaños de pantalla) */}
        <Box sx={{ width: 300, ml: 4 }}>
          <BuscadorResponsivo />
        </Box>

       
        <Box sx={{ flexGrow: 1 }} />

        {/* Íconos visibles solo en pantallas medianas o grandes */}
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          {/* Icono del carrito con contador de productos */}
          <IconButton size="large" color="inherit" component={Link} to="/carro">
            <Badge badgeContent={carro ? carro.length : 0} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {/* Icono de perfil para abrir el menú de usuario */}
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

        {/* Ícono de menú móvil (visible solo en pantallas pequeñas) */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
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
      </Toolbar>
    </AppBar>

   
    {renderMobileMenu}
    {renderMenu}
    {renderMenuLateral}

    {/* Barra inferior con categorías destacadas */}
    <Box sx={{ bgcolor: "#8B5E3C", px: 2, py: 1 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* Mapeo de categorías para mostrar como botones con iconos */}
        {["Juguetes", "Ropa", "Electrónica", "Hogar", "Destacados"].map((cat) => (
          <Typography
            key={cat}
            variant="body2"
            onClick={() => {
              // Ajuste para que "Electrónica" se convierta en "electronica"
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
              px: 1.2,
              py: 0.5,
              borderRadius: 2,
              bgcolor: cat === "Destacados" ? "warning.light" : "rgba(255,255,255,0.1)",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.25)",
              },
            }}
          >
            {/* Íconos por categoría */}
            {cat === "Juguetes" && <ToysIcon sx={{ fontSize: 18 }} />}
            {cat === "Ropa" && <CheckroomIcon sx={{ fontSize: 18 }} />}
            {cat === "Electrónica" && <DevicesIcon sx={{ fontSize: 18 }} />}
            {cat === "Hogar" && <HomeIcon sx={{ fontSize: 18 }} />}
            {cat === "Destacados" && <StarIcon sx={{ fontSize: 18 }} />}
            {cat}
          </Typography>
        ))}

        {/* Botón adicional para la sección "Conócenos" */}
        <Chip
          label="Conócenos"
          icon={<PlaceIcon />}
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
          }}
        />
      </Box>
    </Box>
  </Box>
);
}