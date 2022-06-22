'use strict';

const express = require('express');
const { ClothesModel } = require('../models/index');
const router = express.Router();

router.post('/clothes', async (req, res) => {
    const clothes = req.body;
    try {
        const newClothes = await ClothesModel.create(clothes);
        res.status(200).send(newClothes);
    } catch (err) {
        res.status(404).send('Could not create clothes object');
    }
});

router.get('/clothes/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const selectedClothes = await ClothesModel.findOne({ where: { id: id } });
        res.status(200).send(selectedClothes);
    } catch (err) {
        res.status(404).send(`Could not find the item with id of: ${id}`);
    }
});

router.get('/clothes', async (req, res) => {
    try {
        const allClothes = await ClothesModel.findAll({});
        res.status(200).send(allClothes);
    } catch (err) {
        res.status(404).send('Could not find a list of clothes');
    }
});

router.put('/clothes/:id', async (req, res) => {
    const id = req.params.id
    const updatedClothes = req.body
    try {
        const selectedClothes = await ClothesModel.findOne({ where: { id: id } });
        await selectedClothes.update(updatedClothes);
        await selectedClothes.save();
        res.status(200).send(selectedClothes);
    } catch (err) {
        res.status(404).send(`Could not update the item with id of: ${id}`);
    }
});

router.delete('/clothes/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const ClothesItemToDelete = await ClothesModel.findOne({ where: { id: id } });
        await ClothesItemToDelete.destroy();
        res.status(200).send({});
    } catch (err) {
        res.status(404).send(`Could not delete the item with id ${id}`);
    }
});

module.exports = router;
