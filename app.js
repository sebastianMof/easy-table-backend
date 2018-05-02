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
		tipo_usuario: 'Cliente'
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

	//Instancia de todas las mesas, imprime cantidad de mesas.
	Mesa.findAll().then( function ( mesas ) {
	console.log("Cantidad de mesas:" + mesas.length);
	});

	//Instancia de todas las mesas con numero igual a 2, imprime cant de esto(siempre1).
	Mesa.findAll({ 
	  where: {
	    numero: 2
	  }
	}).then( function ( mesas ) {
	console.log("Mesas con numero igual a 2:" + mesas.length);
	});

	//Instancia de todas las mesas con capacidad >= 6, imprime cant de estas.
	Mesa.findAll({ 
	  where: {
	    capacidad:{
			[Op.gte]: 6,
		}
	  }
	}).then( function ( mesas ) {
	console.log("Mesas con capacidad mayor o igual a 6:" + mesas.length);
	});

	//No es necesario filtrar por numero, ya que es llave primaria

	//-----------------------------------
	////Funciones Consulta en RESERVA -------

	//Instancia de reservas entre fechas 10 y 22, imprime la cantidad
 	Reserva.findAll({ 
	  where: {
	    fecha_reserva:{
			[Op.between]: [10,22]
		}
	  }
	}).then( function ( reservas ) {
	console.log("Cantidad de reservas entre 10 y 22:" + reservas.length);
	});

	//Instancia de reservas activas, imprime cant. reservas activas
	Reserva.findAll({ 
	  where: {
	    estado: 1
		}
	  }
	}).then( function ( reservas ) {
	console.log("Reservas Activas:" + reservas.length);
	});

	//Instancia de reservas inactivas, imprime cant. reservas inactivas
	Reserva.findAll({ 
	  where: {
	    estado: 0
		}
	  }
	}).then( function ( reservas ) {
	console.log("Reservas Activas:" + reservas.length);
	});

	//-----------------------------------
	////Funciones Consulta en USUARIO -------

	//Instancia de todos los usuarios, imprime cant. usuarios
	Usuario.findAll().then( function ( usuarios ) {
	console.log("Cantidad de usuarios:" + usuarios.length);
	});

	//Instancia de todos los usuarios ADMIN, imprime cant. ADMINS
	Usuario.findAll({ 
	  where: {
	    tipo_usuario: 'Admin'
		}
	  }
	}).then( function ( usuarios ) {
	console.log("Cantidad de ADMINs:" + usuarios.length);
	});

	//Instancia de todos los usuarios CLIENTE, imprime cant, usuarios
	Usuario.findAll({ 
	  where: {
	    tipo_usuario: 'Cliente'
		}
	  }
	}).then( function ( usuarios ) {
	console.log("Cantidad de Clientes:" + usuarios.length);
	});

	//Instancia de todos los usuarios CLIENTE, imprime cant, usuarios
	Usuario.findAll({ 
	  where: {
	    tipo_usuario: 'Cliente'
		}
	  }
	}).then( function ( usuarios ) {
	console.log("Cantidad de Clientes:" + usuarios.length);
	});

	Usuario.findAll({ 
	  where: {
	    tipo_usuario: 'Cliente'
		}
	  }
	}).then( function ( usuarios ) {
	console.log("Cantidad de Clientes:" + usuarios.length);
	});





	
});
