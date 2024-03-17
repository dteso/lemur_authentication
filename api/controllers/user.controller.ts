
import { Request, Response } from "express"
import UserService from "../../services/user.service";
import { ErrorsService } from "../../services/errors.service";
import { ApplicationError } from "../../core/application.error.dto";
import { UserResponseDto } from "../../dal/dtos/user/user-response.dto";

class UserController {

    /**
     * [C]
     * Crear User / CREATE
     * 
     * @param req 
     * @param res 
     */
    static async postUser(req: Request, res: Response) {
        const { body } = req;
        try {
            const userService = new UserService();

            const user: UserResponseDto = await userService.createUser(body);
            if (user) {
                res.json({
                    method: 'postUser',
                    user
                })
            }
        } catch (e: unknown) {
            ErrorsService.manageErrors(e, res);
        }
    }

    /**
     * [R]
     * Listar Users/ READ
     * 
     * @param req 
     * @param res 
     */
    static async getUsers(req: Request, res: Response) {
        try {
            const userService = new UserService();
            const users: UserResponseDto[] = await userService.getAllUsers();
            if (users) {
                res.json({
                    method: 'getUsers',
                    users
                })
            }
        } catch (e: unknown) {
            ErrorsService.manageErrors(e, res);
        }
    }

    /**
     * [r]
     * Obtener User / READ(id)
     * 
     * @param req 
     * @param res 
     */
    static async getUser(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const userService = new UserService();

            const user: UserResponseDto = await userService.getUser(+id);
            if (user) {
                res.json({
                    method: 'getUser',
                    user,
                })
            } else {
                throw new ApplicationError("Not found user by requested Id.", 404);
            }
        } catch (e: unknown) {
            ErrorsService.manageErrors(e, res);
        }
    }


    /**
 * [r]
 * Obtener Propio User / READ(id)
 * 
 * @param req 
 * @param res 
 */
    static async getSelfUser(req: any, res: Response) {
        try {
            const userService = new UserService();
            const user: UserResponseDto = await userService.getUser(req.user.id);
            if (user) {
                res.json({
                    method: 'getSelfUser',
                    user,
                })
            } else {
                throw new ApplicationError("Not found user by requested Id.", 404);
            }
        } catch (e: unknown) {
            ErrorsService.manageErrors(e, res);
        }
    }

    /**
     * [U]
     * Actualizar User / UPDATE
     * 
     * @param req 
     * @param res 
     */
    static async putUser(req: Request, res: Response) {
        const { id } = req.params;
        const { body } = req;
        try {
            const userService = new UserService();

            const user: UserResponseDto = await userService.updateUser(+id, body);
            if (user) {
                res.json({
                    method: 'putUser',
                    user,
                })
            } else {
                throw new ApplicationError("Not found user by requested Id.", 404);
            }
        } catch (e: unknown) {
            ErrorsService.manageErrors(e, res);
        }
    }

    /**
 * [U]
 * Actualizar Propio User / UPDATE
 * 
 * @param req 
 * @param res 
 */
    static async putSelfUser(req: any, res: Response) {
        const { body } = req;
        try {
            const userService = new UserService();

            const user: UserResponseDto = await userService.updateUser(req.user.id, body);
            if (user) {
                res.json({
                    method: 'putSelfUser',
                    user,
                })
            } else {
                throw new ApplicationError("Not found user by requested Id.", 404);
            }
        } catch (e: unknown) {
            ErrorsService.manageErrors(e, res);
        }
    }

    /**
     * [D]
     * Eliminar User / DELETE
     * 
     * @param req 
     * @param res 
     */
    static async deleteUser(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const userService = new UserService();

            const user: UserResponseDto = await userService.deleteUser(+id);
            if (user) {
                res.json({
                    method: 'deleteUser',
                    user,
                })
            } else {
                throw new ApplicationError("Not found user by requested Id.", 404);
            }
        } catch (e: unknown) {
            ErrorsService.manageErrors(e, res);
        }
    }

    /**
 * [D]
 * Eliminar Propio User / DELETE
 * 
 * @param req 
 * @param res 
 */
    static async deleteSelfUser(req: any, res: Response) {
        try {
            const userService = new UserService();

            const user: UserResponseDto = await userService.deleteUser(req.user.id);
            if (user) {
                res.json({
                    method: 'deleteSelfUser',
                    user,
                })
            } else {
                throw new ApplicationError("Not found user by requested Id.", 404);
            }
        } catch (e: unknown) {
            ErrorsService.manageErrors(e, res);
        }
    }

    /*
* Crear Role / CREATE
* 
* @param req 
* @param res 
*/
    static async assignRoleToUserByIds(req: Request, res: Response) {
        const { body } = req;
        try {
            const userService = new UserService();

            const user = await userService.assignRoleToUserUsingIds(body.userId, body.roleId);
            if (user) {
                res.json({
                    method: 'assignRoleToUserByIds',
                    user
                })
            }
        } catch (e) {
            console.error(">>> ERROR: assignRoleToUserByIds", e);
            res.status(500).json({
                status: 'error>assignRoleToUserByIds(body)',
                description: e
            })
        }
    }

}

export default UserController;

