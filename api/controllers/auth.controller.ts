import { Request, Response } from "express"
import AuthService from "../../services/auth.service";
import { ErrorsService } from "../../services/errors.service";
import { ApplicationError } from "../../core/application.error.dto";
import { AuthRequestDto } from "../../dal/dtos/auth/auth-request.dto";
import { AuthResponseDto } from "../../dal/dtos/auth/auth-response.dto";
import { UserResponseDto } from "../../dal/dtos/user/user-response.dto";
import { UserCreateDto } from "../../dal/dtos/user/user-create.dto";
import { ChangePasswordDto } from "../../dal/dtos/auth/change-password-dto";

/**
 * Este controlador definde los métodos a ejecutar en función de los métodos establecidos en el router de esta entidad
 * 
 * Define sus métodos estáticos para que en el archivo de rutas no sea necesario instanciar este controlador, simplemente importarlo.
 * Esto permite tratar el archivo route de forma mucho más limpia no siendo necesario definir la clase UserRoute sino tratando el archivo casi como si de 
 * un archivo de constantes se tratase ya que no tiene lógica adicional más que el enrutamiento de la llamada al métido correspondiente.
 * 
 * 
 */
class AuthController {

    /**
     * [C]
     * Register User / CREATE
     * 
     * @param req 
     * @param res 
     */
    static async register(req: Request, res: Response) {
        const userDto: UserCreateDto = req.body;
        try {
            const authService = new AuthService();
            const authResponse: AuthResponseDto = await authService.register(userDto);
            if (authResponse) {
                return res.json({
                    method: 'register',
                    authResponse
                })
            } else {
                throw new ApplicationError("Not able to register", 500);
            }
        } catch (e) {
            ErrorsService.manageErrors(e, res);
        }
    }

    /**
     * [U]
     * UPDATE / Change password
     * 
     * @param req 
     * @param res 
     */
    static async changePassword(req: Request, res: Response) {
        const userDto: ChangePasswordDto = req.body;
        try {
            const authService = new AuthService();
            const authResponse = await authService.changePassword(userDto);
            if (authResponse) {
                return res.json({
                    method: 'changePassword',
                    authResponse
                })
            } else {
                throw new ApplicationError("Not able to change password", 500);
            }
        } catch (e) {
            ErrorsService.manageErrors(e, res);
        }
    }



    /**
     * Login User / LOGIN
     * 
     * @param req 
     * @param res 
     */
    static async login(req: Request, res: Response) {
        const usearAuthDto: AuthRequestDto = req.body;
        try {
            const authService = new AuthService();
            const authResponse: AuthResponseDto = await authService.login(usearAuthDto);
            if (authResponse) {
                res.json({
                    method: 'login',
                    authResponse
                })
            } else {
                throw new ApplicationError("Not able to login", 500);
            }
        } catch (e) {
            ErrorsService.manageErrors(e, res);
        }
    }



    /**
     * Validate token / VALIDATE TOKEN
     * 
     * @param req 
     * @param res 
     */
    static async validateToken(req: Request, res: Response) {
        const token: string = req.body.token;
        try {
            const authService = new AuthService();
            const authenticatedUser: UserResponseDto = await authService.validateTokenJWT(req, res, token);
            console.log("------------------------------------------------------------------------------------------------------------------------------------------");
            console.log("AUTENTICATED USER", authenticatedUser);
            if (authenticatedUser) {
                console.log("AUTHENTICATED");
                // res.json({
                //     method: 'validateToken',
                //     authenticated: true,
                //     user: authenticatedUser
                // })
                res.json(authenticatedUser);
            }
            // } else {
            //     console.log("NOT_AUTHENTICATED");
            //     res.status(401).json({
            //         method: 'validateToken',
            //         authenticated: false,
            //     })
            //     // throw new ApplicationError("Unauthorized", 401);
            // }
        } catch (e) {
            ErrorsService.manageErrors(e, res);
        }
    }
}

export default AuthController;

