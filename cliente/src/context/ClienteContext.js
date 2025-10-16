import { createContext, useState, useEffect } from "react";

// Crea el contexto que se usará para compartir el estado del cliente autenticado
export const ClienteContext = createContext(null);

/**
 * Componente ClienteProvider
 * Proporciona el estado del cliente a toda la aplicación.
 */
export function ClienteProvider({ children }) {

  const [cliente, setCliente] = useState(null);

  /**
   * Al montar el componente, intenta recuperar el cliente desde sessionStorage
   * Esto permite mantener la sesión activa tras recargar la página
   */
  useEffect(() => {
    const cliente = sessionStorage.getItem("cliente");
    setCliente(cliente ? JSON.parse(cliente) : null);
  }, []);

  /**
   * Proporciona el cliente y su actualizador a todos los componentes hijos
   */
  return (
    <ClienteContext.Provider value={{ cliente, setCliente }}>
      {children}
    </ClienteContext.Provider>
  );
}