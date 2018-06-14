const express = require('express');
const router = express.Router();
const models = require('../models');
const moment = require('moment');
//----------
let verificarFechaMesa = require('./routes_reserva/verificarFechaMesa');
let crearReserva = require('./routes_reserva/crearReserva');
let buscarMesa = require('./routes_reserva/buscarMesa');

//POST-CREATE reserva 
router.post('/',async(req, res, next)=>{
    
    const anyo1 = req.body['anyo1'];
    const mes1 = req.body['mes1'];
    const dia1 = req.body['dia1'];
    const hora1 = req.body['hora1'];
    const min1 = req.body['min1'];

    const anyo2 = req.body['anyo2'];
    const mes2 = req.body['mes2'];
    const dia2 = req.body['dia2'];
    const hora2 = req.body['hora2'];
    const min2 = req.body['min2'];

    const rut = req.body['rut'];
    const mesa = req.body['mesa'];
    const capacidad = req.body['capacidad'];
 
    let fech1 = moment().set({'y': anyo1, 'M': mes1, 'D': dia1, 'h':hora1, 'm':min1});
    let fech2 = moment().set({'y': anyo2, 'M': mes2, 'D': dia2, 'h':hora2, 'm':min2});

    var diff = fech2.diff(fech1,'hours');//habrá máximo de 6 horas de reserva

    let fecha1 = fech1.toDate();
    let fecha2 = fech2.toDate();

    if(fecha1 && fecha2 && rut && (mesa || capacidad) &&(diff <=6)){


        var temp = false;
        if(mesa){
        temp = await verificarFechaMesa(fecha1, fecha2, mesa);
        }
        
        if(temp){ //True si no hay reservas en mesa entre fechas
            crearReserva(fecha1,fecha2,mesa,rut) //Se crea la reserva
                .then( reserva =>{
                    res.send(reserva);
                    console.log(reserva);
                })
                .catch( err =>{
                    console.log('err : ' + err);
                })
        }else{
            try {
                let mesas = await buscarMesa(fecha1,fecha2,capacidad)//se buscan una o mas mesas con la capacidad dada y ordenadas
                if(mesas !== false){//se verifican todas las mesas disponibles en orden hasta encontrar la primera que sirva
                    temp = false;
                    for (var i = 0; i < mesas.length; i++) {
                        temp = await verificarFechaMesa(fecha1, fecha2, mesas[i].numero);
                        if(temp === true){//se encuentra la primera mesa disponible en el horario
                            crearReserva(fecha1,fecha2,mesas[i].numero,rut) //Se crea la reserva
                                .then( reserva =>{
                                    res.send(reserva);
                                })
                                .catch( err =>{
                                    console.log('err : ' + err);
                                })
                            break;
                        }
                    } 
                    if(temp === false) {
                        res.status(400).json({
                            status: 0,
                            statusCode: 'reserva/error',
                            description: "No se creo la reserva"
                        });
                    }
                }   
            } catch(e) {
                console.log(e)
            }
                       
        }
    
    }else {
        res.status(400).json({
            status: 0,
            statusCode: 'reserva/error-body',
            description: 'Error en el body o reserva mayor a 6 horas'
        });
    }
});

//GET-READ consulta todas las reservas
router.get('/', async(req, res, next) => { //el display de cada fecha hay que pasarla a momentjs
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
                    statusCode: 'reserva/no-encontradas',
                    description: 'No hay informacion de reservas'
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
router.get('/activas', async(req, res, next) => { //el display de cada fecha hay que pasarla a momentjs
        models.reserva.findAll({
            where: {
                estado: true
            }
        }).then(reserva => {
            if (reserva) {
                res.json({
                    status: 1,
                    statusCode: 'reserva/listado',
                    data: reserva
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'reserva/no-encontrada',
                    description: 'No hay información de reservas'
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

//PUT-UPDATE libera la mesa, es decir estado de la reserva igual a cero(false)-(si es administrador)
router.patch('/libera/', async (req, res, next) => {
    
    const rut = req.body['rut'];
    const password = req.body['password'];
    const id = req.body['id']; //id de reserva

    if (rut && password && id) {
        models.usuario.findOne({
            where: {
                rut: rut,
                password: password,
                tipo_usuario: 'Admin'
            }
        }).then(usuario => {
            if (usuario) {
                models.reserva.findOne({
                    where:{
                        id:id
                    }

                }).then(reserva => {

                    reserva.updateAttributes({
                        estado:false
                    });
                    res.json({
                        status: 1,
                        statusCode: 'reserva/liberada',
                        data: reserva.toJSON()
                    });
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
                    description: 'No se encontro usuario con datos'
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
            description: 'Error al ingresar rut, contraseña o id de mesa'
        });
    }
});

//DELETE-DELETE Borra reserva por id(si es administrador)
router.delete('/delete/', async(req, res, next) => {
    
    const rut = req.body['rut'];
    const password = req.body['password'];
    const id = req.body['id'];

    if (rut && password && id) {
        models.usuario.findOne({
            where: {
                rut: rut,
                password: password,
                tipo_usuario: 'Admin'
            }
        }).then(usuario => {
            if (usuario) {
                models.reserva.destroy({
                    where:{
                        id:id
                    }
                }).then(reserva => {
                    res.json({
                        status: 1,
                        statusCode: 'reserva/eliminada',
                    });
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
                    description: 'No se encontro usuario con datos'
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
            description: 'Error al ingresar rut, contraseña o id de mesa'
        });
    }
});


module.exports = router;