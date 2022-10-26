import { Model, DataTypes } from 'sequelize';
import database from '.';

class User extends Model {
  id!: number;
  username: string;
  email: string;
  password:string;
  role: string;
}

User.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  username: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
  },
}, {
  modelName: 'users',
  timestamps: false,
  sequelize: database,
  tableName: 'users',
});

export default User;
