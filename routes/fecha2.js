const express = require('express');
const router = express.Router();
const models = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.post('/',async(req, res, next)=>{
  let dia = req.query.dia;
  let mes = req.query.mes;
  let anyo = req.query.anyo;
  let hora = req.query.hora;
  let min = req.query.min;
  let fecha1 = new Date(parseInt(anyo), parseInt(mes), parseInt(dia), parseInt(hora), parseInt(min));
  let fecha2 = new Date(parseInt(anyo), parseInt(mes), parseInt(dia), parseInt(hora)+3, parseInt(min));
  let fecha3 = new Date(2018,1,2,20,33);
  let json = {
  	fecha1:fecha1,
  	fecha2:fecha2,
  	fecha3:fecha3,
  	dia:dia,
  	mes:mes,
  	anyo:anyo
  }
  res.send(json);
});

module.exports = router;