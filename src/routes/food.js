'use strict';

const express = require('express');
const { FoodModel } = require('../models/index');
const router = express.Router();

router.post('/food', async (req, res) => {
    const food = req.body;
    try {
        const newFood = await FoodModel.create(food);
        res.status(200).send(newFood);
    } catch (err) {
        res.status(404).send('Could not create food object');
    }
});

router.get('/food/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const selectedFood = await FoodModel.findOne({ where: { id: id } });
        res.status(200).send(selectedFood);
    } catch (err) {
        res.status(404).send(`Could not find the food with id of: ${id}`);
    }
});

router.get('/food', async (req, res) => {
    try {
        const allFoods = await FoodModel.findAll({});
        res.status(200).send(allFoods);
    } catch (err) {
        res.status(404).send('Could not find a list of foods');
    }
});

router.put('/food/:id', async (req, res) => {
    const id = req.params.id
    const updatedFood = req.body
    try {
        const selectedFood = await FoodModel.findOne({ where: { id: id } });
        await selectedFood.update(updatedFood);
        await selectedFood.save();
        res.status(200).send(selectedFood);
    } catch (err) {
        res.status(404).send(`Could not update the food with id of: ${id}`);
    }
});

router.delete('/food/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const foodToDelete = await FoodModel.findOne({ where: { id: id } });
        await foodToDelete.destroy();
        res.status(200).send({});
    } catch (err) {
        res.status(404).send(`Could not delete the food with id ${id}`);
    }
});

module.exports = router;
