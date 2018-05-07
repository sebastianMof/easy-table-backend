// const models = require('../../models')

// function buscarMesa(fecha1, fecha2, capacidad){
// 	var mesas_con_capacidad = Mesa.findAll({ //Esto busca las mesas que sirven según la capacidad pedida
//           where: {
//             capacidad:{
//                 [Op.gte]: 'capacidad',
//             }
//           }
//         });
//     var id_mesas;
//     for (var i in mesas_con_capacidad){
//         id_mesas.append(i.numero); //Añade los id de las mesas de mesas_con_capacidad a id_mesas
//     }
//     var reservas_fecha = Reserva.findAll({
//         where: {
//         fecha_reserva:{
//             [Op.between]: [f1,f2]
//         },
//         estado: true //Para filtrar las reservas anuladas, esas no se consideran
//         }
//     });
//     if (reservas_fecha.length == 0) return id_mesas[0]; //Si no hay reservas en esa hora se queda con la primera mesa disponible
//     var mesas_no_disponibles; //Esto registrará las mesas que sirven pero que están ocupadas
//     for (var i in reservas_fecha){ //Se recorren todas las reservas en esa fecha
//         for (var j in id_mesas){
//             if (i.mesaNumero == j){
//                 mesas_no_disponibles.append(i.mesaNumero); //Se añade la mesa a las no disponibles
//             }
//         }
//     }
//     //Ahora se conocen las mesas no disponibles en esa hora, así que hay que registrar cualquiera disponible
//     var ctd_id_mesas = id_mesas.length;
//     var contador = 1;
//     var mesa;
//     for (var i in id_mesas){
//         for (var j in mesas_no_disponibles){
//             if (j!=id){
//                 contador = contador + 1;
//                 if(contador == ctd_id_mesas){
//                     mesa = i; //Se obtiene una mesa que sirve y que no está ocupada en esa fecha
//                 }
//             }else{
//                 contador = 0;
//             }
//         }
//     }
//     return mesa;
// }
// module.export = buscarMesa;
