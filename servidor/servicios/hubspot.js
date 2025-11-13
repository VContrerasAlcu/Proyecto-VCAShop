// services/hubspot.js
import axios from "axios";

const token = process.env.HUBSPOT_TOKEN;
const headers = { Authorization: `Bearer ${token}` };


async function crearLineItem({ nombre, cantidad, precio, descripcion, hs_product_id }) {
  if (!hs_product_id) throw new Error("Falta hs_product_id al crear el line item");
  try {
    const response = await axios.post(
      "https://api.hubapi.com/crm/v3/objects/line_items",
      {
        properties: {
          name: nombre,
          quantity: cantidad,
          price: precio,
          hs_product_description: descripcion || "",
          hs_product_id
        },
      },
      { headers }
    );
    return response.data.id;
  } catch (error) {
    console.error("❌ Error al crear line item:", {
                  status: error.response?.status,
                  data: error.response?.data,
                  headers: error.response?.headers,
                });
    throw error;
  }
}

async function asociarLineItemADeal(lineItemId, dealId) {
  try {
    // Validación previa opcional
    if (!lineItemId || !dealId) {
      throw new Error("Faltan IDs para asociar line item al deal");
    }

    // Endpoint batch de asociación
    const response = await axios.post(
      "https://api.hubapi.com/crm/v3/associations/line_item/deal/batch/create",
      {
        inputs: [
          {
            from: { id: lineItemId },
            to: { id: dealId },
            type: "line_item_to_deal"
          }
        ]
      },
      { headers }
    );

    console.log("✅ Line item asociado correctamente al deal");
    return response.data;

  } catch (error) {
    console.error("❌ Error al asociar line item al deal:", {
      status: error.response?.status,
      data: error.response?.data,
      dealId,
      lineItemId
    });

    if (error.response?.status === 404) {
      console.error("⚠️ Recurso no encontrado. Verifica los IDs:");
      console.error(`   Deal: ${dealId}, Line Item: ${lineItemId}`);
    }

    throw error;
  }
}

/**
 * Registra una compra en HubSpot:
 * - Busca el contacto por email
 * - Crea el deal (negocio)
 * - Asocia el contacto al deal
 */
export async function registrarCompraEnHubspot(compra) {
  try {
    // 1. Buscar contacto
    const search = await axios.post(
      "https://api.hubapi.com/crm/v3/objects/contacts/search",
      {
        filterGroups: [
          {
            filters: [{ propertyName: "email", operator: "EQ", value: compra.email }],
          },
        ],
        properties: ["email"],
      },
      { headers }
    );

    const contactoId = search.data.results[0]?.id;
    if (!contactoId) throw new Error("Contacto no encontrado");

    // 2. Crear deal
    const deal = await axios.post(
      "https://api.hubapi.com/crm/v3/objects/deals",
      {
        properties: {
          dealname: `Pedido ${compra.codigoredsys}`,
          amount: compra.total,
          dealstage: "appointmentscheduled",
          pipeline: "default",
          closedate: new Date().toISOString(),
          description: `Compra realizada por ${compra.email}`,
          deal_currency_code: "EUR",
        },
      },
      { headers }
    );

    const dealId = deal.data.id;
    console.log("🧾 Deal creado:", dealId);

    // 3. Asociar contacto al deal
    await axios.put(
      `https://api.hubapi.com/crm/v3/objects/deals/${dealId}/associations/contacts/${contactoId}/3`,
      {},
      { headers }
    );

    console.log("🔗 Contacto asociado al deal");

    // 4. Crear y asociar line items
    
    for (const item of compra.carro) {
      console.log("➡️ Enviando line item:", {
        nombre: item.producto.nombre,
        cantidad: item.cantidad,
        precio: parseFloat(item.producto.precio),
        descripcion: item.producto.descripcion,
        hs_product_id: "268652182759"
      });
      const lineItemId = await crearLineItem({
        nombre: item.producto.nombre,
        cantidad: item.cantidad,
        precio: Number(item.producto.precio),
        descripcion: item.producto.descripcion,
        hs_product_id: 268652182759
      });

      await asociarLineItemADeal(lineItemId, dealId);
      console.log(`📦 Producto ${item.producto.nombre} registrado como line item`);
    }
  } catch (error) {
    console.error("❌ Error al registrar en HubSpot:", error.response?.data || error.message);
  }
}




export async function registrarContactoEnHubspot(cliente) {
  try {
    await axios.post(
      "https://api.hubapi.com/crm/v3/objects/contacts",
      {
        properties: {
          email: cliente.email,
          firstname: cliente.nombre || cliente.email.split("@")[0],
        },
      },
      { headers }
    );
    console.log("✅ Contacto creado en HubSpot");
  } catch (error) {
    if (error.response?.status === 409) {
      console.log("ℹ️ El contacto ya existe en HubSpot");
    } else {
      console.error("❌ Error al crear contacto en HubSpot:", error.response?.data || error.message);
    }
  }
}

const interesesRegistrados = new Map(); // email+producto → timestamp

export async function registrarInteresProducto(email, producto) {
  const clave = `${email}-${producto.nombre}`;
  const ahora = Date.now();

  // Si ya se registró en los últimos 5 minutos, ignorar
  if (interesesRegistrados.has(clave) && ahora - interesesRegistrados.get(clave) < 5 * 60 * 1000) {
    console.log("⏱️ Interés ya registrado recientemente, se omite");
    return;
  }

  interesesRegistrados.set(clave, ahora);

  try {
    const search = await axios.post(
      "https://api.hubapi.com/crm/v3/objects/contacts/search",
      {
        filterGroups: [
          {
            filters: [{ propertyName: "email", operator: "EQ", value: email }],
          },
        ],
        properties: ["email"],
      },
      { headers }
    );

    const contactoId = search.data.results[0]?.id;
    if (!contactoId) throw new Error("Contacto no encontrado");

    await axios.post(
      "https://api.hubapi.com/engagements/v1/engagements",
      {
        engagement: { active: true, type: "NOTE" },
        associations: { contactIds: [contactoId] },
        metadata: {
          body: `🛍️ El cliente visualizó el producto: ${producto.nombre} (${producto.categoria})<br>Precio: ${producto.precio}€<br>📝 Descripción:<br>${producto.descripcion}`,
        },
      },
      { headers }
    );

    console.log("📝 Interés registrado en HubSpot");
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}
