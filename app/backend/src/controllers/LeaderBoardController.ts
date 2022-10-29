import { Request, Response } from 'express';
/* import LeaderBoardService from '../services/LeaderBoardService';
 */
import LeaderBoards from '../utils/calculatePointsGeneral';
import LeaderBoardsHome from '../utils/calculatePointsHome';
import LeaderBoardsAway from '../utils/calculatePointsAway';

/* const leaderBoardService = new LeaderBoardService();
 */
export default class LeaderBoardController {
  public generateLeaderBoard = async (req: Request, res: Response) => {
    const data = await LeaderBoards();
    res.status(200).json(data);
  };

  public generateLeaderBoardHome = async (req: Request, res: Response) => {
    const data = await LeaderBoardsHome();
    res.status(200).json(data);
  };

  public generateLeaderBoardAway = async (req: Request, res: Response) => {
    const data = await LeaderBoardsAway();
    res.status(200).json(data);
  };
}
