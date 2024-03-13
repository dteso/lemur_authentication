
import { DataTypes, Model } from "sequelize";
import { dbConnector } from "../../database/connection";

class User extends Model { }

const sequelize = dbConnector();

User.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
    }
);

(async () => {
    await sequelize.sync();
})();


export default User;
