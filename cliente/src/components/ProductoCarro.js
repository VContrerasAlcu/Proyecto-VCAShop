import React, { useContext, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  IconButton,
  Stack,
  Grid,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { CarroContext } from "../context/CarroContext.js";
import { ClienteContext } from "../context/ClienteContext.js";
import { SocketContext } from "../context/WebSocketContext.js";
import { productosContext } from "../context/productosContext.js";
import Carro from "../classes/Carro.js";
import Producto from "../classes/Producto.js";
import actualizarProductos from "../services/actualizacionProductos.js";
import { useNavigate } from "react-router-dom";

/**
 * Componente ProductoCarro
 * Representa un producto dentro del carrito con controles de cantidad y eliminación.
 */
const ProductoCarro = ({ producto, cantidad }) => {
  const { carro, setCarro } = useContext(CarroContext);
  const { cliente } = useContext(ClienteContext);
  const { socket } = useContext(SocketContext);
  const { productos, setProductos } = useContext(productosContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  // Estado local para la cantidad del producto
  const [cantidadProducto, setCantidadProducto] = useState(
    carro.find(item => item.producto.id === producto.id)?.cantidad || 1
  );

  // Calcula el precio total del producto
  const precioTotal = producto.precio * cantidadProducto;

  /**
   * Actualiza la cantidad del producto en el carrito
   */
  const actualizarCantidad = (nuevaCantidad) => {
    if (nuevaCantidad < 1) return;

    // Actualiza el carrito
    const nuevoCarro = carro.map(item =>
      item.producto.id === producto.id
        ? { ...item, cantidad: nuevaCantidad }
        : item
    );
    setCarro(nuevoCarro);

    // Actualiza el stock en el contexto de productos
    const productoActualizado = productos.find(p => p.id === producto.id);
    if (productoActualizado) {
      productoActualizado.stock -= (nuevaCantidad - cantidadProducto);
      setProductos([...productos]); // Fuerza actualización
    }

    setCantidadProducto(nuevaCantidad);
  };

  /**
   * Elimina el producto del carrito y actualiza el stock
   */
  const eliminarProducto = async (producto) => {
    if (cliente) {
      const nuevoCarro = new Carro(carro, socket, cliente);
      const resultado = await nuevoCarro.quitar(producto);

      if (resultado !== false) {
        setCarro([...nuevoCarro.contenido]);

        // Devuelve el stock al producto
        const productoActualizado = productos.find(p => p.id === producto.id);
        if (productoActualizado) {
          productoActualizado.stock += cantidadProducto;
          setProductos([...productos]);
        }

        // Escucha actualizaciones de stock vía WebSocket
        socket.on("stock_actualizado", (productoRecibido) => {
          const productoNuevo = new Producto(
            productoRecibido.id,
            productoRecibido.nombre,
            productoRecibido.descripcion,
            productoRecibido.precio,
            productoRecibido.stock,
            productoRecibido.imagen,
            productoRecibido.categoria
          );

          setProductos(prevProductos => {
            const productosActualizados = actualizarProductos(prevProductos, productoNuevo);
            return [...productosActualizados];
          });
        });
      } else {
        alert('Error al añadir el producto al carrito');
      }
    } else {
      navigate('/validacion');
    }
  };

  /**
   * Renderiza el producto dentro del carrito
   */
  return (
    <Card
      variant="outlined"
      sx={{
        mb: 2,
        overflow: 'visible',
        borderRadius: 2,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <CardContent sx={{ p: { xs: 1.5, sm: 2 }, '&:last-child': { pb: { xs: 1.5, sm: 2 } } }}>
        {/* Versión para desktop/tablet */}
        {!isMobile ? (
          <Grid container alignItems="center" spacing={2}>
            {/* Imagen del producto */}
            <Grid item xs={12} sm={3} md={2}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Avatar 
                  variant="square" 
                  src={producto.imagen} 
                  sx={{ 
                    width: { xs: 70, sm: 80, md: 90 }, 
                    height: { xs: 70, sm: 80, md: 90 },
                    borderRadius: 1
                  }} 
                />
              </Box>
            </Grid>

            {/* Nombre del producto */}
            <Grid item xs={12} sm={3} md={4}>
              <Typography 
                variant={isTablet ? "subtitle1" : "h6"} 
                sx={{ 
                  fontWeight: 500,
                  fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' }
                }}
              >
                {producto.nombre}
              </Typography>
            </Grid>

            {/* Controles de cantidad */}
            <Grid item xs={12} sm={3} md={2}>
              <Stack 
                direction="row" 
                spacing={1} 
                alignItems="center" 
                justifyContent={isMobile ? "center" : "flex-start"}
              >
                <Button 
                  variant="outlined" 
                  size="small" 
                  onClick={() => actualizarCantidad(cantidadProducto - 1)}
                  sx={{ 
                    minWidth: { xs: 32, sm: 36 },
                    height: { xs: 32, sm: 36 },
                    p: 0
                  }}
                >
                  -
                </Button>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    minWidth: 30, 
                    textAlign: 'center',
                    fontSize: { xs: '0.9rem', sm: '1rem' }
                  }}
                >
                  {cantidadProducto}
                </Typography>
                <Button 
                  variant="outlined" 
                  size="small" 
                  onClick={() => actualizarCantidad(cantidadProducto + 1)}
                  sx={{ 
                    minWidth: { xs: 32, sm: 36 },
                    height: { xs: 32, sm: 36 },
                    p: 0
                  }}
                >
                  +
                </Button>
              </Stack>
            </Grid>

            {/* Precio total */}
            <Grid item xs={6} sm={2} md={2}>
              <Typography 
                variant="h6" 
                color="primary"
                sx={{ 
                  textAlign: 'center',
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                  fontWeight: 600
                }}
              >
                {precioTotal.toFixed(2)} €
              </Typography>
            </Grid>

            {/* Botón de eliminar */}
            <Grid item xs={6} sm={1} md={2}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <IconButton 
                  color="error" 
                  onClick={() => eliminarProducto(producto)}
                  size={isMobile ? "small" : "medium"}
                  sx={{ 
                    '&:hover': { backgroundColor: 'error.light', color: 'white' }
                  }}
                >
                  <DeleteIcon fontSize={isMobile ? "small" : "medium"} />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        ) : (
          // Versión para móvil - diseño vertical
          <Box>
            {/* Fila superior: Imagen, nombre y precio */}
            <Stack direction="row" spacing={1.5} alignItems="flex-start" sx={{ mb: 2 }}>
              <Avatar 
                variant="square" 
                src={producto.imagen} 
                sx={{ 
                  width: 70, 
                  height: 70,
                  borderRadius: 1,
                  flexShrink: 0
                }} 
              />
              
              <Box sx={{ flexGrow: 1 }}>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    mb: 0.5
                  }}
                >
                  {producto.nombre}
                </Typography>
                
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography 
                    variant="h6" 
                    color="primary"
                    sx={{ 
                      fontSize: '1.1rem',
                      fontWeight: 600
                    }}
                  >
                    {precioTotal.toFixed(2)} €
                  </Typography>
                  
                  <IconButton 
                    color="error" 
                    onClick={() => eliminarProducto(producto)}
                    size="small"
                    sx={{ 
                      ml: 1,
                      '&:hover': { backgroundColor: 'error.light', color: 'white' }
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Box>
            </Stack>

            {/* Fila inferior: Controles de cantidad */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              pt: 1,
              borderTop: '1px solid',
              borderColor: 'divider'
            }}>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ fontWeight: 500 }}
              >
                Cantidad:
              </Typography>
              
              <Stack direction="row" spacing={1} alignItems="center">
                <Button 
                  variant="outlined" 
                  size="small" 
                  onClick={() => actualizarCantidad(cantidadProducto - 1)}
                  sx={{ 
                    minWidth: 32,
                    height: 32,
                    p: 0
                  }}
                >
                  -
                </Button>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    minWidth: 30, 
                    textAlign: 'center',
                    fontSize: '0.95rem',
                    fontWeight: 500
                  }}
                >
                  {cantidadProducto}
                </Typography>
                <Button 
                  variant="outlined" 
                  size="small" 
                  onClick={() => actualizarCantidad(cantidadProducto + 1)}
                  sx={{ 
                    minWidth: 32,
                    height: 32,
                    p: 0
                  }}
                >
                  +
                </Button>
              </Stack>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductoCarro;