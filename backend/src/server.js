const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// rutas
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/media', require('./routes/media.routes'));          
app.use('/api/favorites', require('./routes/favorites.routes'));  

// endpoint de prueba
app.get('/', (req, res) =>
  res.send('Servidor backend funcionando (si hay alguien viendo este gracias)')
);

// iniciar servidor
app.listen(port, () =>
  console.log(`Servidor corriendo en http://localhost:${port}`)
);
