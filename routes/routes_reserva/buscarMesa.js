const models = require('../../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports =  async(fecha1, fecha2, capacidad)=>{//retorna mesas con capacidad pedida ordenadas, es decir, el orden de las más adecuadas
    let mesa = models.mesa.findAll({
    where: {
        capacidad:{
            [Op.gte]: capacidad
        }
    },
    order:[
    ['capacidad','ASC']
    ]
    }).then(mesas=>{//mesas con capacidad pedida ordenadas
    return new Promise((resolve,reject)=>{
      if(mesas.length!=0){//si existen mesas con capacidad pedida
        return resolve(mesas);
      }else{
        //no hay mesas con esa capacidad en el local
        return resolve(false);
      }
      return reject('No se encontraron datos');
    })
  })
  .catch(err =>{
    return new Promise(
      (resolve,reject)=>reject(err))
    });

return mesa;
}