import { Router } from 'express';
import TeamsController from '../controllers/TeamsController';

const teamsRouter = Router();
const teamsController = new TeamsController();

teamsRouter.get('/teams', teamsController.getTeams);
teamsRouter.get('/teams/:id', teamsController.findTeam);

export default teamsRouter;
