/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApplicationError } from "../core/application.error.dto";
import { RoleRequestDto } from "../dal/dtos/role/role-request.dto";
import { RoleResponseDto } from "../dal/dtos/role/role-response.dto";
import { RoleDto } from "../dal/dtos/role/role.dto";
import RoleRepository from "../dal/repositories/role.repository";
import PermissionService from "./permission.service";

class RoleService {

    private roleRepository = new RoleRepository();
    private permissionService = new PermissionService();

    /**
     * Creates a new role
     * 
     * @param body {@link RoleRequestDto}
     * @returns Promise<{@link RoleResponseDto}>
     */
    async createRole(body: RoleRequestDto): Promise<RoleResponseDto> {
        const role = await this.roleRepository.createRole(body);
        if (!role) {
            throw new ApplicationError('error creating role', 500);
        }
        return await this.mapToResponse(role);
    }

    /**
     * Retreives all roles in db
     * 
     * @returns Promise<{@link RoleResponseDto}[]>
     */
    async getAllRoles(): Promise<RoleResponseDto[]> {
        const rolesResponse: RoleResponseDto[] = [];
        const roles = await this.roleRepository.getAllRoles();

        if (roles) {
            roles.forEach(async (role: RoleDto) => {
                const roleRes = await this.mapToResponse(role);
                rolesResponse.push(roleRes);
            });
        }

        return rolesResponse;
    }

    /**
     * Get a role by specified eidentifier (id)
     * @param id 
     * @returns Promise<{@link any}>
     */
    async getRole(id: any) {
        const role = await this.roleRepository.getRoleById(id);
        if (!role) {
            throw new ApplicationError('Not role found by Id', 404);
        }
        return await this.mapToResponse(role);
    }


    /**
     * Get a role by specified eidentifier (id)
     * @param id 
     * @returns Promise<{@link any}>
     */
    async getRoleByName(name: any) {
        const role = await this.roleRepository.getRoleByName(name);
        if (!role) {
            throw new ApplicationError('Not role found by name', 404);
        }
        return await this.mapToResponse(role);
    }




    /**
     * Updates a role specifies by the id identifier
     * 
     * @param id 
     * @param body 
     * @returns Promise<{@link RoleResponseDto}>
     */
    async updateRole(id: any, body: RoleRequestDto): Promise<RoleResponseDto> {
        const role = await this.roleRepository.updateRole(id, body);
        if (!role) {
            throw new ApplicationError('Not role found by Id', 404);
        }
        return await this.mapToResponse(role);
    }


    /**
     * Removes the role specified by identifier (id)
     * 
     * @param id 
     * @returns Promise<{@link any}>
     */
    async deleteRole(id: any) {
        try {
            return await this.roleRepository.deleteRole(id);
        } catch (error: any) {
            if (error.name === 'SequelizeForeignKeyConstraintError') {
                throw new ApplicationError('Exists at least a registered user using this role', 409);
            } else {
                throw error;
            }
        }
    }

    /**
     * Assigns a permissionId to an userId and performs a new relationship
     * 
     * @param roleId 
     * @param permissionId 
     * @returns Promise<{@link RoleResponseDto}>
     */
    async assignPermissionToRoleUsingId(roleId: number, permissionId: number) {
        const role = await this.getRoleDb(roleId);
        if (!role) {
            throw new ApplicationError('Not found role by id to assign role', 404);
        }
        const permission = await this.permissionService.getPermission(permissionId);
        if (!permission) {
            throw new ApplicationError('Not permission found by for role assignation', 404);
        }
        await role.setPermissions([...role.Permissions, permission]);
        return await this.updateRole(roleId, role);
    }

    /**
     * Assigns a list of permissionIds to a roleId
     * 
     * @param roleId 
     * @param permissionId 
     * @returns Promise<{@link RoleResponseDto}>
     */
    async assignPermissionsToRoleUsingId(roleId: number, permissionIds: number[]) {
        const role = await this.getRoleDb(roleId);
        const permissionsPayload: any[] = [];
        try {
            for (const permissionId of permissionIds) {
                const permission = await this.permissionService.getPermission(permissionId);
                permissionsPayload.push(permission);
            }
        }
        catch (e: ApplicationError | any) {
            throw new ApplicationError('CATCHED BEFORE SAVE ROLES: ' + e.message, e.httpStatus);
        }
        await role.setPermissions(permissionsPayload);
        return await this.updateRole(roleId, role);
    }


    /**
     * Role Response Mapper     
     * 
     * @param role 
     * @returns {@link RoleResponseDto}
     */
    async mapToResponse(role: RoleDto) {
        const rolePermissions: any[] = [];
        if (role.Permissions) {
            role.Permissions.forEach(async (rolePermission: any) => {
                rolePermissions.push(await this.mapToPermissionResponse(rolePermission));
                // rolePermissions.push(rolePermission.name);
                // rolePermissions.push(rolePermission);
            });
        }
        const roleRes: RoleResponseDto = {
            id: role.id,
            name: role.name,
            description: role.description,
            permissions: rolePermissions
        }
        return roleRes;
    }

    /**
     * Permission Response Mapper
     * 
     * @param permission Permission Response Mapper
     * @returns Promise<{@link any}>
     */
    async mapToPermissionResponse(permission: any): Promise<any> {
        return {
            id: permission.id,
            name: permission.name,
            description: permission.description
        }
    }

    /**
     * Get the role model directly from db without any mapping
     * 
     * @param id 
     * @returns Promise<{@link any}> 
     */
    async getRoleDb(id: number) {
        const role = await this.roleRepository.getRoleById(id);
        if (!role) {
            throw new ApplicationError(`Not role found by Id ${id}`, 404);
        }
        return role;
    }

}

export default RoleService;
