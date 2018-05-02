const express = require('express');
const router = express.Router();
const models = require('../models');

//POST-CREATE usuario
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

module.exports = router;