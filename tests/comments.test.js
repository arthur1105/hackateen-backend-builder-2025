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


describe('Testes para o endpoint /comments', () => {

    it('Deve criar um novo comentário com sucesso', async () => {
        const userResponse = await request(app)
            .post('/users')
            .send({
                name: 'João',
                email: 'João@exemplo.com',
                password: '123456'
            });

        expect(userResponse.statusCode).toBe(201);
        expect(userResponse.body).toHaveProperty('userId');
        expect(userResponse.body.name).toBe('João');

        const postResponse = await request(app)
            .post('/posts')
            .send({
                title: 'Título do post',
                type: 'event',
                content: 'Conteúdo do post',
                userId: userResponse.body.userId
            });

        expect(postResponse.statusCode).toBe(201);
        expect(postResponse.body).toHaveProperty('postId');
        expect(postResponse.body.userId).toEqual(userResponse.body.userId);


        const commentResponse = await request(app)
            .post('/comments')
            .send({
                content: 'Este é um comentário',
                date: '2023-10-01',
                userId: userResponse.body.userId,
                postId: postResponse.body.postId
            });

        expect(commentResponse.statusCode).toBe(201);
        expect(commentResponse.body).toHaveProperty('commentId');
        expect(commentResponse.body.content).toBe('Este é um comentário');
        expect(commentResponse.body.userId).toEqual(userResponse.body.userId);
        expect(commentResponse.body.postId).toEqual(postResponse.body.postId);
    });

});