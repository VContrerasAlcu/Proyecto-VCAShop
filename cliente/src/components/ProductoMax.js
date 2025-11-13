import {
  Card,
  CardActions,
  Box,
  Button,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  TextField,
  Tooltip
} from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { productoContext } from "../context/productoContext.js";
import { CarroContext } from "../context/CarroContext.js";
import { ClienteContext } from "../context/ClienteContext.js";
import { SocketContext } from "../context/WebSocketContext.js";
import { productosContext } from "../context/productosContext.js";
import Carro from "../classes/Carro.js";
import Producto from "../classes/Producto.js";
import actualizarProductos from "../services/actualizacionProductos.js";
import { useEffect } from "react";


/**
 * Componente ProductoMax
 * Muestra la vista ampliada de un producto con opción de añadir al carrito.
 */
function ProductoMax() {
  const { productoEnContext, setProducto } = useContext(productoContext);
  const navigate = useNavigate();
  const [cantidad, setCantidad] = useState(1);

  const { socket } = useContext(SocketContext);
  const { carro, setCarro } = useContext(CarroContext);
  const { cliente } = useContext(ClienteContext);
  const { productos, setProductos } = useContext(productosContext);
  const [interesRegistrado, setInteresRegistrado] = useState(false);



  useEffect(() => {
    if (cliente && productoEnContext && !interesRegistrado) {
      fetch(`${process.env.REACT_APP_API_URL}/hubspot/registro-interes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: cliente.email,
          producto: {
            nombre: productoEnContext.nombre,
            precio: productoEnContext.precio,
            categoria: productoEnContext.categoria,
            descripcion: productoEnContext.descripcion,
          },
        }),
      }).then(() => {
        setInteresRegistrado(true); // ← evita duplicados
      });
    }
  }, [cliente, productoEnContext, interesRegistrado]);




  /**
   * Añade el producto al carrito
   */
  const handleCarrito = async () => {
    if (cliente) {
      const nuevoCarro = new Carro(carro, socket, cliente);
      const resultado = await nuevoCarro.agregar(productoEnContext, cantidad);

      if (resultado !== false) {
        setCarro([...nuevoCarro.contenido]);
        navigate('/');

        // Escucha actualizaciones de stock vía WebSocket
        socket.on("stock_actualizado", (productoRecibido) => {
          const productoActualizado = new Producto(
            productoRecibido.id,
            productoRecibido.nombre,
            productoRecibido.descripcion,
            productoRecibido.precio,
            productoRecibido.stock,
            productoRecibido.imagen,
            productoRecibido.categoria
          );

          const actualizados = actualizarProductos(productos, productoActualizado);
          setProductos([...actualizados]);
        });
      } else {
        alert('Error al añadir el producto al carrito');
      }
    } else {
      navigate('/validacion');
    }
  };

  /**
   * Navega hacia atrás
   */
  const handleVolver = () => {
    navigate(-1);
  };

  /**
   * Aumenta la cantidad
   */
  const aumentarCantidad = () => {
    setCantidad(cantidad + 1);
  };

  /**
   * Disminuye la cantidad
   */
  const disminuirCantidad = () => {
    if (cantidad > 0) setCantidad(cantidad - 1);
  };

  /**
   * Renderiza la tarjeta del producto
   */
  return (
    <Card sx={{ maxWidth: 600, margin: "auto", mt: 4, padding: 2 }}>
      <CardMedia
        component="img"
        height="300"
        image={productoEnContext?.imagen}
        alt={productoEnContext?.nombre}
      />
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {productoEnContext?.nombre}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {productoEnContext?.categoria}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {productoEnContext?.descripcion}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: "bold", mt: 2, color: "darkblue" }}>
          {productoEnContext?.precio} €
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: "bold", mt: 2, color: "darkblue" }}>
          {productoEnContext?.stock} stock
        </Typography>

        {/* Selector de cantidad */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
          <IconButton color="primary" onClick={disminuirCantidad}>
            <RemoveIcon />
          </IconButton>
          <TextField
            type="number"
            value={cantidad}
            onChange={(e) => {
              const nuevoValor = parseInt(e.target.value) || 1;
              setCantidad(nuevoValor < 1 ? 1 : nuevoValor);
            }}
            sx={{ width: "60px", textAlign: "center" }}
            inputProps={{ inputMode: "numeric", min: 1 }}
          />
          <IconButton color="primary" onClick={aumentarCantidad}>
            <AddIcon />
          </IconButton>
        </Box>
      </CardContent>

      {/* Botones de acción */}
      <CardActions>
        <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <Tooltip title="Seguir comprando">
            <Button
              variant="contained"
              color="secondary"
              onClick={handleVolver}
              sx={{ fontSize: 24, padding: 1.5, minWidth: "150px" }}
            >
              <ArrowBackIcon sx={{ fontSize: 30 }} />
            </Button>
          </Tooltip>

          <Tooltip title="Añadir a carrito">
            <Button
              variant="contained"
              color="primary"
              onClick={handleCarrito}
              sx={{ fontSize: 24, padding: 1.5, minWidth: "150px" }}
            >
              <ShoppingCartIcon sx={{ fontSize: 30 }} />
            </Button>
          </Tooltip>
        </Box>
      </CardActions>
    </Card>
  );
}

export default ProductoMax;