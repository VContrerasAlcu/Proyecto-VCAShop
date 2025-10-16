import { Box, Typography, Button } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CarroContext } from "../context/CarroContext.js";
import { ClienteContext } from "../context/ClienteContext.js";
import { SocketContext } from "../context/WebSocketContext.js";

/**
 * Componente PagoOk
 * Muestra confirmación de compra y recarga datos del cliente y carrito.
 */
const PagoOk = () => {
  const navigate = useNavigate();
  const { carro, setCarro } = useContext(CarroContext);
  const { setCliente } = useContext(ClienteContext);
  const { socket } = useContext(SocketContext);
  const [mensajeVaciar, setMensajeVaciar] = useState(null);

  /**
   * Al montar el componente, recupera cliente y carrito desde el servidor
   */
  useEffect(() => {
    const cargarDatos = async () => {
      const clientePrueba = sessionStorage.getItem("cliente");
      console.log('datos de clientePrueba: ', clientePrueba);

      const cliente = JSON.parse(clientePrueba);
      console.log('datos de cliente en sessionStorage: ', cliente);
      setCliente(cliente);

      try {
        const response = await fetch('http://localhost:3001/carros/cargar', {
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
   * Renderiza el mensaje de éxito y botón para volver al inicio
   */
  return (
    <Box sx={{ mt: 10, textAlign: "center", px: 3 }}>
      <Typography variant="h4" gutterBottom color="success.main">
        ✅ ¡Gracias por tu compra!
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Hemos recibido tu pago correctamente. En breve recibirás un correo con los detalles de tu pedido.
      </Typography>

      <Button variant="contained" onClick={() => navigate("/")}>
        Volver al inicio
      </Button>
    </Box>
  );
};

export default PagoOk;