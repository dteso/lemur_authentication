
import { DataTypes, Model } from "sequelize";
import { dbConnector } from "../../database/connection";

class Role extends Model { }

const sequelize = dbConnector();

Role.init(
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
        // Permission Many TO Many ralationship on associations.ts
    },
    {
        sequelize,
        modelName: 'Role',
        tableName: 'roles'
    });


(async () => {
    await sequelize.sync();
})();


export default Role;
