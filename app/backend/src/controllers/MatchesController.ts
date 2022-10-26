import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

const matchesService = new MatchesService();

export default class MatchesController {
  public getMatches = async (req: Request, res: Response) => {
    const matches = await matchesService.getMatches();
    res.status(200).json(matches);
  };
}
