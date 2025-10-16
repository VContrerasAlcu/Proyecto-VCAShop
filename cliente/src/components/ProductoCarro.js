import React, { useContext, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  IconButton,
  Stack
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
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      sx={{ p: 2, borderBottom: "1px solid #ddd" }}
    >
      {/* Imagen del producto */}
      <Avatar variant="square" src={producto.imagen} sx={{ width: 80, height: 80 }} />

      {/* Nombre y controles de cantidad */}
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h6">{producto.nombre}</Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Button variant="outlined" size="small" onClick={() => actualizarCantidad(cantidad - 1)}>-</Button>
          <Typography variant="body1">{cantidadProducto}</Typography>
          <Button variant="outlined" size="small" onClick={() => actualizarCantidad(cantidad + 1)}>+</Button>
        </Stack>
      </Box>

      {/* Precio total */}
      <Typography variant="h6" color="primary">
        {precioTotal.toFixed(2)} €
      </Typography>

      {/* Botón de eliminar */}
      <IconButton color="error" onClick={() => eliminarProducto(producto)}>
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
};

export default ProductoCarro;