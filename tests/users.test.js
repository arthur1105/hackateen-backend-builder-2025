import request from 'supertest';
import {App, app} from '../app.js';
import { sequelize } from '../models/database.js';


let server;

beforeAll(async () => {
  server = await App();
 await sequelize.truncate({ cascade: true });
});

afterAll(async () => {
    await server.close();
    await sequelize.close(); 
});




describe('Testes para o endpoint /users', () => {

    it('Deve criar um novo usuário com sucesso', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                name: 'John Doe',
                email: 'john.doe@example.com',
                password: '123456'
            });

        await expect(response.statusCode).toBe(201);
        await expect(response.body).toHaveProperty('userId');
        await expect(response.body.name).toBe('John Doe');
    });

    it('Deve retornar erro ao tentar criar um usuário sem email', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                name: 'John Doe',
                password: '123456'
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.erro).toHaveProperty('mensagem');
    });

    it('Deve retornar erro ao tentar criar um usuário sem a senha', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                name: 'John Doe',
                email: 'john.doe@example.com'
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.erro).toHaveProperty('mensagem');
    });

    it('Deve retornar erro ao tentar criar um usuário sem nome', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                email: 'john.doe@example.com',
                password: '123456'
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.erro).toHaveProperty('mensagem');
    });

});