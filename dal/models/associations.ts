// import { dbConnector } from "../../database/connection";
import Permission from "./permission.model";
import Role from "./role.model";
import User from "./user.model";

// const sequelize = dbConnector();

export const createAssociations = (): void => {

    // Role - Permission relation
    Permission.belongsToMany(Role, { foreignKey: 'permissionId', through: 'role-permissions' });
    Role.belongsToMany(Permission, { foreignKey: 'roleId', through: 'role-permissions' });

    // User - Role one (role) to many (user) relation 
    // In this implementation an automatic roleId column will be automatically created in 'users' table
    User.belongsTo(Role, { foreignKey: 'roleId', as: 'role' }); // Agrega 'as: 'role'' para especificar el alias
    Role.hasMany(User, { foreignKey: 'roleId', as: 'users' }); // Agrega 'as: 'users'' para especificar el alias

    // // User - Role  many to many relations
    /**
     * When we are using a many to many relationship an intermediate table is created automatically by sequelize.
     * We specify this table to define owr customa name using the 'througt' propperty
     */
    // User.belongsToMany(Role, { foreignKey: 'userId', through: 'user-roles' });
    // Role.belongsToMany(User, { foreignKey: 'roleId', through: 'user-roles'}); // , onDelete: 'RESTRICT'  --> use this option to manage cascade deleting 

}

// (async () => {
//     await sequelize.sync();
// })();
