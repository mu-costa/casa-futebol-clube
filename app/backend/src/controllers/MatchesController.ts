import { NextFunction, Request, Response } from 'express';
import CreateError from '../helpers/CreateError';
import TokenManager from '../helpers/TokenManager';
import MatchesService from '../services/MatchesService';
import TeamsModel from '../database/models/SequelizeTeams';

const matchesService = new MatchesService();

const checkSameTeam = (home: number, away: number) : void => {
  if (home === away) {
    throw new CreateError(
      'EqualValues',
      'It is not possible to create a match with two equal teams',
    );
  }
};

const notExistedTeam = async (home: number, away: number) : Promise<void> => {
  const findHomeTeam = await TeamsModel.findByPk(home);
  const findAwayTeam = await TeamsModel.findByPk(away);
  if (!findHomeTeam || !findAwayTeam) {
    throw new CreateError(
      'NotFound',
      'There is no team with such id!',
    );
  }
};

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

  public createMatche = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    TokenManager.validateToken(authorization);
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
    checkSameTeam(homeTeam, awayTeam);
    await notExistedTeam(homeTeam, awayTeam);
    const inProgress = true;
    const data = await matchesService.createMatch({ homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress });
    res.status(201).json(data);
  };

  public updateMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await matchesService.updateMatch(Number(id));
    res.status(200).json(response);
  };
}
