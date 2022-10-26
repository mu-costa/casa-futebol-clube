import { NextFunction, Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

const matchesService = new MatchesService();

export default class MatchesController {
  public getMatches = async (req: Request, res: Response, next: NextFunction) => {
    if (req.query.inProgress) return next();
    const matches = await matchesService.getMatches();
    res.status(200).json(matches);
  };

  public inProgressMatchesFalse = async (req: Request, res: Response, next: NextFunction) => {
    if (req.query.inProgress === 'true') return next();
    const bool = (req.query.inProgress !== 'false');
    const getInProgress = await matchesService.getInProgress(bool);

    res.status(200).json(getInProgress);
  };

  public inProgressMatchesTrue = async (req: Request, res: Response) => {
    const bool = (req.query.inProgress === 'true');
    const getInProgress = await matchesService.getInProgress(bool);

    res.status(200).json(getInProgress);
  };
}
