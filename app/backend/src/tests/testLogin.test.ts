import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota login', ()=>{
    describe('Quando a requisição é feita com sucesso na rota login', ()=>{
        it('deve retornar um status 200', async () => {
            const httpResponse = await chai.request(app).post('/login');
            expect(httpResponse.status).to.equal(200);
        })
    })
})