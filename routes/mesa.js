const express = require('express');
const router = express.Router();
const models = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


//POST-CREATE mesa con credenciales de Admin
router.post('/', async (req, res, next) => {
    const numero = req.body['numero'];
    const capacidad = req.body['capacidad'];
    const rut = req.body['rut'];
    const password = req.body['password'];

    if (numero && capacidad && rut && password) {
        models.usuario.findOne({
            where:{
                rut: rut,
                password: password,
                tipo_usuario: 'Admin'
            }
        }).then(usuario => {
            if(usuario){
                models.mesa.create({
                    numero: numero,
                    capacidad: capacidad
                }).then(mesa => {
                    if (mesa) {
                        res.json({
                            status: 1,
                            statusCode: 'mesa/creada',
                            data: mesa.toJSON()
                        });
                    } else {
                        res.status(400).json({
                            status: 0,
                            statusCode: 'mesa/error',
                            description: "No se creó la mesa"
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
                    statusCode: 'usuario/no-encontrado',
                    description: 'No se encontró usuario con credenciales o no es un administrador'
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
            statusCode: 'mesa/error-body',
            description: 'Error en el body'
        });
    }
});

//GET-READ consulta todas las mesas existentes en el local
router.get('/', async(req, res, next) => {
    models.mesa
        .findAll()
        .then(mesas => {
            if (mesas) {
                res.json({
                    status: 1,
                    statusCode: 'mesa/listado',
                    data: mesas
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'mesa/no-encontrada',
                    description: 'No hay información de mesas'
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

//GET-READ busca la mesas con capacidad igual o mayor a la pedida y se obtiene la con menos diferencia, es decir, la mesa más adecuada según la capacidad.
router.get('/adecuada/', async(req, res, next) => {  
    const capacidad = req.query.capacidad;
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
                    statusCode: 'mesa/encontrada',
                    data: mesas.toJSON()
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'mesa/no-encontrada',
                    description: 'No se encontró mesa con esa capacidad'
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
            statusCode: 'mesa/error-capacidad',
            description: 'Error al ingresar capacidad'
        });
    }
});

//GET-READ retorna la mesa con el numero de mesa pedido
router.get('/capacidad/', async (req, res, next) => {
    const numero = req.query.numero;
    if (numero) {
        models.mesa.findOne({
            where: {
                numero: numero
            }
        }).then(mesa => {
            if (mesa) {
                res.json({
                    status: 1,
                    statusCode: 'mesa/encontrada',
                    data: mesa.toJSON()
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'mesa/no-encontrada',
                    description: "No se encontró la mesa"
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
            statusCode: 'mesa/error-parametros',
            description: 'Los parámetros son érroneos'
        });
    }
});

//DELETE-DELETE por numero de mesa(por administrador)
router.delete('/delete/', async(req, res, next) => {
    const numero = req.body['numero'];
    const rut = req.body['rut'];
    const password = req.body['password'];

    if (numero && rut && password) {
        models.usuario.findOne({
            where:{
                rut: rut,
                password: password,
                tipo_usuario: 'Admin'
            }
        }).then(usuario => {
            if(usuario){
                models.mesa.destroy({
                    where:{
                        numero: numero
                    }
                }).then(mesa => {
                    if (mesa) {
                        res.json({
                            status: 1,
                            statusCode: 'mesa/eliminada',
                        });
                    } else {
                        res.status(400).json({
                            status: 0,
                            statusCode: 'mesa/error',
                            description: "No se pudo eliminar la mesa"
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
                    statusCode: 'usuario/no-encontrado',
                    description: 'No se encontró usuario con credenciales o no es un administrador'
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
            statusCode: 'mesa/error-body',
            description: 'Error en el body'
        });
    }
});

module.exports = router;