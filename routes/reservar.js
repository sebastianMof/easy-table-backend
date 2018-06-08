const express = require('express');
const moment = require('moment');
const router = express.Router();
const models = require('../models');
//----------
let verificarFechaMesa = require('./routes_reserva/verificarFechaMesa');
let crearReserva = require('./routes_reserva/crearReserva');
//let buscarMesa = require('./routes_reserva/buscarMesa');

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

	//falta chequear datos no nulos

/*	if(verificarFechaMesa(fecha1, fecha2, mesa).then(response => res.send(response)).catch(err => res.send(err))){ //Verifica si existe al menos una reserva en esa mesa entre esas fechas, TRUE=No existen;FALSE=Existe al menos una
		crearReserva(fecha1,fecha2,mesa,rut) //Se crea la reserva
			.then( res =>{
				console.log(res);
			})
			.catch( err =>{
				console.log('err : ' + err);
			})
	}*/

	//console.log(buscarMesa(fecha1, fecha2, capacidad));


const Sequelize = require('sequelize');
const Op = Sequelize.Op;	
function buscarMesa(fecha1, fecha2, capacidad) {
   return models.mesa.findAll({
     where: {
        capacidad:{
            [Op.gte]: capacidad
        }
    },
    order:[
    ['capacidad','ASC']
    ]
    });
}

buscarMesa(fecha1,fecha2,capacidad).then(function(result){
   console.log(result[0].numero);
});




	// if(fecha1 && mesa){ //Si la mesa fue especificada
	//  if(verificarFechaMesa(fecha1, fecha2, mesa)){ 
	//    crearReserva(fecha1, fecha2, mesa, rut); //Se procede a reservar
	//  }
	// }else if (fecha1 && capacidad){ //Se necesita buscar una mesa
	//  let mesa = buscarMesa(fecha1, fecha2, capacidad); //Se busca una mesa con esos parametros
	//  if(mesa) crearReserva(fecha1, fecha2, mesa, rut); //Si se encuentra se crea la reserva
	// }


});

module.exports = router;
