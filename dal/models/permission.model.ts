
import { DataTypes, Model } from "sequelize";
import { dbConnector } from "../../database/connection";

class Permission extends Model { }

const sequelize = dbConnector();

Permission.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // Role Many TO Many ralationship on associations.ts
    },
    {
        sequelize,
        modelName: 'Permission',
        tableName: 'permissions'
    });

(async () => {
    await sequelize.sync();
})();


export default Permission;
