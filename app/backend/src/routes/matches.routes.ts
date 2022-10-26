import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';

const matchesController = new MatchesController();

const matchesRouter = Router();

matchesRouter.get('/matches', matchesController.getMatches);
matchesRouter.get('/matches', matchesController.inProgressMatchesFalse);
matchesRouter.get('/matches', matchesController.inProgressMatchesTrue);

export default matchesRouter;
