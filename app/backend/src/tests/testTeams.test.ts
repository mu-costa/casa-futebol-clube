import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota teams', ()=>{
    describe('Quando a requisição é feita com sucesso na rota teams', ()=>{
        it('deve retornar um status 200', async () => {
            const httpResponse = await chai.request(app).get('/teams');
            expect(httpResponse.status).to.equal(200);
        })
    })
    describe('Quando a requisição é feita com sucesso na rota teams', ()=>{
        it('deve retornar um status 200', async () => {
            const httpResponse = await chai.request(app).get('/teams/:id');
            expect(httpResponse.status).to.equal(500);
        })
    })
})