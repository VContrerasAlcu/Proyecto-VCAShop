import {
  Box,
  Typography,
  Divider,
  Grid,
  Avatar,
  Paper,
  Link as MuiLink
} from "@mui/material";

/**
 * Componente Conocenos
 * Presenta información institucional y personal del proyecto.
 */
const Conocenos = () => (
  <Box sx={{ p: 4, maxWidth: 1000, mx: "auto" }}>
    
    {/* Misión y visión */}
    <Typography variant="h3" gutterBottom fontWeight="bold">
      Conócenos
    </Typography>
    <Typography variant="body1" sx={{ mb: 3 }}>
      Somos una empresa ficticia creada como parte de un proyecto de fin de grado.
      El objetivo es simular una experiencia de compra moderna, intuitiva y funcional,
      fusionando diseño visual y tecnología de vanguardia.
    </Typography>

    <Divider sx={{ my: 4 }} />

    {/*  Autor del proyecto */}
    <Typography variant="h5" gutterBottom fontWeight="bold">
      Quien está detrás
    </Typography>
    <Box sx={{ textAlign: "center", mb: 4 }}>
      <Avatar
        src="/images/vicente.jpg" 
        alt="Vicente Contreras Alcuña"
        sx={{ width: 120, height: 120, mx: "auto", mb: 1 }}
      />
      <Typography variant="subtitle1" fontWeight="bold">
        Vicente Contreras Alcuña
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        Desarrollador y autor del proyecto
      </Typography>
      <Typography variant="body2" sx={{ maxWidth: 600, mx: "auto" }}>
        Este proyecto ha sido desarrollado por mí como trabajo de fin de grado.
        Todo — desde la interfaz hasta la lógica interna — ha sido diseñado con cariño,
        cuidado técnico y un toque personal. ¡Gracias por visitarlo!
      </Typography>
    </Box>

    <Divider sx={{ my: 4 }} />

    {/* 🗣️ Testimonios simulados */}
    <Typography variant="h5" gutterBottom fontWeight="bold">
      Lo que dicen nuestros usuarios
    </Typography>
    <Grid container spacing={2}>
      {[
        "“La mejor experiencia de compra online que he simulado nunca.”",
        "“Un proyecto impecable, ¡parece una tienda real!”",
        "“Me encantó cómo funciona el sistema en tiempo real.”"
      ].map((texto, i) => (
        <Grid item xs={12} sm={4} key={i}>
          <Paper sx={{ p: 2, minHeight: 120 }}>
            <Typography variant="body2" sx={{ fontStyle: "italic" }}>
              {texto}
            </Typography>
            <Typography variant="caption" display="block" sx={{ mt: 1, textAlign: "right" }}>
              – Cliente Simulado #{i + 1}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>

    <Divider sx={{ my: 4 }} />

    {/* 📍 Ubicación ficticia */}
    <Typography variant="h5" gutterBottom fontWeight="bold">
      Ubicación
    </Typography>
    <Typography variant="body2" sx={{ mb: 2 }}>
      Calle Concepción, 1, Huelva, España
    </Typography>
    <iframe
      title="Ubicación ficticia"
      src="https://www.google.com/maps?q=Calle+Concepción,+1,+Huelva&output=embed"
      width="100%"
      height="300"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
    />

    <Divider sx={{ my: 4 }} />

    {/* ☎️ Información de contacto */}
    <Typography variant="h5" gutterBottom fontWeight="bold">
      Contáctanos
    </Typography>
    <Typography variant="body2" sx={{ mb: 1 }}>
      📧 Correo: vcontrerasalcu@gmail.com
    </Typography>
    <Typography variant="body2" sx={{ mb: 1 }}>
      ☎️ Teléfono: +34 600 .....
    </Typography>
    <Typography variant="body2">
      🌐 Web:{" "}
      <MuiLink
        href="https://tu-tienda-ficticia.com"
        target="_blank"
        rel="noopener"
      >
        tu-tienda-ficticia.com
      </MuiLink>
    </Typography>
  </Box>
);

export default Conocenos;