import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

//criando a Instance do Cliente com as devidas tipagens.
export interface UserInstance extends Model {
    id: number;
    name: string;
    email: string;
    avatar: string;
}

//criando a Instance do Cliente com as devidas tipagens.
export const User = sequelize.define<UserInstance>("User", {
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    avatar: {
        type: DataTypes.TEXT
    }
},{
    tableName: 'users',
    timestamps: false
});