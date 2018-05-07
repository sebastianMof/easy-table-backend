const express = require('express');
const router = express.Router();
const models = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.post('/',async(req, res, next)=>{
  const dia = req.query['fecha1'];
  const mes = req.query['fecha2'];
  const anyo = req.query['mesa'];
  var reservas_fecha = Reserva.findAll({
          where: {
            fecha_reserva:{
                [Op.between]: [fecha1,fecha2]
            },
            estado: true,
            mesaNumero: mesa
          }
    });
  var estado;
  if (!reservas_fecha){ 
  	estado=true; //Retorna true si no hay reservas
  }else{
  	estado=false;
  }
  let json = {
  	fecha1:fecha1,
  	fecha2:fecha2,
  	mesa:mesa,
  	estado:estado
  }
  res.send(json);
});

module.exports = router;