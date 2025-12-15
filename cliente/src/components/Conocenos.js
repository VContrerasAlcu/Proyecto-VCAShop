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
    
    {/* Fondo azul claro para el primer texto */}
    <Paper 
      elevation={0}
      sx={{ 
        p: 3, 
        mb: 3,
        backgroundColor: '#E3F2FD', // Azul muy claro
        borderRadius: 2,
        borderLeft: '4px solid #1976D2' // Borde azul para destacar
      }}
    >
      <Typography variant="body1">
        Somos una empresa ficticia creada como parte de un proyecto de fin de grado.
        El objetivo es simular una experiencia de compra moderna, intuitiva y funcional,
        fusionando diseño visual y tecnología de vanguardia.
      </Typography>
    </Paper>

    <Divider sx={{ my: 4 }} />

    {/*  Autor del proyecto */}
    <Typography variant="h5" gutterBottom fontWeight="bold">
      Quien está detrás
    </Typography>
    <Box sx={{ textAlign: "center", mb: 4 }}>
      <Avatar
        src="/vicente.jpg" 
        alt="Vicente Contreras Alcuña"
        sx={{ width: 120, height: 120, mx: "auto", mb: 2 }}
      />
      <Typography variant="subtitle1" fontWeight="bold">
        Vicente Contreras Alcuña
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Desarrollador y autor del proyecto
      </Typography>
      
      {/* Fondo azul claro para el segundo texto */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 3, 
          maxWidth: 600, 
          mx: "auto",
          backgroundColor: '#E8F5E9', // Verde azulado muy claro
          borderRadius: 2,
          borderLeft: '4px solid #388E3C' // Borde verde para diferenciar
        }}
      >
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          Este proyecto ha sido desarrollado por mí como trabajo de fin de grado.
          Todo — desde la interfaz hasta la lógica interna — ha sido diseñado con cariño,
          cuidado técnico y un toque personal. ¡Gracias por visitarlo!
        </Typography>
      </Paper>
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
          <Paper 
            sx={{ 
              p: 2, 
              minHeight: 120,
              backgroundColor: i === 0 ? '#F3E5F5' :  // Lila claro
                            i === 1 ? '#FFF3E0' :  // Naranja claro
                            '#E0F7FA',            // Cian claro
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 3
              }
            }}
          >
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
    <Paper 
      sx={{ 
        p: 2, 
        mb: 2,
        backgroundColor: '#FFF9C4', // Amarillo muy claro
        borderRadius: 1
      }}
    >
      <Typography variant="body2">
        Calle Concepción, 1, Huelva, España
      </Typography>
    </Paper>
    <Box sx={{ borderRadius: 1, overflow: 'hidden', boxShadow: 1 }}>
      <iframe
        title="Ubicación ficticia"
        src="https://www.google.com/maps?q=Calle+Concepción,+1,+Huelva&output=embed"
        width="100%"
        height="300"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
      />
    </Box>

    <Divider sx={{ my: 4 }} />

    {/* ☎️ Información de contacto */}
    <Typography variant="h5" gutterBottom fontWeight="bold">
      Contáctanos
    </Typography>
    <Paper 
      sx={{ 
        p: 3,
        backgroundColor: '#F5F5F5', // Gris muy claro
        borderRadius: 2
      }}
    >
      <Typography variant="body2" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
        <Box component="span" sx={{ mr: 1 }}>📧</Box> 
        Correo: vcontrerasalcu@gmail.com
      </Typography>
      <Typography variant="body2" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
        <Box component="span" sx={{ mr: 1 }}>☎️</Box> 
        Teléfono: +34 600 .....
      </Typography>
      <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
        <Box component="span" sx={{ mr: 1 }}>🌐</Box> 
        Web:{" "}
        <MuiLink
          href="https://vcontreras.es"
          target="_blank"
          rel="noopener"
          sx={{ ml: 0.5 }}
        >
          https://vcontreras.es
        </MuiLink>
      </Typography>
    </Paper>
  </Box>
);

export default Conocenos;