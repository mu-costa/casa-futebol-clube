import MatchesModel from '../database/models/SequelizeMatches';
import TeamsModel from '../database/models/SequelizeTeams';

/* interface match {
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress: boolean;
} */

export default class LeaderBoardService {
  public getMatches = async (id: number) => {
    const homeTeam = await MatchesModel.findAll({ where: { homeTeam: id, inProgress: false } });
    const awayTeam = await MatchesModel.findAll({ where: { awayTeam: id, inProgress: false } });
    const obj = { homeTeam, awayTeam };
    return JSON.stringify(obj);
  };

  public generateIds = async () => {
    const getAllTeams = await TeamsModel.findAll({ raw: true });
    const ids = getAllTeams.map((match) => match.id);
    return ids;
  };

  public getHomeMatches = async (id:number) => {
    const homeTeam = await MatchesModel.findAll({ where: { homeTeam: id, inProgress: false } });
    const arr = homeTeam;
    return JSON.stringify(arr);
  };

  public getAwayMatches = async (id:number) => {
    const homeTeam = await MatchesModel.findAll({ where: { awayTeam: id, inProgress: false } });
    const arr = homeTeam;
    return JSON.stringify(arr);
  };
}
