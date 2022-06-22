'use strict';

const express = require('express');
const clothesRoute = require('./routes/clothes');
const foodRoute = require('./routes/food');
const error404Handler = require('./error-handlers/404');
const error500Handler = require('./error-handlers/500');
// const { PeopleModel } = require('../collections');

const app = express();
app.use(express.json());
app.use(clothesRoute);
app.use(foodRoute);

const PORT =  process.env.PORT || 3002;

app.use(express.json());

// app.post('/people', async(req, res, next) => {
//     let person = req.body;

//     let response = await PeopleModel.create(person);
//     res.status(200).send(response);
// });

app.post('/food', async(req, res, next) => {
    let food = req.body;

    let response = await foodRoute.create(food);
    res.status(200).send(response);
});

app.use('*', error404Handler);
app.use(error500Handler);

module.exports = {
    server: app,
    start: () => app.listen(console.log(`Listening on port ${PORT}`))
};
