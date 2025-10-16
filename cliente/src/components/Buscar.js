import React, { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { productosContext } from "../context/productosContext.js";
import ProductoMin from "./ProductoMin.js";
import { Box, Typography } from "@mui/material";
import { CategoriaContext } from "../context/CategoriaContext.js";
import BuscadorAutocompleto from "./BuscadorAutocompleto.js";

/**
 * Componente Buscar
 * Muestra los productos que coinciden con el texto de búsqueda.
 */
const Buscar = () => {

  const { productos } = useContext(productosContext);
  const { setCategoriaSeleccionada } = useContext(CategoriaContext);
  const [searchParams] = useSearchParams();
  const texto = searchParams.get("texto")?.toLowerCase() || "";
  const resultados = productos.filter((p) =>
    `${p.nombre} ${p.descripcion}`.toLowerCase().includes(texto)
  );

  // Al montar el componente, desactiva cualquier filtro por categoría
  useEffect(() => {
    setCategoriaSeleccionada(null);
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      {/* Título con el texto buscado */}
      <Typography variant="h5" sx={{ mb: 2, mt: 3 }}>
        Resultados para "{texto}"
      </Typography>

      {/* Si no hay resultados, muestra mensaje */}
      {resultados.length === 0 ? (
        <Typography>No se encontraron productos.</Typography>
      ) : (
        // Si hay resultados, los muestra en una lista con estilo flexible
        <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            listStyle: "none",
            padding: 0,
          }}
        >
          {resultados.map((producto) => (
            <li key={producto.id}>
              <ProductoMin producto={producto} />
            </li>
          ))}
        </ul>
      )}
    </Box>
  );
};

export default Buscar;