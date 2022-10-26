import TeamsModel from '../database/models/SequelizeTeams';

export default class userService {
  public getTeams = async () => {
    const data = TeamsModel.findAll({ raw: true });
    return data;
  };

  public findTeam = async (id: number) => {
    const team = TeamsModel.findOne({ where: { id } });
    return team;
  };
}
