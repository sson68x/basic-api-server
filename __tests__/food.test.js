'use strict';

const supertest = require('supertest');
const { server } = require('../src/server');
const { sequelize } = require('../src/models/index');
const mockRequest = supertest(server);

beforeAll(async () => {
    await sequelize.sync();
});

afterAll(async () => {
    await sequelize.drop({});
    await sequelize.close();
});

describe('Testing food route', () => {

    describe('Route Tests', () => {
        test('Create food item', async () => {
            const body = { name: 'Pizza' }
            const response = await mockRequest.post('/food').send(body);
            expect(response.status).toEqual(200);
            expect(response.body.name).toEqual('Pizza');
        })

        test('Get from ID', async () => {
            const response = await mockRequest.get('/food/1');
            expect(response.status).toEqual(200);
            expect(response.body.name).toEqual('Pizza');
        })

        test('Get all food', async () => {
            const response = await mockRequest.get('/food');
            expect(response.status).toEqual(200);
            expect(response.body[0].name).toEqual('Pizza');
        })

        test('Update food item', async () => {
            const body = { name: 'MacNcheese' }
            const response = await mockRequest.put('/food/1').send(body);
            expect(response.status).toEqual(200);
            expect(response.body.name).toEqual('MacNcheese');
        })

        test('Delete food item', async () => {
            const response = await mockRequest.delete('/food/1');
            expect(response.status).toEqual(200);
            expect(response.body).toEqual({});
        })

    });
});
