var Sequelize = require( 'sequelize' );

var con = new Sequelize( 'null', 'null', 'null', {
	dialect: 'sqlite',
	storage: 'db.sqlite'
});

const User = con.define('user', 
	{
		numero: Sequelize.INTEGER
	}, 
	{underscored: true})



const Company  = con.define('company', {
  uuid: {
    type: Sequelize.UUID,
    primaryKey: true
  }
});

User.belongsTo(Company);


con.sync().then( function () {
	//Mesa.findById( 1 ).then( function ( mesa ){ 
	Company.findAll().then( function ( companys ) {
	console.log("Numbers of records in the mesas table:" + companys.length);


	});
});