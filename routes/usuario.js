const express = require('express');
const router = express.Router();
const models = require('../models');

//POST-CREATE crea un usuario, asume que llegan datos validados
router.post('/', async (req, res, next) => {
    const rut = req.body['rut'];
    const tipo_usuario = req.body['tipo_usuario'];
    const password = req.body['password'];
    const nombre = req.body['nombre'];
    const apellido = req.body['apellido'];
    const email = req.body['email'];

    if (rut && tipo_usuario && nombre && apellido && email) {
        models.usuario.create({
            rut: rut,
            tipo_usuario: tipo_usuario,
            password: password,
            nombre: nombre,
            apellido: apellido,
            email: email
        }).then(usuario => {
            if (usuario) {
                res.json({
                    status: 1,
                    statusCode: 'usuario/creado',
                    data: usuario.toJSON()
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'usuario/error',
                    description: "No se pudo crear el usuario"
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
            statusCode: 'usuario/error-body',
            description: 'Error en el body'
        });
    }
});

//GET-READ consulta todos los usuarios
router.get('/', async(req, res, next) => {
    models.usuario.findAll().then(users => {
        if (users) {
            res.json({
                status: 1,
                statusCode: 'usuario/listado',
                data: users
                });
        } else {
            res.status(400).json({
                status: 0,
                statusCode: 'usuario/no-encontrado',
                description: 'No hay información de usuario'
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
router.get('/consulta/', async(req, res, next) => {
    const rut = req.query.rut;

    if (rut) {
        models.usuario.findOne({
            where: {
                rut: rut
            }
        }).then(usuario => {
            if (usuario) {
                res.json({
                    status: 1,
                    statusCode: 'usuario/encontrado',
                    data: usuario.toJSON()
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'usuario/no-encontrado',
                    description: 'No se encontró usuario con rut'
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
            statusCode: 'usuario/error-rut',
            description: 'Error al ingresar rut'
        });
    }
});

//GET-READ consulta tipo de usuario por rut
router.get('/tipo/', async(req, res, next) => {
    const rut = req.query.rut;
    if (rut) {
        models.usuario.findOne({
            where: {
                rut: rut
            }
        }).then(usuario => {
            if (usuario) {
                res.json({
                    status: 1,
                    statusCode: 'usuario/encontrado',
                    data: usuario.tipo_usuario
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'usuario/no-encontrado',
                    description: 'No se encontró usuario con rut'
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
            statusCode: 'user/error-rut',
            description: 'Error al ingresar el rut'
        });
    }
});

//GET-READ exito login por credenciales(rut y pass)
router.get('/login/', async(req, res, next) => {
    const rut = req.query.rut;
    const password = req.query.password;
    if (rut && password) {
        models.usuario.findOne({
            where: {
                rut: rut,
                password: password
            }
        }).then(usuario => {
            if (usuario) {
                res.json({
                    status: 1,
                    statusCode: 'login/encontrado',
                    data: usuario.toJSON()
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'login/no-encontrado',
                    description: 'Revisar rut y contraseña'
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
            statusCode: 'usuario/error-credenciales',
            description: 'Revisar rut y contraseña'
        });
    }
});

//DELETE
router.delete('/delete/', async(req, res, next) => {

    const rut = req.body['rut'];
    const password = req.body['password'];

    if (rut && password) {
        models.usuario.destroy({
            where: {
                rut: rut,
                password: password
            }
        }).then(usuario => {
            if (usuario) {
                res.json({
                    status: 1,
                    statusCode: 'Usuario borrado',
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'usuario no borrado',
                    description: 'Usuaro no encontrado con credenciales'
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
            statusCode: 'credenciales/error',
            description: 'Error al ingresar rut y/o contraseña'
        });
    }
});

module.exports = router;