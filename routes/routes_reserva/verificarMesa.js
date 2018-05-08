const express = require('express');
const router = express.Router();
const models = require('../../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/',async(req, res, next)=>{

  const fecha1 = req.query.fecha1;
  const fecha2 = req.query.fecha2;
  const mesa = req.query.mesa;

  models.reserva.findAll({ //await
          where: {
            fecha_inicio_reserva:{
                [Op.between]: [fecha1,fecha2]
            },
            fecha_fin_reserva:{
                [Op.between]: [fecha1,fecha2]
            },
            estado: true,
            mesaNumero: mesa
          }
}).then(reserva => {

        if (reserva) {
            res.json({
                status: 1,
                statusCode: 'mesas/ocupadas',
                data: mesas
                });
        } else {
            es.status(400).json({
                status: 0,
                statusCode: 'mesas/desocupadas',
                description: 'No hay mesas ocupadas en el horario'
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