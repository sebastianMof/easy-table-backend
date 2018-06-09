const express = require('express');
const moment = require('moment');
const router = express.Router();
const models = require('../models');
//----------
let verificarFechaMesa = require('./routes_reserva/verificarFechaMesa');
let crearReserva = require('./routes_reserva/crearReserva');
let buscarMesa = require('./routes_reserva/buscarMesa');

router.post('/',async(req, res, next)=>{
	const dia = req.body['dia'];
	const mes = req.body['mes'];
	const anyo = req.body['anyo'];
	const hora = req.body['hora'];
	const min = req.body['min'];
	const rut = req.body['rut'];
	const mesa = req.body['mesa'];
	const capacidad = req.body['capacidad'];
 
	let fecha1 = new Date(parseInt(anyo), parseInt(mes), parseInt(dia), parseInt(hora), parseInt(min));
	let fecha2 = new Date(parseInt(anyo), parseInt(mes), parseInt(dia), parseInt(hora)+3, parseInt(min));// +3 para testing, puede tener cualquier duracion

    var temp = false;
    temp = await verificarFechaMesa(fecha1, fecha2, mesa);

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
        buscarMesa(fecha1,fecha2,capacidad)//se buscan una o mas mesas con la capacidad dada y ordenadas
                .then(async(mesas) => {
                    if(mesas){//se verifican todas las mesas disponibles en orden hasta encontrar la primera que sirva
                        temp = false;
                        for (var i = 0; i <= mesas.length; i++) {
                            
                            temp = await verificarFechaMesa(fecha1, fecha2, mesas[i].numero);
                            if(temp){//se encuentra la primera mesa disponible en el horario
                                console.log('testing');
                                crearReserva(fecha1,fecha2,mesas[i].numero,rut) //Se crea la reserva
                                    .then( reserva =>{
                                        res.send(reserva);
                                        console.log(reserva);
                                    })
                                    .catch( err =>{
                                        console.log('err : ' + err);
                                    })
                            }
                        }
                        console.log('testing');
                        console.log(temp);
                        if(temp==false){
                            //todas las mesas con esa capacidad o mas estas ocupadas en ese horario                            
                            res.status(400).json({
                            status: 0,
                            statusCode: 'reservar/error',
                            description: "todas las mesas con esa capacidad o mas estas ocupadas en ese horario"
                            });
                        }
                    }else{//no hay mesas con esa capacidad
                        res.status(400).json({
                        status: 0,
                        statusCode: 'reservar/error',
                        description: "no hay mesas con esa capacidad"
                        });
                    }       
                }).catch(err => res.send(err));
    }
});

module.exports = router;