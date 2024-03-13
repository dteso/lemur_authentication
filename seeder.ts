import dotenv from 'dotenv';
import Server from './servers/server';
import PermissionService from './services/permission.service';
import { executePgQuery } from './database/execute-pg-query';

dotenv.config();

console.log("[INFO] STARTING NODE-TS SERVER");

const permissions = [
    {
        name: 'USER_CREATE',
        description: 'Allows to create new users.'
    },
    {
        name: 'USER_VIEW',
        description: 'Allows to create view users.'
    },
    {
        name: 'USER_DELETE',
        description: 'Allows to delete users.'
    },
    {
        name: 'USER_LIST',
        description: 'Allows to list users.'
    },
    {
        name: 'USER_EDITION',
        description: 'Allows to modify users.'
    },
    {
        name: 'FILE_CREATE',
        description: 'Allows to create file.'
    },
    {
        name: 'FILE_VIEW',
        description: 'Allows to view file.'
    },
    {
        name: 'FILE_DELETE',
        description: 'Allows to delete file.'
    },
    {
        name: 'FILE_LIST',
        description: 'Allows to list files.'
    },
    {
        name: 'FILE_EDITION',
        description: 'Allows to edit files.'
    },
    {
        name: 'FOLDER_CREATE'
    },
    {
        name: 'FOLDER_VIEW'
    },
    {
        name: 'FOLDER_DELETE'
    },
    {
        name: 'FOLDER_LIST'
    },
    {
        name: 'FOLDER_EDITION'
    },
    {
        name: 'S3_CREATE'
    },
    {
        name: 'S3_VIEW'
    },
    {
        name: 'S3_DELETE'
    },
    {
        name: 'S3_LIST'
    },
    {
        name: 'S3_EDITION'
    },
    {
        name: 'ROLE_CREATE'
    },
    {
        name: 'ROLE_VIEW'
    },
    {
        name: 'ROLE_DELETE'
    },
    {
        name: 'ROLE_LIST'
    },
    {
        name: 'ROLE_EDITION'
    },
    {
        name: 'PERMISSION_CREATE'
    },
    {
        name: 'PERMISSION_VIEW'
    },
    {
        name: 'PERMISSION_DELETE'
    },
    {
        name: 'PERMISSION_LIST'
    },
    {
        name: 'PERMISSION_EDITION'
    }
]

const scripts = [
    "database/create-permissions.sql",
    "database/create-roles.sql",
    "database/create-users.sql",
    // "database/create-role-permissions.sql",
];

async function seedDatabase() {
    for (const script of scripts) {
        try {
            await executePgQuery(script);
        } catch (error) {
            console.error('Error al ejecutar el script:', error);
            // Si ocurrió un error, puedes decidir si quieres continuar con el siguiente script o detener la ejecución
            // Por ejemplo, puedes lanzar una excepción para detener la ejecución o simplemente continuar con el siguiente script
        }
    }

    const permissionService = new PermissionService();

    console.log(" SEEDING PERMISSIONS ... ");

    for (const permission of permissions) {
        console.log("> inserting: ", permission);
        permissionService.createPermission(permission);
    }
}

const server = new Server();
server.dbConnection();
seedDatabase();






