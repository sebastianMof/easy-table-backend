const express = require('express');
const router = express.Router();
const models = require('../models');

//POST-CREATE reserva
router.post('/', async (req, res, next) => {
    const fecha_inicio_reserva = req.body['fecha_inicio_reserva'];
    const fecha_fin_reserva = req.body['fecha_fin_reserva'];
    const estado = req.body['estado'];
    const mesaNumero = req.body['mesaNumero'];
    const usuarioRut = req.body['usuarioRut'];

    if (fecha_inicio_reserva && fecha_fin_reserva && estado && mesaNumero && usuarioRut) {
        models.reserva.create({
            fecha_inicio_reserva: fecha_inicio_reserva,
            fecha_fin_reserva: fecha_fin_reserva,
            estado: estado,
            mesaNumero: mesaNumero,
            usuarioRut: usuarioRut
        }).then(reserva => {
            if (reserva) {
                res.json({
                    status: 1,
                    statusCode: 'reserva/created',
                    data: reserva.toJSON()
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'reserva/error',
                    description: "Couldn't create the reserva"
                });
            }
        }).catch(error => {
            res.status(400).json({
                status: 0,
                statusCode: 'database/error',
                description: error.toString()
            });
        });
    } else {
        res.status(400).json({
            status: 0,
            statusCode: 'reserva/wrong-body',
            description: 'The body is wrong! :('
        });
    }
});

module.exports = router;