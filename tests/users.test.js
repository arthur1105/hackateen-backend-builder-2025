import request from 'supertest';
import { App, app } from '../app.js';
import { sequelize } from '../models/database.js';


let server;

beforeAll(async () => {
    server = await App();

});

afterAll(async () => {
    await server.close();
    await sequelize.close();
});

beforeEach(async () => {
    await sequelize.truncate({ cascade: true });
});


describe('Testes para o endpoint /users', () => {

    it('Deve criar um novo usuário com sucesso', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                name: 'João',
                email: 'João@example.com',
                password: '123456'
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('userId');
        expect(response.body.name).toBe('João');
    });

    it('Deve retornar erro ao tentar criar um usuário sem email', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                name: 'João',
                password: '123456'
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.erro).toHaveProperty('mensagem');
    });

    it('Deve retornar erro ao tentar criar um usuário sem a senha', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                name: 'João',
                email: 'João@example.com'
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.erro).toHaveProperty('mensagem');
    });

    it('Deve retornar erro ao tentar criar um usuário sem nome', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                email: 'João@example.com',
                password: '123456'
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.erro).toHaveProperty('mensagem');
    });

    it('Deve retornar erro ao tentar criar um usuário com email inválido', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                name: 'João',
                email: 'invalid-email',
                password: '123456'
            });

        expect(response.statusCode).toBe(500);
        expect(response.body.erro).toHaveProperty('mensagem');
    });

    it('Deve retornar erro ao tentar criar um usuário com email já existente', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                name: 'João',
                email: 'João@example.com',
                password: '123456'
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('userId');
        expect(response.body.name).toBe('João');

        const duplicateResponse = await request(app)
            .post('/users')
            .send({
                name: 'John doe2',
                email: 'João@example.com',
                password: '123456'
            });

        expect(duplicateResponse.statusCode).toBe(500);
        expect(duplicateResponse.body.erro).toHaveProperty('mensagem');
    });

    it('Deve retornar todos os usuários cadastrados', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                name: 'João',
                email: 'João@example.com',
                password: '123456'
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('userId');
        expect(response.body.name).toBe('João');

        const response2 = await request(app)
            .get('/users')
            .send();

        expect(response2.statusCode).toBe(200);
        expect(response2.body).toBeInstanceOf(Array);
        expect(response2.body.length).toBeGreaterThan(0);
    });

    it('Deve retornar erro ao tentar buscar os usuários cadastrados, porém não existe nenhum cadastrado', async () => {
        const response = await request(app)
            .get('/users')
            .send();

        expect(response.statusCode).toBe(404);
        expect(response.body.erro).toHaveProperty('mensagem');
    });

    it('Deve retornar um usuário cadastrado por meio do seu id', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                name: 'João',
                email: 'João@example.com',
                password: '123456'
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('userId');
        expect(response.body.name).toBe('João');

        const response2 = await request(app)
            .get('/users/' + response.body.userId)
            .send();

        expect(response2.statusCode).toBe(200);
        expect(response2.body.userId).toEqual(response.body.userId);
    });

    it('Deve retornar erro ao tentar buscar um usuários por id, porém o usuário não existe', async () => {
        const response = await request(app)
            .get('/users/1')
            .send();

        expect(response.statusCode).toBe(404);
        expect(response.body.erro).toHaveProperty('mensagem');
    });

    it('Deve atualizar um usuário com sucesso', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                name: 'João',
                email: 'João@example.com',
                password: '123456'
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('userId');
        expect(response.body.name).toBe('João');

        const response2 = await request(app)
            .patch('/users/' + response.body.userId)
            .send({
                name: 'João atualizado',
                password: '4321'
            });

        expect(response2.statusCode).toBe(200);
        expect(response2.body.name).toBe('João atualizado');
        expect(response2.body.password).toBe('4321');
    });

    it('Deve tentar atualizar um usuário, porém não fornece dados para realizar as atualizações ', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                name: 'João',
                email: 'João@example.com',
                password: '123456'
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('userId');
        expect(response.body.name).toBe('João');

        const response2 = await request(app)
            .patch('/users/' + response.body.userId)
            .send({});

        expect(response2.statusCode).toBe(400);
        expect(response2.body.erro).toHaveProperty('mensagem');
    });

    it('Deve tentar atualizar um usuário, porém o usuário não existe', async () => {
        const response = await request(app)
            .patch('/users/' + 1)
            .send({
                name: 'João atualizado',
                password: '4321'
            });

        expect(response.statusCode).toBe(500);
        expect(response.body.erro).toHaveProperty('mensagem');
    });

    it('Deve deletar um usuário com sucesso', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                name: 'João',
                email: 'João@example.com',
                password: '123456'
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('userId');
        expect(response.body.name).toBe('João');

        const response2 = await request(app)
            .delete('/users/' + response.body.userId)
            .send();

        expect(response2.statusCode).toBe(202);
        expect(response2.body.response).toHaveProperty('mensagem');

    });

    it('Deve tentar deletar um usuário, porém o usuário não existe', async () => {
        const response = await request(app)
            .delete('/users/' + 1)
            .send();

        expect(response.statusCode).toBe(500);
        expect(response.body.erro).toHaveProperty('mensagem');
    });

});