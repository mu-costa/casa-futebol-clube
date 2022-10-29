import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import generateLeaderBoard from '../utils/calculatePointsGeneral';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota login', ()=>{
    describe('Quando a requisição get é feita com sucesso na rota login', ()=>{
        it('deve retornar um status 200', async () => {
            const httpResponse = await chai.request(app).get('/leaderboard');
            expect(httpResponse.status).to.equal(200);
        })
    });
    describe('Quando a requisição get é feita ser o header authorization na rota login/validate', ()=>{
        it('deve retornar um status 200', async () => {
            const httpResponse = await chai.request(app).get('/leaderboard/home');
            expect(httpResponse.status).to.equal(200);
        })
    });
    describe('Quando a requisição post é feita com dados invalidos na rota login', ()=>{
        it('deve retornar um status 400', async () => {
            const httpResponse = await chai.request(app).get('/leaderboard/away');
            expect(httpResponse.status).to.equal(200);
        })
    });
    describe('testing leaderboard', async ()=> {
        it('testing leaderboard', async ()=> {
            const leaderboard = await generateLeaderBoard();
            expect(leaderboard.length).to.be('1');
        })
    })
});
