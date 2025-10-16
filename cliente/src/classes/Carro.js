/**
 * Clase Carro
 * Representa el carrito de compras del cliente en el frontend.
 * Se comunica con el servidor mediante WebSockets para mantener el estado sincronizado.
 */
class Carro {
    /**
     * Constructor del carrito
     * @param {Array} contenido - Lista inicial de productos en el carrito
     * @param {Socket} socket - Instancia de socket.io para comunicación en tiempo real
     * @param {object} cliente - Datos del cliente (incluye email y token)
     */
    constructor(contenido = [], socket, cliente) {
        this.contenido = contenido; // Estado local del carrito
        this.socket = socket; // Conexión WebSocket con el servidor
        this.cliente = cliente; // Información del cliente autenticado
    }

    /**
     * Agrega un producto al carrito
     * Envía el evento 'agregar' al servidor y espera la respuesta
     * @param {object} producto - Producto a agregar
     * @param {number} cantidad - Cantidad deseada
     * @returns {Promise<Array>} Carrito actualizado
     */
    agregar(producto, cantidad) {
        return new Promise((resolve, reject) => {
            this.socket.emit("agregar", { cliente: this.cliente, producto, cantidad });

            this.socket.once("respuesta_agregar", (respuesta) => {
                if (respuesta === false) {
                    console.log("Error respuesta_agregar");
                    reject(false);
                } else {
                    this.contenido = [...respuesta]; // Actualiza el estado local del carrito
                    console.log("Carro actualizado en agregar:", this.contenido);
                    resolve(this.contenido);
                }
            });
        });
    }

    /**
     * Quita un producto del carrito
     * Envía el evento 'quitar' al servidor y espera la respuesta
     * @param {object} producto - Producto a quitar
     * @returns {Promise<Array>} Carrito actualizado
     */
    quitar(producto) {
        return new Promise((resolve, reject) => {
            this.socket.emit("quitar", { cliente: this.cliente, producto });

            this.socket.once("respuesta_quitar", (respuesta) => {
                if (respuesta === false) {
                    console.log("Error respuesta_quitar");
                    reject(false);
                } else {
                    this.contenido = [...respuesta]; // Actualiza el estado local del carrito
                    console.log("Carro actualizado en quitar:", this.contenido);
                    resolve(this.contenido);
                }
            });
        });
    }

    /**
     * Vacía completamente el carrito
     * Envía el evento 'vaciar' al servidor y espera confirmación
     * @returns {Promise<boolean>} True si se vació correctamente
     */
    vaciar() {
        return new Promise((resolve) => {
            console.log(`envio a servidor desde vaciar. cliente: ${this.cliente.email}`);
            this.socket.emit("vaciar", { cliente: this.cliente });

            this.socket.once("respuesta_vaciar", (respuesta) => {
                this.contenido = []; // Limpia el estado local
                resolve(respuesta); // true o false
            });
        });
    }

    /**
     * Devuelve el número de productos en el carrito
     * @returns {number}
     */
    numProductos() {
        return this.contenido.length;
    }
}

export default Carro;