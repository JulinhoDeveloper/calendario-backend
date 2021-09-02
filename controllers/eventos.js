const { response } = require('express');
const Evento = require('../models/Evento');

const getEventos = async( req, res = response ) => {

    const eventos = await Evento.find()
                                .populate('user','name');
    res.json({
        ok: true,
        eventos
    });
}

const criarEvento = async ( req, res = response ) => {

    const evento = new Evento( req.body );

    try {

        evento.user = req.uid;
        
        const eventoGuardado = await evento.save();

        res.json({
            ok: true,
            evento: eventoGuardado
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Fale com o administrador'
        });
    }
}

const atualizarEvento = async( req, res = response ) => {
    
    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById( eventoId );

        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Não existe evento nesse id'
            });
        }

        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'Não podes editar esse evento'
            });
        }

        const novoEvento = {
            ...req.body,
            user: uid
        }

        const eventoAtualizado = await Evento.findByIdAndUpdate( eventoId, novoEvento, { new: true } );

        res.json({
            ok: true,
            evento: eventoAtualizado
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Fale com o  administrador'
        });
    }

}

const eliminarEvento = async( req, res = response ) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById( eventoId );

        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento Não existe para esse id'
            });
        }

        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'Não tens permissão para eliminar este evento'
            });
        }


        await Evento.findByIdAndDelete( eventoId );

        res.json({ ok: true });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Fale com o administrador'
        });
    }

}


module.exports = {
    getEventos,
    criarEvento,
    atualizarEvento,
    eliminarEvento
}