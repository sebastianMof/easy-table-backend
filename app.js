var Sequelize = require( 'sequelize' );

var con = new Sequelize( 'null', 'null', 'null', {
	dialect: 'sqlite',
	storage: 'db.sqlite'
});

var Mesa = con.define( 'mesa', {
	estado: Sequelize.STRING,
	capacidad: Sequelize.INTEGER
});

var Cliente = con.define( 'cliente', {
	rut: Sequelize.STRING,
	nombre: Sequelize.STRING,
	mail: Sequelize.STRING,
	fono: Sequelize.STRING
});

var Mesero = con.define( 'mesero', {
	rut: Sequelize.STRING,
	nombre: Sequelize.STRING,
	mail: Sequelize.STRING,
	fono: Sequelize.STRING
});

var Reserva = con.define( 'reserva', {
	fecha: Sequelize.STRING,
	hora: Sequelize.STRING,
	idMesa: Sequelize.INTEGER,
	rutCliente: Sequelize.STRING
});

var Libera = con.define( 'libera', {
	fecha: Sequelize.STRING,
	idReserva: Sequelize.STRING
});



con.sync().then( function () {
	Mesa.create({
		estado: 'Ocupada',
		capacidad: '12'
	});
});

con.sync().then( function () {
	//Mesa.findById( 1 ).then( function ( mesa ){ 
	Mesa.findAll().then( function ( mesas ) {
	console.log("Numbers of records in the mesas table:" + mesas.length);


	});
});