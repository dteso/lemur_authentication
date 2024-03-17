import Server from './servers/server';
import PermissionService from './services/permission.service';
import RoleService from './services/role.service';

console.log("[INFO] STARTING NODE-TS SERVER");

const permissions = [
    {
        name: 'USER_CREATE',
        description: 'Allows to create new users.'
    },
    {
        name: 'USER_VIEW',
        description: 'Allows to view users.'
    },
    {
        name: 'USER_VIEW_SELF',
        description: 'Allows to view own user.'
    },

    {
        name: 'USER_DELETE',
        description: 'Allows to delete users.'
    },
    {
        name: 'USER_DELETE_SELF',
        description: 'Allows to delete own user.'
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
        name: 'USER_EDITION_SELF',
        description: 'Allows to edit own user.'
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
        name: 'FOLDER_CREATE',
        description: 'Allows to create folders in server directory.'
    },
    {
        name: 'FOLDER_VIEW',
        description: 'Allows to view folder in server directory.'
    },
    {
        name: 'FOLDER_DELETE',
        description: 'Allows to delete any folder in server directory.'
    },
    {
        name: 'FOLDER_LIST',
        description: 'Allows to view all folders info in server directory.'
    },
    {
        name: 'FOLDER_EDITION',
        description: 'Allows to edit folders info in server directory.'
    },
    {
        name: 'S3_CREATE',
        description: 'Allows to upload s3 objects to bucket.'
    },
    {
        name: 'S3_VIEW',
        description: 'Allows to view s3 objects from bucket.'
    },
    {
        name: 'S3_DELETE',
        description: 'Allows to delete s3 objects from bucket.'
    },
    {
        name: 'S3_LIST',
        description: 'Allows to lista all s3 objects in bucket.'
    },
    {
        name: 'S3_EDITION',
        description: 'Allows to edit all s3 objects in bucket.'
    },
    {
        name: 'ROLE_CREATE',
        description: 'Allows to create new roles in database.'
    },
    {
        name: 'ROLE_VIEW',
        description: 'Allows to view roles in database.'
    },
    {
        name: 'ROLE_DELETE',
        description: 'Allows to deñete new roles from database.'
    },
    {
        name: 'ROLE_LIST',
        description: 'Allows to list roles in database.'
    },
    {
        name: 'ROLE_EDITION',
        description: 'Allows to edit roles in database.'
    },
    {
        name: 'PERMISSION_CREATE',
        description: 'Allows to create new permisisons in database.'
    },
    {
        name: 'PERMISSION_VIEW',
        description: 'Allows to view permissions in database.'
    },
    {
        name: 'PERMISSION_DELETE',
        description: 'Allows to delete permissions from database.'
    },
    {
        name: 'PERMISSION_LIST',
        description: 'Allows to list permissions in database.'
    },
    {
        name: 'PERMISSION_EDITION',
        description: 'Allows to edit permissions in database.'
    }
]

async function seedDatabase() {

    const permissionService = new PermissionService();
    const roleService = new RoleService();

    console.log(" SEEDING PERMISSIONS ... ");

    for (const permission of permissions) {
        console.log("> inserting: ", permission);
        permissionService.createPermission(permission);
    }

    let role = await roleService.createRole({
        name: 'ADMIN_ROLE',
        description: 'The super user for the application.'
    });

    const permissionIds = (await permissionService.getAllPermissions()).map((permission: any) => permission.id);
    role = await roleService.assignPermissionsToRoleUsingId(role.id, permissionIds);

    if (role) {
        console.info("[DATABASE INITILIZATION SUCCESS] Remember to /registrer a new USER and assign ADMIN_ROLE (roleId: '1') to start managing users.")
    }

}

const server = new Server();
server.dbConnection();
seedDatabase();






