const express = require('express');
require('dotenv').config();
//const cors = require('cors');
//const { dbConnection } = require('./database/config');

// Servidor de express
const app = express();

// Banco de dados
//dbConnection();

// CORS
//app.use(cors())

// Diretório Público
app.use( express.static('public') );

// Leitura do body
app.use( express.json() );

// R0tas
app.use('/api/auth', require('./routes/auth') );
//app.use('/api/events', require('./routes/events') );




// Petições
app.listen( process.env.PORT, () => {
    console.log(`Servidor aberto na porta ${ process.env.PORT }`);
});






