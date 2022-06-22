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

describe('Testing clothes route', () => {

    describe('Route Tests', () => {
        test('Create clothes item', async () => {
            const body = { name: 'Jeans' }
            const response = await mockRequest.post('/clothes').send(body);
            expect(response.status).toEqual(200);
            expect(response.body.name).toEqual('Jeans');
        })

        test('Get from ID', async () => {
            const response = await mockRequest.get('/clothes/1');
            expect(response.status).toEqual(200);
            expect(response.body.name).toEqual('Jeans');
        })

        test('Get all clothes', async () => {
            const response = await mockRequest.get('/clothes');
            expect(response.status).toEqual(200);
            expect(response.body[0].name).toEqual('Jeans');
        })

        test('Update clothes item', async () => {
            const body = { name: 'Sweatshirts' }
            const response = await mockRequest.put('/clothes/1').send(body);
            expect(response.status).toEqual(200);
            expect(response.body.name).toEqual('Sweatshirts');
        })

        test('Delete clothes item', async () => {
            const response = await mockRequest.delete('/clotehs/1');
            expect(response.status).toEqual(200);
            expect(response.body).toEqual({});
        })
    });
});
