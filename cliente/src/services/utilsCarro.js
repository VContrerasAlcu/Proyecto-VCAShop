/**
 *  Función productoEnCarro
 * Verifica si un producto ya está presente en el carrito.
 *
 * @param {Object} producto - Producto que se quiere verificar.
 * @param {Array} carro - Array actual del carrito.
 * @returns {boolean} - true si el producto está en el carrito, false si no.
 */
export function productoEnCarro(producto, carro) {
  // Si el carrito existe y tiene elementos
  if (carro && carro.length > 0) {
    // Verifica si algún item del carrito tiene el mismo ID de producto
    return carro.some(item => item.producto.id === producto.id);
  }

  // Si el carrito está vacío o no existe, devuelve false
  return false;
}