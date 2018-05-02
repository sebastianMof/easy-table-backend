const express = require('express');
const router = express.Router();
const models = require('../models');

/*
//CREAR RESERVA CON CAPACIDAD O CON MESA EN ESPECIFICO
router.post('/', async (req, res, next) => {
    const dia_reserva = req.body['dia']; //Esto recibe la primera fecha
    const mes_reserva = req.body['mes']; 
    const anyo_reserva = req.body['anyo'];
    const hora_reserva = req.body['hora'];
    const minuto_reserva = req.body['minuto'];
    const capacidad = req.body['capacidad'];
    const mesa = req.body['mesa'];
    const rut = req.body['rut'];
    const fecha1= ;

    if(dia_reserva && mes_reserva && anyo_reserva && hora_reserva && minuto_reserva){
        fecha1 = new Date('anyo_reserva', 'mes_reserva', 'dia_reserva', 'hora_reserva', 'minuto_reserva'); //Se crea formato fecha
        var fecha2 = new Date('anyo_reserva', 'mes_reserva', 'dia_reserva', 'hora_reserva+3', 'minuto_reserva'); //Se crea fecha fin
    }

    if (fecha1 && mesa){
        var reservas_fecha = Reserva.findAll({ 
          where: {
            fecha_reserva:{
                [Op.between]: [f1,f2]
            }
            estado: true
            mesaNumero: 'mesa'
          } //Esta tiene todas las reservas entre esas fechas en esa mesa
          if (!reservas_fecha){ //Si no hay reservas en esa fecha, se puede crear
            models.reserva.create({
                fecha_inicio_reserva: fecha1,
                fecha_fin_reserva: fecha2,
                estado: true,
                mesaNumero: mesa,
                usuarioRut: rut
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
          }
    } else if (fecha1 && capacidad){ //Si no se especifica una mesa hay que buscar las mesas que sirven disponibles
        var mesas_con_capacidad = Mesa.findAll({ 
          where: {
            capacidad:{
                [Op.gte]: 'capacidad',
            }
          }
        }); //Esto busca las mesas que sirven según la capacidad pedida
        var id_mesas;
        for (var i in mesas_con_capacidad){
            id_mesas.append(i.numero);
        }
        var mesas_no_disponibles; //Esto registrará las mesas que sirven pero que están ocupadas
        var reservas_fecha = Reserva.findAll({ 
          where: {
            fecha_reserva:{
                [Op.between]: [f1,f2]
            }
            estado: true //Para filtrar las reservas anuladas, esas no se consideran
          }
        });
        if (reservas_fecha.length == 0){ //Si no hay ninguna reserva
            const mesa = id_mesas[0]; //Se elige como mesa la primera disponible de las que sirven
            models.reserva.create({ //Se crea con los mismos datos y mesa = primera mesa disponible
            fecha_inicio_reserva: fecha1,
            fecha_fin_reserva: fecha2,
            estado: true,
            mesaNumero: mesa,
            usuarioRut: rut
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
        } else{ //Si existen reservas, se buscan las mesas no disponibles
            for (var i in reservas_fecha){ //Se recorren todas las reservas en esa fecha
                for (var j in id_mesas){
                    if (i.mesaNumero == j){
                        mesas_no_disponibles.append(i.mesaNumero); //Se añade la mesa a las no disponibles
                    }
                }
            }
            //Ahora se conocen las mesas no disponibles en esa hora, así que hay que registrar cualquiera disponible
            var ctd_id_mesas = id_mesas.length;
            var contador = 1;
            var mesa;
            for (var i in id_mesas){
                for (var j in mesas_no_disponibles){
                    if (j!=id){
                        contador = contador + 1;
                        if(contador == ctd_id_mesas){
                            mesa = i; //Se obtiene una mesa que sirve y que no está ocupada en esa fecha
                        }
                    }else{
                        contador = 0;
                    }
                }
            }
            models.reserva.create({ //Se crea la reserva con la mesa obtenida
            fecha_inicio_reserva: fecha1,
            fecha_fin_reserva: fecha2,
            estado: true,
            mesaNumero: mesa,
            usuarioRut: rut
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
        }

    }

});
*/

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

//
//GET-READ consulta todos los usuarios
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




module.exports = router;