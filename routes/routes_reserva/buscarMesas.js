const express = require('express');
const router = express.Router();
const models = require('../../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.post('/',async(req, res, next)=>{
  const dia = req.query['capacidad'];
  var mesas_con_capacidad = models.mesa.findAll({ //Esto busca las mesas que sirven según la capacidad pedida
          where: {
            capacidad:{
                [Op.gte]: 'capacidad',
            }
          }
        });
  let json = {
  	mesas_con_capacidad:mesas_con_capacidad
  }
  res.send(json);
});

module.exports = router;