const express = require('express');
const router = express.Router();
const models = require('../models');
const moment = require('moment');
//----------
let verificarFechaMesa = require('./routes_reserva/verificarFechaMesa');
// let crearReserva = require('./routes_reserva/crearReserva');
// let buscarMesa = require('./routes_reserva/buscarMesas');

router.post('/',async(req, res, next)=>{
  const fecha1 = new Date(req.query['fecha1']);
  const fecha2 = new Date(req.query['fecha2']);
  // console.log(fecha1);
  // console.log(fecha2);
  const mesa = req.query['mesa'];
  console.log("Ahora se ejecutará verificarFechaMesa");
  verificarFechaMesa(fecha1, fecha2, mesa)
    .then(response => res.send(response))
    .catch(err => res.send(err));
    
  console.log("Se verificó mesa");
  // if(fecha1 && mesa){ //Si la mesa fue especificada
  // 	if(verificarFechaMesa(fecha1, fecha2, mesa)){ //Se verifica si existe una reserva con esa mesa en esa fecha
  // 		crearReserva(fecha1, fecha2, mesa, rut); //Se procede a reservar
  // 	}
  // }else if (fecha1 && capacidad){ //Se necesita buscar una mesa
  // 	let mesa = buscarMesa(fecha1, fecha2, capacidad); //Se busca una mesa con esos parametros
  // 	if(mesa) crearReserva(fecha1, fecha2, mesa, rut); //Si se encuentra se crea la reserva
  // }else{
  //   console.log("Ha habido un error");
  // }
});

module.exports = router;