const models = require('../../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports =  async(fecha1, fecha2, mesa)=>{
  console.log('verificar')
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
          return resolve(false);
        }else{
          return resolve(true);
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