// Función para actualizar cliente en backend
export default async function actualizarCliente(cliente) {
  try {
    // Realiza una petición POST al servidor con los datos del cliente
    const response = await fetch("http://localhost:3001/clientes/actualizarDatos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json" 
      },
      body: JSON.stringify(cliente) // Convierte el objeto cliente a JSON
    });

    // Si la respuesta es exitosa, devuelve true
    if (response.ok) {
      return true;
    } else {
      // Si hay error en la respuesta, lo muestra en consola y devuelve false
      console.log("Error en la respuesta del servidor:", response.status);
      return false;
    }

  } catch (error) {
    // Si ocurre un error en la petición (por ejemplo, conexión fallida), lo muestra y devuelve false
    console.log("Error en fetch de actualizar datos cliente:", error);
    return false;
  }
}