import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

// Crea el contexto que se usará para compartir la conexión WebSocket
export const SocketContext = createContext();

/**
 * Componente SocketProvider
 * Establece y gestiona la conexión WebSocket con el servidor.
 */
export function SocketProvider({ children }) {
  
  const [socket, setSocket] = useState(null);

  /**
   * Al montar el componente, se crea la conexión WebSocket
   * Se configuran eventos de conexión y desconexión
   */
  useEffect(() => {
    const webSocket = io('http://localhost:3001', {
      autoConnect: true,       // Conecta automáticamente al cargar
      reconnection: true       // Intenta reconectar si se pierde la conexión
    });

    // Evento cuando el cliente se conecta al servidor
    webSocket.on('connect', () => {
      console.log('cliente enviado connect');
    });

    // Evento cuando el cliente se desconecta del servidor
    webSocket.on('disconnect', () => {
      console.log('cliente desconectado');
    });

    // Guarda la instancia del socket en el estado
    setSocket(webSocket);

    // Al desmontar el componente, se desconecta el socket
    return () => {
      webSocket.disconnect();
    };
  }, []);

  /**
   * Proporciona el socket y su actualizador a todos los componentes hijos
   */
  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      {children}
    </SocketContext.Provider>
  );
}