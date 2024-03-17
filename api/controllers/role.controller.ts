
import { Request, Response } from "express"
import RoleService from "../../services/role.service";
import { ErrorsService } from "../../services/errors.service";

class RoleController {

    /**
     * [C]
     * Create Role / CREATE
     * 
     * @param req 
     * @param res 
     */
    static async postRole(req: Request, res: Response) {
        const { body } = req;
        try {
            const roleService = new RoleService();

            const role = await roleService.createRole(body);
            if (role) {
                res.json({
                    method: 'postRole',
                    role
                })
            }
        } catch (e) {
            ErrorsService.manageErrors(e, res);
        }
    }



    /**
     * [R]
     * List Roles/ READ
     * 
     * @param req 
     * @param res 
     */
    static async getRoles(req: Request, res: Response) {
        try {
            const roleService = new RoleService();
            const roles = await roleService.getAllRoles();
            if (roles) {
                res.json({
                    method: 'getRoles',
                    roles
                })
            }
        } catch (e) {
            ErrorsService.manageErrors(e, res);
        }
    }


    /**
     * [r]
     * Get Role / READ(id)
     * 
     * @param req 
     * @param res 
     */
    static async getRole(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const roleService = new RoleService();
            const role = await roleService.getRole(id);
            if (role) {
                res.json({
                    method: 'getRole',
                    role,
                })
            } else {
                res.status(404).json({
                    status: 'NOT FOUND',
                    method: 'getRole',
                    description: 'ERROR Not found role by requested Id.'
                })
            }
        } catch (e) {
            ErrorsService.manageErrors(e, res);
        }
    }


    /**
     * [r]
     * Get Role By name / READ(id)
     * 
     * @param req 
     * @param res 
     */
    static async getRoleByName(req: Request, res: Response) {
        const { name } = req.params;
        try {
            const roleService = new RoleService();
            const role = await roleService.getRoleByName(name);
            if (role) {
                res.json({
                    method: 'getRoleByName',
                    role,
                })
            } else {
                res.status(404).json({
                    status: 'NOT FOUND',
                    method: 'getRoleByName',
                    description: 'ERROR Not found role by requested Id.'
                })
            }
        } catch (e) {
            ErrorsService.manageErrors(e, res);
        }
    }




    /**
     * [U]
     * Update Role / UPDATE
     * 
     * @param req 
     * @param res 
     */
    static async putRole(req: Request, res: Response) {
        const { id } = req.params;
        const { body } = req;
        try {
            const roleService = new RoleService();
            const role = await roleService.updateRole(id, body);
            if (role) {
                res.json({
                    method: 'putRole',
                    role,
                })
            } else {
                res.status(404).json({
                    status: 'NOT FOUND',
                    method: 'putRole',
                    description: 'ERROR Updating Role. Not found role by requested Id'
                })
            }
        } catch (e) {
            ErrorsService.manageErrors(e, res);
        }
    }



    /**
     * [D]
     * Delete Role / DELETE
     * 
     * @param req 
     * @param res 
     */
    static async deleteRole(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const roleService = new RoleService();

            const role = await roleService.deleteRole(id);
            if (role) {
                res.json({
                    method: 'deleteRole',
                    role,
                })
            } else {
                res.status(404).json({
                    status: 'NOT FOUND',
                    method: 'deleteRole',
                    description: 'ERROR Deleting Role. Not found role by requested Id'
                })
            }
        } catch (e) {
            ErrorsService.manageErrors(e, res);
        }
    }

    /*
    * Add a single permission to a role
    * 
    * @param req 
    * @param res 
    */
    static async assignPermissionToRoleUsingIds(req: Request, res: Response) {
        const { body } = req;
        try {
            const roleService = new RoleService();

            const role = await roleService.assignPermissionToRoleUsingId(body.roleId, body.permissionId);
            if (role) {
                res.json({
                    method: 'assignPermissionToRoleUsingIds',
                    role
                })
            }
        } catch (e) {
            ErrorsService.manageErrors(e, res);
        }
    }

    /*
    * Add a list of permissions referenced by id to a role
    * 
    * @param req 
    * @param res 
    */
    static async assignPermissionsToRoleUsingIds(req: Request, res: Response) {
        const { body } = req;
        try {
            const roleService = new RoleService();

            const role = await roleService.assignPermissionsToRoleUsingId(body.roleId, body.permissionIds);
            if (role) {
                res.json({
                    method: 'assignPermissionToRoleUsingIds',
                    role
                })
            }
        } catch (e) {
            ErrorsService.manageErrors(e, res);
        }
    }


}

export default RoleController;
