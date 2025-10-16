import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ClienteContext } from "../context/ClienteContext.js";

/**
 * Componente RutaProtegida
 * Protege rutas que requieren que el cliente esté autenticado.
 * Si no hay cliente, redirige a /validacion.
 */
function RutaProtegida({ children }) {
  const { cliente } = useContext(ClienteContext);

  // Si hay cliente, renderiza el contenido protegido
  // Si no, redirige al login
  return cliente ? children : <Navigate to="/validacion" />;
}

export default RutaProtegida;