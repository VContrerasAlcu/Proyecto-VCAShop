
import { Box, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProductoCarro from "./ProductoCarro.js";
import { CarroContext } from "../context/CarroContext.js";
import { useContext } from "react";
import { SocketContext } from "../context/WebSocketContext.js";
import { ClienteContext } from "../context/ClienteContext.js";
import Carro from "../classes/Carro.js";

/**
 * Componente CarroComp
 * Muestra los productos en el carrito y permite volver o comprar.
 */
const CarroComp = () => {
  
  const { socket } = useContext(SocketContext);
  const { cliente } = useContext(ClienteContext);
  const navigate = useNavigate();
  const { carro, setCarro } = useContext(CarroContext);

  // Calcula el total del carrito sumando precio * cantidad
  const totalCarro = carro.reduce(
    (total, item) => total + item.producto.precio * item.cantidad,
    0
  );

  /**
   * Función para volver a la pantalla anterior
   * Reconstruye el carrito usando la clase Carro y actualiza el contexto
   */
  const volver = async () => {
    const nuevoCarro = new Carro(carro, socket, cliente);

    for (const item of carro) {
      await nuevoCarro.agregar(item.producto, item.cantidad);
    }

    setCarro([...nuevoCarro.contenido]);

    // Navega hacia atrás
    navigate(-1);
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
      
      <Typography variant="h4" align="center" gutterBottom>
        Tu Carrito 🛒
      </Typography>

      {/* Contenedor de productos */}
      <Paper sx={{ p: 2, mb: 3 }}>
        {carro.length > 0 ? (
          carro.map(({ producto, cantidad }) => (
            <Box key={producto.id} sx={{ mb: 2 }}>
              <ProductoCarro producto={producto} cantidad={cantidad} />
            </Box>
          ))
        ) : (
          // Si el carrito está vacío, muestra mensaje
          <Typography variant="h6" align="center">
            No hay productos en el carrito.
          </Typography>
        )}
      </Paper>

      {/* Total del carrito */}
      {carro.length > 0 && (
        <Typography
          variant="h5"
          align="right"
          sx={{ fontWeight: "bold", mt: 2, color: "darkblue" }}
        >
          Total: {totalCarro.toFixed(2)} €
        </Typography>
      )}

      {/* Botones de acción: volver y comprar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: carro.length > 0 ? "space-between" : "center",
          mt: 3,
        }}
      >
        <Button variant="contained" color="secondary" onClick={volver}>
          Volver
        </Button>

        {carro.length > 0 && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/compra")}
          >
            Comprar
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default CarroComp