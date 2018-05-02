const express = require('express');
const router = express.Router();
const models = require('../models');
//--------


//POST-CREATE mesa
router.post('/', async (req, res, next) => {
    const numero = req.body['numero'];
    const capacidad = req.body['capacidad'];
    if (numero && capacidad) {
        models.mesa.create({
            numero: numero,
            capacidad: capacidad
        }).then(mesa => {
            if (mesa) {
                res.json({
                    status: 1,
                    statusCode: 'mesa/created',
                    data: mesa.toJSON()
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'mesa/error',
                    description: "Couldn't create the mesa"
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
            statusCode: 'mesa/wrong-body',
            description: 'The body is wrong! :('
        });
    }
});

//GET-READ mesa
router.get('/:numero', async (req, res, next) => {
    const numero = req.params.numero;
    if (numero) {
        models.mesa.findOne({
            where: {
                numero: numero
            }
        }).then(mesa => {
            if (mesa) {
                res.json({
                    status: 1,
                    statusCode: 'mesa/found',
                    data: mesa.toJSON()
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'mesa/not-found',
                    description: "Couldn't find the mesa"
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
            statusCode: 'mesa/wrong-parameter',
            description: 'The parameters are wrong! :('
        });
    }
});


//------

module.exports = router;