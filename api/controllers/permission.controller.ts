
import { Request, Response } from "express"
import PermissionService from "../../services/permission.service";
import { ErrorsService } from "../../services/errors.service";
import { ApplicationError } from "../../core/application.error.dto";

class PermissionController {


    /**
     * [C]
     * Crear Permission / CREATE
     * 
     * @param req 
     * @param res 
     */
    static async postPermission(req: Request, res: Response) {
        const { body } = req;
        try {
            const permissionService = new PermissionService();
            const permission = await permissionService.createPermission(body);
            if (permission) {
                res.json({
                    method: 'postPermission',
                    permission
                })
            }
        } catch (e) {
            ErrorsService.manageErrors(e, res);
        }
    }



    /**
     * [R]
     * Listar Permissions/ READ
     * 
     * @param req 
     * @param res 
     */
    static async getPermissions(req: Request, res: Response) {
        try {
            const permissionService = new PermissionService();
            const permissions = await permissionService.getAllPermissions();
            if (permissions) {
                res.json({
                    method: 'getPermissions',
                    permissions
                })
            }
        } catch (e) {
            ErrorsService.manageErrors(e, res);
        }
    }


    /**
     * [r]
     * Obtener Permission / READ(id)
     * 
     * @param req 
     * @param res 
     */
    static async getPermission(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const permissionService = new PermissionService();

            const permission = await permissionService.getPermission(id);
            if (permission) {
                res.json({
                    method: 'getPermission',
                    permission,
                })
            } else {
                throw new ApplicationError('Not found permission by requested Id.', 404);
            }
        } catch (e) {
            ErrorsService.manageErrors(e, res);
        }

    }


    /**
     * [U]
     * Actualizar Permission / UPDATE
     * 
     * @param req 
     * @param res 
     */
    static async putPermission(req: Request, res: Response) {
        const { id } = req.params;
        const { body } = req;
        try {
            const permissionService = new PermissionService();

            const permission = await permissionService.updatePermission(id, body);
            if (permission) {
                res.json({
                    method: 'putPermission',
                    permission,
                })
            } else {
                throw new ApplicationError('Updating Permission. Not found permission by requested Id', 404);
            }
        } catch (e) {
            ErrorsService.manageErrors(e, res);
        }
    }



    /**
     * [D]
     * Eliminar Permission / DELETE
     * 
     * @param req 
     * @param res 
     */
    static async deletePermission(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const permissionService = new PermissionService();

            const permission = await permissionService.deletePermission(id);
            if (permission) {
                res.json({
                    method: 'deletePermission',
                    permission,
                })
            } else {
                throw new ApplicationError('Deleting Permission. Not found permission by requested Id', 404);
            }
        } catch (e) {
            ErrorsService.manageErrors(e, res);
        }
    }


}

export default PermissionController;
