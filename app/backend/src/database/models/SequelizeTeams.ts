import { Model, DataTypes } from 'sequelize';
import database from '.';

class Teams extends Model {}

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
  },
}, {
  modelName: 'teams',
  timestamps: false,
  sequelize: database,
});

export default Teams;
