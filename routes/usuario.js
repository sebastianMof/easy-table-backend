const express = require('express');
const router = express.Router();
const models = require('../models');

//POST-CREATE crea un usuario, asume que llegan datos validados
router.post('/', async (req, res, next) => {
    const rut = req.body['rut'];
    const tipo_usuario = req.body['tipo_usuario'];
    const nombre = req.body['nombre'];
    const apellido = req.body['apellido'];
    const email = req.body['email'];

    if (rut && tipo_usuario && nombre && apellido && email) {
        models.usuario.create({
            rut: rut,
            tipo_usuario: tipo_usuario,
            nombre: nombre,
            apellido: apellido,
            email: email
        }).then(usuario => {
            if (usuario) {
                res.json({
                    status: 1,
                    statusCode: 'usuario/created',
                    data: usuario.toJSON()
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'usuario/error',
                    description: "Couldn't create the usuario"
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
            statusCode: 'usuario/wrong-body',
            description: 'The body is wrong! :('
        });
    }
});

//GET-READ consulta todos los usuarios
router.get('/', async(req, res, next) => {
    models.usuario
        .findAll()
        .then(users => {
            if (users) {
                res.json({
                    status: 1,
                    statusCode: 'users/listing',
                    data: users
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'users/not-found',
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

//GET-READ consulta usuario por rut
router.get('/rut/:rut', async(req, res, next) => {
    const rut = req.params.rut;
    if (rut) {
        models.usuario.findOne({
            where: {
                rut: rut
            }
        }).then(usuario => {
            if (usuario) {
                res.json({
                    status: 1,
                    statusCode: 'user/found',
                    data: usuario.toJSON()
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'user/not-found',
                    description: 'The user was not found with the rut'
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
            statusCode: 'user/wrong-rut',
            description: 'Check the rut!'
        });
    }
});

//GET-READ consulta tipo de usuario
router.get('/tipo/:rut', async(req, res, next) => {
    const rut = req.params.rut;
    if (rut) {
        models.usuario.findOne({
            where: {
                rut: rut
            }
        }).then(usuario => {
            if (usuario) {
                res.json({
                    status: 1,
                    statusCode: 'user/found',
                    data: usuario.tipo_usuario
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'user/not-found',
                    description: 'The user was not found with the rut'
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
            statusCode: 'user/wrong-rut',
            description: 'Check the rut!'
        });
    }
});

//DELETE-DELETE inseguro por rut
router.delete('/delete/:rut', async(req, res, next) => {
    const rut = req.params.rut;
    if (rut) {
        models.usuario.destroy({
            where: {
                rut: rut
            }
        }).then(usuario => {
            if (usuario) {
                res.json({
                    status: 1,
                    statusCode: 'user deleted',
                    //data: usuario.toJSON()
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'user no borrado',
                    description: 'The user was not found with the rut'
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
            statusCode: 'user/wrong-rut',
            description: 'Check the rut!'
        });
    }
});

module.exports = router;