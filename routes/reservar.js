const express = require('express');
const router = express.Router();
const models = require('../models');
let verificarFechaMesa = require('./routes_reserva/verificarFechaMesa');
let crearReserva = require('./routes_reserva/crearReserva');
let buscarMesa = require('./routes_reserva/buscarMesa');

router.post('/',async(req, res, next)=>{
  const dia = req.query['dia'];
  const mes = req.query['mes'];
  const anyo = req.query['anyo'];
  const hora = req.query['hora'];
  const min = req.query['min'];
  const rut = req.query['rut'];
  const mesa = req.query['mesa'];
  const capacidad = req.query['capacidad'];
  var fecha1 = new Date(parseInt(anyo), parseInt(mes), parseInt(dia), parseInt(hora), parseInt(min));
  var fecha2 = new Date(parseInt(anyo), parseInt(mes), parseInt(dia), parseInt(hora)+3, parseInt(min));
  if(fecha1 && mesa){ //Si la mesa fue especificada
  	if(verificarFechaMesa(fecha1, fecha2, mesa)){ //Se verifica si existe una reserva con esa mesa en esa fecha
  		crearReserva(fecha1, fecha2, mesa, rut); //Se procede a reservar
  	}
  }else if (fecha1 && capacidad){ //Se necesita buscar una mesa
  	let mesa = buscarMesa(fecha1, fecha2, capacidad); //Se busca una mesa con esos parametros
  	if(mesa) crearReserva(fecha1, fecha2, mesa, rut); //Si se encuentra se crea la reserva
  }
});

module.exports = router;
