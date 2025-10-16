/**
 * Clase Producto
 * Representa un producto disponible en la tienda.
 */
class Producto {
    /**
     * Constructor del producto
     * @param {string|number} id - Identificador único del producto
     * @param {string} nombre - Nombre del producto
     * @param {string} descripcion - Descripción detallada del producto
     * @param {number} precio - Precio unitario del producto
     * @param {number} stock - Cantidad disponible en inventario
     * @param {string} imagen - URL o ruta de la imagen del producto
     * @param {string} categoria - Categoría a la que pertenece el producto
     * @param {boolean} destacado - Indica si el producto es destacado (opcional, por defecto false)
     */
    constructor(id, nombre, descripcion, precio, stock, imagen, categoria, destacado = false) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.imagen = imagen; 
        this.categoria = categoria;
        this.destacado = destacado;
    }
}

export default Producto;