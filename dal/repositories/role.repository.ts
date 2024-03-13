/* eslint-disable @typescript-eslint/no-explicit-any */

import { ApplicationError } from "../../core/application.error.dto";
import Permission from "../models/permission.model";
import Role from "../models/role.model";

class RoleRepository {

    getAllRoles(): Promise<Role[] | any | null> {
        return Role.findAll({ include: Permission });
    }

    getRoleById(id: any): Promise<Role | any | null> {
        return Role.findByPk(id, { include: Permission });
    }

    getRoleByName(name: string): Promise<Role | any | null> {
        return Role.findOne({
            where: { name },
            include: Permission,
        });
    }

    createRole(body: any): Promise<any> {
        const role = new Role(body);
        return role.save();
    }

    async updateRole(id: any, body: any): Promise<Role | any | null> {
        const role = await Role.findByPk(id, { include: Permission });
        await role?.update(body, {
            returning: true,
        });
        return await Role.findByPk(id, { include: Permission });
    }

    async deleteRole(id: any): Promise<void | null> {
        const role = await this.getRoleById(id);
        // Manual restriction. Not using sequelize for this
        this.checkdeleteRestrictions(role);
        return role?.destroy();
    }

    private async checkdeleteRestrictions(role: any) {
        const users = await role?.getUsers();
        // Verify associated users
        if (users && users.length > 0) {
            throw new ApplicationError('Exists at least a registered user using this role', 409);
        }
    }
}

export default RoleRepository;
