import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CarroContext } from "../context/CarroContext.js";
import { ClienteContext } from "../context/ClienteContext.js";
import { SocketContext } from "../context/WebSocketContext.js";

/**
 * Componente PagoError
 * Muestra un mensaje de error tras un fallo en el pago y recarga el carrito.
 */
const PagoError = () => {
  const navigate = useNavigate();
  const { carro, setCarro } = useContext(CarroContext);
  const { setCliente } = useContext(ClienteContext);
  const { socket } = useContext(SocketContext);
  const [mensajeVaciar, setMensajeVaciar] = useState(null);

  /**
   * Al montar el componente, recupera el cliente y su carrito desde el servidor
   */
  useEffect(() => {
    const cargarDatos = async () => {
      const clientePrueba = sessionStorage.getItem("cliente");
      console.log('datos de clientePrueba: ', clientePrueba);

      const cliente = JSON.parse(clientePrueba);
      console.log('datos de cliente en sessionStorage: ', cliente);
      setCliente(cliente);

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/carros/cargar`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cliente)
        });

        if (!response.ok) {
          console.log('Error en la petición de carro.');
        } else {
          const data = await response.json();
          console.log(`data devuelto en response.json: ${data}`);

          // Guarda el carro en sessionStorage y contexto
          sessionStorage.setItem("carro", JSON.stringify(data));
          setCarro(data);

          if (data.length > 0) {
            console.log(`carro del cliente cargado. productos: ${data[0].producto.nombre}, ${data[0].cantidad}`);
          }
        }
      } catch (err) {
        console.log('Error al conectar con el servidor');
      }
    };

    cargarDatos();
  }, []);

  /**
   * Renderiza el mensaje de error y botón para volver al carrito
   */
  return (
    <Box sx={{ mt: 10, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom color="error">
        ❌ Algo salió mal con tu pago
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        El pago no pudo completarse o fue cancelado. Puedes intentarlo de nuevo desde tu carrito.
      </Typography>
      <Button variant="outlined" onClick={() => navigate("/carro")}>
        Volver al carrito
      </Button>
    </Box>
  );
};

export default PagoError;