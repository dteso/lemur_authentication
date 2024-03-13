/* eslint-disable @typescript-eslint/no-explicit-any */

import Permission from "../models/permission.model";

class PermissionRepository {

    getAllPermissions(): Promise<Permission[] | any | null> {
        return Permission.findAll();
    }

    getPermissionById(id: any): Promise<Permission | any | null> {
        return Permission.findByPk(id);
    }

    createPermission(body: any): Promise<any> {
        const permission = new Permission(body);
        return permission.save();
    }

    async updatePermission(id: any, body: any): Promise<Permission | any | null> {
        const permission = await Permission.findByPk(id);
        return permission?.update(body);
    }

    async deletePermission(id: any): Promise<void | null> {
        const permission = await Permission.findByPk(id);
        return permission?.destroy();
    }
}

export default PermissionRepository;
