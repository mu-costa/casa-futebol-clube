import MatchesModel from '../database/models/SequelizeMatches';
import TeamsModel from '../database/models/SequelizeTeams';

interface match {
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export default class matchesService {
  public getMatches = async () => {
    const data = await MatchesModel.findAll({ include: [
      {
        model: TeamsModel, as: 'teamHome', attributes: { exclude: ['id'] },
      },
      {
        model: TeamsModel, as: 'teamAway', attributes: { exclude: ['id'] },
      },
    ] });
    return data;
  };

  public getInProgress = async (bool: boolean) => {
    const data = await MatchesModel.findAll({ where: { inProgress: Boolean(bool) },
      include: [
        {
          model: TeamsModel, as: 'teamHome', attributes: { exclude: ['id'] },
        },
        {
          model: TeamsModel, as: 'teamAway', attributes: { exclude: ['id'] },
        },
      ] });
    return data;
  };

  public createMatch = async ({ homeTeam,
    awayTeam,
    homeTeamGoals,
    awayTeamGoals, inProgress } : match) => {
    const data = await MatchesModel.create({ homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress });
    return data;
  };

  public updateMatch = async (id: number) => {
    const data = await MatchesModel.update({ inProgress: false }, {
      where: { id } });
    return data;
  };

  public updateInProgress = async (id: number, homeTeamGoals: number, awayTeamGoals: number) => {
    const data = await MatchesModel.update({ homeTeamGoals, awayTeamGoals }, {
      where: { id } });

    return data;
  };
}
