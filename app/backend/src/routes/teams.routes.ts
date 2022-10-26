import { Router } from 'express';

const teamsRouter = Router();

teamsRouter.get('/teams', (req, res) => res.sendStatus(200));

export default teamsRouter;
