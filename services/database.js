const Sequelize = require('sequelize');

const sequelize = new Sequelize('si_bandara', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false
});
 
sequelize.authenticate().then(() => console.log('Connected to MySQL ...'));

module.exports = sequelize;