const express = require('express');
const router = express.Router();
const models = require('../models');


//POST-CREATE reserva sin validaciones
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

//GET-READ consulta todas las reservas
router.get('/', async(req, res, next) => {
    models.reserva
        .findAll()
        .then(reserva => {
            if (reserva) {
                res.json({
                    status: 1,
                    statusCode: 'reserva/listing',
                    data: reserva
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'reserva/not-found',
                    description: 'There\'s no user information!'
                });
            }
        }).catch(error => {
        res.status(400).json({
            status: 0,
            statusCode: 'database/error',
            description: error.toString()
        });
    });
});

//GET-READ consulta todas las reservas activas
router.get('/activas', async(req, res, next) => {
        models.reserva.findAll({
            where: {
                estado: true
            }
        }).then(reserva => {
            if (reserva) {
                res.json({
                    status: 1,
                    statusCode: 'reserva/listing',
                    data: reserva
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'reserva/not-found',
                    description: 'There\'s no user information!'
                });
            }
        }).catch(error => {
        res.status(400).json({
            status: 0,
            statusCode: 'database/error',
            description: error.toString()
        });
    });
});

//PUT-UPDATE libera la mesa, es decir estado de la reserva igual a cero(false)
router.patch('/libera/:mesaNumero', async (req, res, next) => {
    const fecha_inicio_reserva = req.body['fecha_inicio_reserva'];
    const usuarioRut = req.body['usuarioRut'];
    const mesaNumero = req.params.mesaNumero;

    if (mesaNumero && usuarioRut && fecha_inicio_reserva) {
        models.reserva.findOne({
            where: {
                mesaNumero: mesaNumero,
               fecha_inicio_reserva: fecha_inicio_reserva,
                usuarioRut : usuarioRut
            }
        }).then(reserva => {
            if (reserva) {
                reserva.updateAttributes({
                    estado:false
                });
                res.json({
                    status: 1,
                    statusCode: 'reserva/found',
                    data: reserva.toJSON()
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'reserva/not-found',
                    description: 'The reserva was not found with the numero'
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
            statusCode: 'reserva/wrong-atts',
            description: 'Check the atribs!'
        });
    }
});

//DELETE-DELETE por id de reserva
router.delete('/delete/:id', async(req, res, next) => {
    const id = req.params.id;
    if (id) {
        models.reserva.destroy({
            where: {
                id: id
            }
        }).then(reserva => {
            if (reserva) {
                res.json({
                    status: 1,
                    statusCode: 'reserva deleted',
                    //data: reserva.toJSON()
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'reserva no borrado',
                    description: 'The reserva was not found with the numero'
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
            statusCode: 'user/wrong-id',
            description: 'Check the id!'
        });
    }
});


module.exports = router;