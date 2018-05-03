const express = require('express');
const router = express.Router();
const models = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
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

//GET-READ consulta todas las mesas
router.get('/', async(req, res, next) => {
    models.mesa
        .findAll()
        .then(mesas => {
            if (mesas) {
                res.json({
                    status: 1,
                    statusCode: 'mesa/listing',
                    data: mesas
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'mesa/not-found',
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

//GET-READ busca la mesas con capacidad igual o mayor a la pedida y se obtiene la con menos diferencia
router.get('/capacidad/:capacidad', async(req, res, next) => {  
    const capacidad = req.params.capacidad;
    if (capacidad) {
        models.mesa.findOne({
            where: {
                capacidad:{
                    [Op.gte]: capacidad
                }
            },
            order:[
            ['capacidad','ASC']
            ]
        }).then(mesas => {
            if (mesas) {
                res.json({
                    status: 1,
                    statusCode: 'mesa/found',
                    data: mesas.toJSON()
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'capacidad-mesa/not-found',
                    description: 'The capacidad-mesa not found '
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
            statusCode: 'mesa/wrong-capacidad',
            description: 'Check the capacidad!'
        });
    }
});

//GET-READ mesa con numero de mesa(para saber capacidad)
router.get('/numero/:numero', async (req, res, next) => {
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

//DELETE-DELETE por numero de mesa
router.delete('/delete/:numero', async(req, res, next) => {
    const numero = req.params.numero;
    if (numero) {
        models.mesa.destroy({
            where: {
                numero: numero
            }
        }).then(mesa => {
            if (mesa) {
                res.json({
                    status: 1,
                    statusCode: 'user deleted',
                    //data: mesa.toJSON()
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'user no borrado',
                    description: 'The user was not found with the numero'
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
            statusCode: 'user/wrong-numero',
            description: 'Check the numero!'
        });
    }
});


module.exports = router;