'use strict';

// const { sequelize, PeopleModel } = require('./collections');
const { sequelize, ClothesModel, FoodModel } = require('./src/models/index');
const server = require('./src/server');

sequelize.sync()
    .then(() => {
        console.log('Successful Connection!')
        // PeopleModel.create({name: 'Simon'});
        // ClothesModel.create({name: 'Tshirts'});
        // FoodModel.create({name: 'Chicken'});
    })
    .catch(err => console.error(err));

server.start();
