import { useNavigate } from "react-router-dom";
import * as React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography
} from '@mui/material';
import { productoContext } from "../context/productoContext.js";
import { useContext } from 'react';
import InfoIcon from '@mui/icons-material/Info';

/**
 * Componente ProductoMin
 * Muestra una tarjeta compacta de producto con navegación a detalles.
 */
function ProductoMin({ producto }) {
  const navigate = useNavigate();
  const { setProducto } = useContext(productoContext);

  /**
   * Al hacer clic, guarda el producto en contexto y navega a detalles
   */
  const handleInformacion = () => {
    setProducto(producto);
    navigate('/detalles');
  };

  /**
   * Renderiza la tarjeta del producto
   */
  return (
    <Card
      onClick={handleInformacion}
      sx={{
        maxWidth: 200,
        height: 400,
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: 4,
        },
      }}
    >
      {/* Imagen del producto */}
      <CardMedia
        component="img"
        alt={producto.nombre}
        image={producto.imagen}
        sx={{ width: '100%', height: 150, objectFit: 'cover' }}
      />

      {/* Contenido textual */}
      <CardContent
        sx={{
          flexGrow: 1,
          minHeight: 120,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        {/* Nombre del producto */}
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            minHeight: 60,
            maxHeight: 70,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
          }}
        >
          {producto.nombre}
        </Typography>

        {/* Precio */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            color: 'darkblue',
            textAlign: 'center'
          }}
        >
          {producto.precio} €
        </Typography>

        {/* Descripción truncada */}
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            height: 40
          }}
        >
          {producto.descripcion}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ProductoMin;