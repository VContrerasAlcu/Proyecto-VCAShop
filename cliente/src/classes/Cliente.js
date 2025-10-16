/**
 * Clase Cliente
 * Representa a un usuario del sistema con sus datos personales y estado de autenticación.
 */
class Cliente {
    // Token de autenticación (JWT)
    token = null;

    /**
     * Constructor del cliente
     * @param {string} email - Correo electrónico del cliente
     * @param {string} password - Contraseña del cliente
     * @param {string|null} nombre - Nombre del cliente (opcional)
     * @param {string|null} direccion - Dirección del cliente (opcional)
     * @param {string|null} telefono - Teléfono del cliente (opcional)
     */
    constructor(email, password, nombre = null, direccion = null, telefono = null) {
        this.email = email;
        this.password = password;
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
    }

    /**
     * Autoriza al cliente con un token
     * @param {string} token - Token de autenticación recibido del servidor
     */
    autorizar(token) {
        this.token = token;
    }

    /**
     * Desautoriza al cliente (cierra sesión)
     */
    desautorizar() {
        this.token = null;
    }
}

export default Cliente;