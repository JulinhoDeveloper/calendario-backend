/*
    Evento Routes
    /api/eventos
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, criarEvento, atualizarEvento, eliminarEvento } = require('../controllers/eventos');

const router = Router();

// Validação JWT para acessar eventos
router.use( validarJWT );


// Obter eventos 
router.get('/', getEventos );

// Criar  novo evento
router.post(
    '/',
    [
        check('title','O título é obrigatorio').not().isEmpty(),
        check('start','A data de início é obrigatória').custom( isDate ),
        check('end','A data de fechamento é obrigatória').custom( isDate ),
        validarCampos
    ],
    criarEvento 
);

// Atualizar Evento
router.put(
    '/:id', 
    [
        check('title','O título é obrigatorio').not().isEmpty(),
        check('start','A data de início é obrigatória').custom( isDate ),
        check('end','A data de fechamento é obrigatória').custom( isDate ),
        validarCampos
    ],
    atualizarEvento 
);

// excluir evento
router.delete('/:id', eliminarEvento );

module.exports = router;