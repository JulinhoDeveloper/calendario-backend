const express = require('express');
const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');


router.post(
    '/new', 
    [ // middlewares
        check('name', 'O nome é ogrigatório').not().isEmpty(),
        check('email', 'O email é obrigatório').isEmail(),
        check('password', 'A senha deve ter 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario 
);

router.post(
    '/',
    [
        check('email', 'O email é obrigatório').isEmail(),
        check('password', 'A senha deve ter 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario 
);

router.post('/renew', revalidarToken );

module.exports = router;