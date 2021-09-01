const express = require('express');
const {Router} = require('express');
const router = Router();

const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');


router.post('/new', crearUsuario );

router.post('/', loginUsuario );

router.post('/renew', revalidarToken );

module.exports = router;