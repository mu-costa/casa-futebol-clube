import { NextFunction, Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

const matchesService = new MatchesService();

export default class MatchesController {
  public getMatches = async (req: Request, res: Response, next: NextFunction) => {
    if (req.query.inProgress) return next();
    const matches = await matchesService.getMatches();
    res.status(200).json(matches);
  };

  public inProgressMatches = async (req: Request, res: Response) => {
    const getInProgress = await matchesService.getInProgress(Boolean(req.query.inProgress));

    res.status(200).json(getInProgress);
  };
}
