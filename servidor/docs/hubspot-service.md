📁 hubspot.js — Integración CRM con HubSpot
Este servicio conecta tu backend con HubSpot para registrar:
- 👤 Contactos
- 🧾 Deals (ventas)
- 📦 Line items (productos vendidos)
- 📝 Interés del cliente en productos

🔐 Autenticación
const token = process.env.HUBSPOT_TOKEN;
const headers = { Authorization: `Bearer ${token}` };


Usa un token privado de HubSpot almacenado en variables de entorno para seguridad.

👤 registrarContactoEnHubspot(cliente)
Crea un contacto en HubSpot usando su email y nombre.
- Si el contacto ya existe, lo detecta y evita duplicados.
- Útil para registrar usuarios al autenticarse o registrarse.

🧾 registrarCompraEnHubspot(compra)
Registra una compra como un deal en HubSpot:
- Busca el contacto por email
- Crea el deal con nombre, importe, fecha y moneda (EUR)
- Asocia el contacto al deal
- Crea y asocia los productos comprados como line items
Requisitos de compra:
{
  codigoredsys: "ABC123",
  email: "cliente@ejemplo.com",
  total: 89.97,
  carro: [
    {
      producto: { nombre, descripcion, precio },
      cantidad: 2
    },
    ...
  ]
}



📦 crearLineItem({ nombre, cantidad, precio, descripcion })
Crea un producto vendido como line item en HubSpot.
- Se usa dentro de registrarCompraEnHubspot
- Cada producto del carrito se convierte en un line item

🔗 asociarLineItemADeal(lineItemId, dealId)
Asocia un line item a un deal usando el tipo de asociación 20.

🧠 registrarInteresProducto(email, producto)
Registra una nota en HubSpot cuando un cliente visualiza un producto.
- Se asocia al contacto
- Evita duplicados usando un Map con TTL de 5 minutos
- Usa HTML (<br>) para mejorar la visualización en HubSpot

🧪 Ejemplo de nota registrada
🛍️ El cliente visualizó el producto:
Zapatillas Renacer (Calzado)
Precio: 49.99€
📝 Descripción:
Zapatillas deportivas edición especial




