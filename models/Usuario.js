const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    name: {
        type: String,
        
    },
    email: {
        type: String,
       
        unique: true
    },
    password: {
        type: String,
        
    }
});


module.exports = model('Usuario', UsuarioSchema );

