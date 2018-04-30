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
	rut_usuario: { 
		type: Sequelize.INTEGER,
		allowNull: false
	},
	numero_mesa:{
		type: Sequelize.INTEGER,
		allowNull: false
	},
	fecha_reserva: Sequelize.INTEGER,
	estado: Sequelize.INTEGER

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

	Reserva.create({
		rut_usuario: '123456789',
		numero_mesa: '2',
		fecha_reserva: '20',
		estado: '0'
	})
	Reserva.create({
		rut_usuario: '123457789',
		numero_mesa: '2',
		fecha_reserva: '25',
		estado: '0'
	})
	Usuario.create({
		nombre: 'nombre1',
		apellido: 'apellido1',
		rut: '1234566789',
		email: 'correo@correo.cl',
		tipo_usuario: 'Admin'
	})
	Usuario.create({
		nombre: 'nombre2',
		apellido: 'apellido2',
		rut: '1233566789',
		email: 'correo@correo.cl',
		tipo_usuario: 'Mesero'
	})



});

con.sync().then( function () {
	//Mesa.findById( 1 ).then( function ( mesa ){ 
	Mesa.findAll().then( function ( mesas ) {
	console.log("Numbers of records in the mesas table:" + mesas.length);
	});

	Reserva.findAll({. //Reservas entre fechas 10,22
	  where: {
	    fecha_reserva:{
			[Op.between]: [10,22]
		}
	  }
	}).then( function ( reservas ) {
	console.log("Numbers of records in the reservas table:" + reservas.length);
	});


	
});










