const models = require('../../models')

function verificarFechaMesa(fecha1, fecha2, mesa){
	var reservas_fecha = Reserva.findAll({
          where: {
            fecha_reserva:{
                [Op.between]: [fecha1,fecha2]
            },
            estado: true,
            mesaNumero: mesa
          }
    });
    if (!reservas_fecha) return true; //Retorna true si no hay reservas
    return false;
}

module.export = verificarFechaMesa;
