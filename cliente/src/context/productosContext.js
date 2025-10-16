import { createContext, useState } from "react";

// Crea el contexto que se usará para compartir la lista de productos
export const productosContext = createContext();

/**
 * Componente ProductosProvider
 * Proporciona la lista de productos a toda la aplicación.
 */
export function ProductosProvider({ children }) {

  const [productos, setProductos] = useState([]);

  /**
   * Proporciona los productos y su actualizador a todos los componentes hijos
   */
  return (
    <productosContext.Provider value={{ productos, setProductos }}>
      {children}
    </productosContext.Provider>
  );
}