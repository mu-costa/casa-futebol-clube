import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota matches', ()=>{
    describe('Quando a requisição é feita com sucesso na rota matches', ()=>{
        it('deve retornar um status 200', async () => {
            const httpResponse = await chai.request(app).get('/matches');
            expect(httpResponse.status).to.equal(200);
        })
    })
    describe('Quando a requisição get é feita ser o header authorization na rota login/validate', ()=>{
        it('deve retornar um status 200', async () => {
            const httpResponse = await chai.request(app).post('/matches/');
            expect(httpResponse.status).to.equal(422);
        })
    });
    describe('Quando a requisição post é feita com dados invalidos na rota login', ()=>{
        it('deve retornar um status 400', async () => {
            const httpResponse = await chai.request(app).patch('/matches/:id/finish');
            expect(httpResponse.status).to.equal(200);
        })
    })
    describe('Quando a requisição é feita com sucesso na rota matches', ()=>{
        it('deve retornar um status 200', async () => {
            const httpResponse = await chai.request(app).get('/matches?inProgress=true');
            expect(httpResponse.status).to.equal(200);
        })
    })
    describe('Quando a requisição é feita com sucesso na rota matches', ()=>{
        it('deve retornar um status 200', async () => {
            const httpResponse = await chai.request(app).patch('/matches/:id');
            expect(httpResponse.status).to.equal(200);
        })
    })
    describe('Quando a requisição é feita com sucesso na rota matches', ()=>{
        it('deve retornar um status 200', async () => {
            const httpResponse = await chai.request(app).get('/matches?inProgress=false');
            expect(httpResponse.status).to.equal(200);
        })
    })
})