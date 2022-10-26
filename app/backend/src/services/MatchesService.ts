import MatchesModel from '../database/models/SequelizeMatches';
import TeamsModel from '../database/models/SequelizeTeams';

export default class userService {
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
}
