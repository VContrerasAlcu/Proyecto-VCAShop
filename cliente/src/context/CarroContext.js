import { createContext, useEffect, useState } from "react";

// Crea el contexto que se usará para compartir el estado del carrito
export const CarroContext = createContext();

/**
 * Componente CarroProvider
 * Proporciona el estado del carrito a toda la aplicación.
 */
export function CarroProvider({ children }) {
 
  const [carro, setCarro] = useState([]);

  /**
   * Al montar el componente, intenta recuperar el carrito desde sessionStorage
   * Esto permite mantener el carrito entre recargas o navegación
   */
  useEffect(() => {
    const carro = sessionStorage.getItem("carro");
    setCarro(carro ? JSON.parse(carro) : []);
  }, []);

  /**
   * Proporciona el carrito y su actualizador a todos los componentes hijos
   */
  return (
    <CarroContext.Provider value={{ carro, setCarro }}>
      {children}
    </CarroContext.Provider>
  );
}