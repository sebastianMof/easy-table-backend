const express = require('express');
const moment = require('moment')
const router = express.Router();
const models = require('../../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;



router.post('/',async(req, res, next)=>{
  let dia = req.query.dia;
  let mes = req.query.mes;
  let anyo = req.query.anyo;
  let hora = req.query.hora;
  let min = req.query.min;
  let fecha1 = new Date(parseInt(anyo), parseInt(mes), parseInt(dia), parseInt(hora), parseInt(min));
  let fecha2 = new Date(parseInt(anyo), parseInt(mes), parseInt(dia), parseInt(hora)+1, parseInt(min));
  let fecha3 = new Date(parseInt(anyo), parseInt(mes), parseInt(dia), parseInt(hora)+3, parseInt(min));
  var fechaMoment1 = moment(fecha1);
  var fechaMoment2 = moment(fecha2);
  var fechaMoment3 = moment(fecha3);
  
  //console.log(moment(fechaMoment).format('YYYY MM DD'));
  console.log(moment(fechaMoment2).isBetween(fechaMoment1,fechaMoment3));
  moment(fechaMoment1).toDate().

  let json = {
  	fecha1:fecha1,
  	fecha2:fechaMoment1

  }
  res.send(json);
});

module.exports = router;