# Proyecto Tienda 
- Descomprimir cliente.rar y servidor.rar en las carpeta cliente y servidor respectivamente.

## Requisitos
- Docker y Docker Compose instalados

## Cómo levantar el proyecto

```bash
docker-compose up --build

• 	Cliente React: http://localhost:3000
• 	Servidor Express: http://localhost:3001
• 	PostgreSQL: puerto 5432


 🗃️ Los datos de los productos han sido generados con la libreria faker usada en el script 'generarDatos.js'.

💳 Simulación de pago Redsys
Este proyecto incluye un endpoint para recibir la respuesta de Redsys tras un pago. En producción, Redsys necesita una URL pública para enviar la confirmación. Para simular esto en local, puedes usar ngrok para exponer tu servidor Express.

🔧 Paso 1: Instalar ngrok
Si no lo tienes instalado:
- npm install -g ngrok

O descarga desde ngrok.com/download.

🌐 Paso 2: Exponer el servidor Express
Ejecuta este comando en una terminal aparte:
- ngrok http 3001

Esto generará una URL pública como:
- https://abcd1234.ngrok-free.app

Habría que cambiar la url de la línea 45 del archivo pago.js dentro de la carpeta routes:
- redsys.setParameter('DS_MERCHANT_MERCHANTURL', "https://d885295c3486.ngrok-free.app/pago/respuesta-pago"); // URL de notificación

esta parte de la url 'https://d885295c3486.ngrok-free.app' por la url que haya generado ngrok.



