const models = require('../../models')

function agregarReserva(fecha1, fecha2, mesa, rut){
	models.reserva.create({
            fecha_inicio_reserva: fecha1,
            fecha_fin_reserva: fecha2,
            estado: true,
            mesaNumero: mesa,
            usuarioRut: rut
        }).then(reserva => {
            if (reserva) {
                res.json({
                    status: 1,
                    statusCode: 'reserva/created',
                    data: reserva.toJSON()
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'reserva/error',
                    description: "Couldn't create the reserva"
                });
            }
        }).catch(error => {
            res.status(400).json({
                status: 0,
                statusCode: 'database/error',
                description: error.toString()
            });
        });
		}

module.export = agregarReserva;