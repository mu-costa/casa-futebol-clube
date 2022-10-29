import { Router } from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';

const leaderboardRoutes = Router();
const leaderboardController = new LeaderBoardController();

leaderboardRoutes.get('/leaderboard/', leaderboardController.generateLeaderBoard);
leaderboardRoutes.get('/leaderboard/home', leaderboardController.generateLeaderBoardHome);
leaderboardRoutes.get('/leaderboard/away', leaderboardController.generateLeaderBoardAway);

export default leaderboardRoutes;
