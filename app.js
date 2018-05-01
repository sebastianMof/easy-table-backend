var Sequelize = require( 'sequelize' );
const Op = Sequelize.Op;

var con = new Sequelize( 'null', 'null', 'null', {
	dialect: 'sqlite',
	storage: 'db.sqlite'
});

var Mesa = con.define( 'mesa', {
	numero: { 
		type: Sequelize.INTEGER, 
		primaryKey: true,
        autoIncrement: false, //Para convertirlo en serial poner en true
        allowNull: false
    },
	capacidad: Sequelize.INTEGER,

});

var Reserva = con.define( 'reserva', {
	fecha_inicio_reserva: Sequelize.DATE,
	fecha_fin_reserva: Sequelize.DATE,
	estado: Sequelize.BOOLEAN

});

var Usuario = con.define( 'usuario', {
	rut: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true
	},
	nombre: Sequelize.STRING,
	apellido: Sequelize.STRING,
	email: Sequelize.STRING,
	tipo_usuario: Sequelize.STRING

});

Mesa.hasMany(Reserva)

Reserva.belongsTo(Usuario)
Reserva.belongsTo(Mesa)

Usuario.hasMany(Reserva)

con.sync().then( function () {
	Mesa.create({
		numero: '1',
		capacidad: '2'
	});
	Mesa.create({
		numero: '2',
		capacidad: '6'
	});
	Mesa.create({
		numero: '3',
		capacidad: '10'
	});

	Usuario.create({
		nombre: 'Bruno',
		apellido: 'Becerra',
		rut: '111111111',
		email: 'correo@correo.cl',
		tipo_usuario: 'Admin'
	})
	Usuario.create({
		nombre: 'Alvaro',
		apellido: 'Gonzalez',
		rut: '222222222',
		email: 'correo@correo.net',
		tipo_usuario: 'Mesero'
	})
	Reserva.create({
		fecha_inicio_reserva: '2018-05-01 22:21:03.000',
		fecha_fin_reserva: '2018-05-02 01:21:03.000',
		estado: 'true',
		mesaNumero: '1',
		usuarioRut: '111111111',
	})



});

con.sync().then( function () {

	//Funciones Consulta en MESA -------
	//Mesa.findById( 1 ).then( function ( mesa ){ 
	Mesa.findAll().then( function ( mesas ) {
	console.log("Numbers of records in the mesa table:" + mesas.length);
	});

	Mesa.findAll({ //Mesas con capacidad >= 6
	  where: {
	    capacidad:{
			[Op.gte]: 6,
		}
	  }
	}).then( function ( mesas ) {
	console.log("Numbers of records in the mesa table mayor igual 6:" + mesas.length);
	});



	//-----------------------------------
	////Funciones Consulta en RESERVA -------


/*	Reserva.findAll({ //Reservas entre fechas 10,22
	  where: {
	    fecha_reserva:{
			[Op.between]: [10,22]
		}
	  }
	}).then( function ( reservas ) {
	console.log("Numbers of records in the reserva table entre 10 y 22:" + reservas.length);
	});
*/
	//-----------------------------------
	////Funciones Consulta en USUARIO -------

	Usuario.findAll().then( function ( usuarios ) {
	console.log("Numbers of records in the usuario table:" + usuarios.length);
	});



	
});










