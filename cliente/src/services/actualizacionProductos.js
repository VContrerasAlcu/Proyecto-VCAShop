/**
 *  Función actualizarProductos
 * Reemplaza un producto dentro del array de productos por su versión actualizada.
 *
 * @param {Array} productos - Lista actual de productos.
 * @param {Object} producto - Producto actualizado que debe reemplazar al anterior.
 * @returns {Array} - Nuevo array con el producto actualizado.
 */
export default function actualizarProductos(productos, producto) {
  return productos.map(item =>
    // Si el ID coincide, reemplaza el producto con el nuevo
    item.id === producto.id ? { ...producto } : { ...item }
  );
}