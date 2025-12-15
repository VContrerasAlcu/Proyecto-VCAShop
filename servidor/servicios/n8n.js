import fetch from "node-fetch";

export async function enviarN8N(cliente, carro) {
  const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;
  const productosComprados = carro.map(item => item.producto.nombre);
  
  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: cliente.nombre,
        telefono: cliente.telefono,
        email: cliente.email,
        productos: productosComprados,
      }),
    });

    if (!response.ok) {
      console.error("❌ Error al enviar datos a n8n:", await response.text());
    } else {
      console.log("✅ Datos enviados a n8n correctamente");
    }
  } catch (error) {
    console.error("❌ Error de conexión con n8n:", error.message);
  }
}