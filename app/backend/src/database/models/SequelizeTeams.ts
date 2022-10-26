import { Model, DataTypes } from 'sequelize';
import database from '.';

class Teams extends Model {
  id!: number;
  teamName: string;
}

Teams.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  teamName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'team_name',
  },
}, {
  modelName: 'teams',
  timestamps: false,
  sequelize: database,
  tableName: 'teams',
});

export default Teams;
