const models = require('../../models');
let verificarFechaMesa = require('./verificarFechaMesa');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports =  async(fecha1, fecha2, capacidad)=>{
    let mesa = models.mesa.findAll({
    where: {
        capacidad:{
            [Op.gte]: capacidad
        }
    },
    order:[
    ['capacidad','ASC']
    ]
    }).then(mesas=>{
        if(mesas){
            console.log('testing');
            return mesas[0].numero;
        }
    }).catch(err =>{
        console.log('err : ' + err);
    });

return mesa;
}




