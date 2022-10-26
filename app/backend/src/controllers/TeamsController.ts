import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

const teamService = new TeamsService();

export default class TeamsController {
  public getTeams = async (req: Request, res: Response) => {
    const teams = await teamService.getTeams();
    res.status(200).json(teams);
  };

  public findTeam = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await teamService.findTeam(Number(id));

    res.status(200).json(team);
  };
}
