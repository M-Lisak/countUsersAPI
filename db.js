const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'countUsers',
    'admin',
    'Ilyshk0',
    {
        host: 'master.9e13ccef-a73b-4408-a922-e57461ecffe5.c.dbaas.selcloud.ru',
        port: '5432',
        dialect: 'postgres'
    }
)
