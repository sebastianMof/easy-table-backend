const models = require('../../models')

function crearReserva(fecha1, fecha2, mesa, rut){
	var a = models.reserva.create({
            fecha_inicio_reserva: fecha1,
            fecha_fin_reserva: fecha2,
            estado: true,
            mesaNumero: mesa,
            usuarioRut: rut
        }).then(reserva => {
            return new Promise((resolve,reject)=>{
                if(reserva){
                    resolve({
                        status: 1,
                        statusCode: 'reserva/creada',
                        data: reserva.toJSON()
                    });
                }
                reject({
                    status: 0,
                    statusCode: 'reserva/error',
                    description: "No se pudo crear la reserva"  
                })
            });
        }).catch(error => {
            return new Promise((resolve,reject)=>{
                reject({
                    status: 0,
                    statusCode: 'database/error',
                    description: error.toString()    
                })
            });
        });
    
    return a;
}

module.exports = crearReserva;