const app = require('../app')
const request = require('supertest')
const mongoose = require('mongoose');

describe('Test to routes', () => {
    // 1. GET - Unauthorized.
    test('GET store request without authorization headers', async () => {
        const response = await request(app).get('/api/stores').send();
        expect(response.status).toBe(401);
    });

    // 2. GET - Authorized.
    test('GET store request with authorization headers', async () => {
        const response = await request(app).get('/api/stores').set('Authorization', 'Basic dGVzdEBrb2liYW54LmNvbTphZG1pbg==').send();
        expect(response.status).toBe(200);
    });

    // 3. GET paginated - Authorized.
    test('GET store request with authorization headers', async () => {
        const response = await request(app).get('/api/stores?limit=20&page=1').set('Authorization', 'Basic dGVzdEBrb2liYW54LmNvbTphZG1pbg==').send();
        expect(response.status).toBe(200);
        expect(response._body.data.length).toBe(response._body.total);
    });

    // 4. POST - Authorized with name and cuit from store already exists.
    test('POST store request with authorization headers but the name and cuit from store already exists', async () => {
        const response = await request(app).post('/api/store').set('Authorization', 'Basic dGVzdEBrb2liYW54LmNvbTphZG1pbg==').send({
            name: "name_7",
            cuit: "cuit_7",
            concepts: ["insert", 5, "from", "jest", 559],
            currentBalance: "6075.37",
            lastSale: "2016-03-15"
        });

        expect(response.status).toBe(400);
        expect(response._body.errors[0].msg).toBe("Store name already in use");
        expect(response._body.errors[1].msg).toBe("Store cuit already in use");
    });

    // 5. POST - Authorized (seeder function).
    test('POST store request with authorization headers (seeder function)', async () => {
        const getResponse = await request(app).get('/api/stores').set('Authorization', 'Basic dGVzdEBrb2liYW54LmNvbTphZG1pbg==').send();
        const totalStores = getResponse._body.total;

        const postResponse = await request(app).post('/api/store').set('Authorization', 'Basic dGVzdEBrb2liYW54LmNvbTphZG1pbg==').send({
            name: `name_${totalStores}`,
            cuit: `cuit_${totalStores}`,
            concepts: Array.from({length: parseInt(totalStores)}, () => Math.floor(Math.random() * parseInt(totalStores))),
            currentBalance: `${totalStores}.05`,
            lastSale: new Date().toISOString().split('T')[0]
        });

        expect(postResponse.status).toBe(200);
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });
});
