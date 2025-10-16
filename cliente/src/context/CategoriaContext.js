import { createContext, useState } from "react";

// Crea el contexto que se usará para compartir la categoría seleccionada
export const CategoriaContext = createContext();

/**
 * Componente CategoriaProvider
 * Proporciona el estado de la categoría seleccionada a toda la aplicación.
 */
export const CategoriaProvider = ({ children }) => {
  
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

  /**
   * Proporciona la categoría y su actualizador a todos los componentes hijos
   */
  return (
    <CategoriaContext.Provider value={{ categoriaSeleccionada, setCategoriaSeleccionada }}>
      {children}
    </CategoriaContext.Provider>
  );
};