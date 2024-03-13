
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApplicationError } from "../core/application.error.dto";
import PermissionRepository from "../dal/repositories/permission.repository";

class PermissionService {

    private permissionRepository = new PermissionRepository();

    async createPermission(body: any): Promise<any> {
        const permission = await this.permissionRepository.createPermission(body);
        if (!permission) {
            throw new ApplicationError('error creating permission', 500);
        }
        return permission;
    }

    async getAllPermissions(): Promise<any> {
        return await this.permissionRepository.getAllPermissions();
    }

    async getPermission(id: any): Promise<any> {
        const permission = await this.permissionRepository.getPermissionById(id);
        if (!permission) {
            throw new ApplicationError(`Not permission found by Id ${id}`, 404);
        }
        return permission;
    }

    async updatePermission(id: any, body: any): Promise<any> {
        const permission = await this.permissionRepository.updatePermission(id, body);
        if (!permission) {
            throw new ApplicationError(`Not permission found by Id ${id}`, 404);
        }
        return permission;
    }

    async deletePermission(id: any): Promise<any> {
        if (!await this.getPermission(id)) {
            throw new ApplicationError(`Not permission found by Id ${id}`, 404);
        }
        try {
            return await this.permissionRepository.deletePermission(id);
        } catch (error: any) {
            if (error.name === 'SequelizeForeignKeyConstraintError') {
                throw new ApplicationError('Exists at least a registered user using this role', 409);
            } else {
                throw error;
            }
        }
    }


}

export default PermissionService;
