const models = require('../../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports =  async(fecha1, fecha2, mesa)=>{//Verifica si existe reserva activa entre las fechas 1 y 2 para la mesa(mesa=numero de mesa, no objeto)
    let reserva = models.reserva.findAll({
      where: {
        [Op.or]:[
        {
          fecha_inicio_reserva:{
            [Op.between] : [fecha1, fecha2]
          }
        },
        {
          fecha_fin_reserva:{
            [Op.between] : [fecha1, fecha2]
          }
        },
        { 
          [Op.and]:[{fecha_inicio_reserva: {
            [Op.lte]: fecha1
          }},{
            fecha_fin_reserva: {
              [Op.gte] : fecha2
            }
          }]
        },
        { 
          [Op.and]:[{fecha_inicio_reserva: {
            [Op.gte]: fecha1
          }},{
            fecha_fin_reserva: {
              [Op.lte] : fecha2
            }
          }]
        }],
        estado: true,
        mesaNumero: mesa
      }
    }).then(res=>{
      return new Promise((resolve,reject)=>{
        if(res.length!=0){
          return resolve(false);//retorna falso si existe alguna reserva en el periodo
        }else{
          return resolve(true);//retorna true si no existe reserva para la mesa en el periodo
        }
        return reject('No se encontraron datos');
      })
    })
    .catch(err =>{
      
      return new Promise(
        (resolve,reject)=>reject(err))
      });
    return reserva;
}