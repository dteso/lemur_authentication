/* eslint-disable @typescript-eslint/no-explicit-any */
import UserService from "./user.service";
import AppValidator from "../api/middlewares/app-validator";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { ApplicationError } from "../core/application.error.dto";
import { UserCreateDto } from "../dal/dtos/user/user-create.dto";
import { AuthRequestDto } from "../dal/dtos/auth/auth-request.dto";
import { AuthResponseDto } from "../dal/dtos/auth/auth-response.dto";
import { UserResponseDto } from "../dal/dtos/user/user-response.dto";
import { NextFunction } from "express";
import RoleService from "./role.service";
import { ChangePasswordDto } from "../dal/dtos/auth/change-password-dto";
import { UserUpdateDto } from "../dal/dtos/user/user-update.dto";

class AuthService {

    userService = new UserService();
    roleService = new RoleService();

    /**
     * Register
     * 
     * @param body 
     * @param res 
     * @returns 
     */
    async register(body: UserCreateDto): Promise<AuthResponseDto> {

        const { email, name, password, roleId } = body;
        let result: AuthResponseDto;
        try {
            const searchParam = email || name;
            if (!searchParam) {
                throw new ApplicationError('Not a valid email or username param.', 500);
            }
            const userDb = await this.userService.getUserByNameOrEmail(searchParam);
            if (userDb) {
                throw new ApplicationError('User is already registered in system', 400);
            }
            const usersCount = (await this.userService.getAllUsers()).length;
            if (usersCount !== 0) {
                const roleName = (await this.roleService.getRole(roleId)).name;
                if (roleName === 'ADMIN_ROLE')
                    throw new ApplicationError("You can't assign yourself an admin role", 403);
            }
            const salt = bcrypt.genSaltSync();
            const encryptedPass = bcrypt.hashSync(password, salt);
            body.password = encryptedPass;
            const user: UserResponseDto = await this.userService.createUser(body);
            const token = await this.generateJWT(user);
            result = {
                user,
                token
            };
            return result;
        } catch (error: any) {
            throw new ApplicationError(error.message, error.httpStatus);
        }
    }

    /**
     * Login
     * 
     * @param body 
     * @param res 
     * @returns 
     */
    async login(body: AuthRequestDto): Promise<AuthResponseDto> {
        const { email, name, password } = body;
        let result: AuthResponseDto;
        try {
            const searchParam = email || name;
            if (!searchParam) {
                throw new ApplicationError('Not a valid email or username param.', 500);
            }
            const userDb = await this.userService.getUserByNameOrEmail(searchParam);
            if (!userDb) {
                throw new ApplicationError('User is not registered in system', 404);
            }
            const validPassword = bcrypt.compareSync(password, userDb.password);
            if (!validPassword) {
                throw new ApplicationError("Not a valid password", 401);
            }
            const user = await this.userService.mapToResponse(userDb);
            const token = await this.generateJWT(user);
            result = {
                user,
                token
            };
            return result;
        } catch (error: any) {
            throw new ApplicationError(error.message, error.httpStatus);
        }
    }


    /**
     * This method generates a jwt token based on the environment configured secret
     * 
     * @param id 
     * @returns 
     */
    generateJWT(userDB: UserResponseDto): Promise<unknown> {
        return new Promise((resolve, reject) => {
            const payload = {
                userDB,
            }
            jwt.sign(payload, process.env.JWT_SECRET || '', {
                expiresIn: '12h'
            }, (err: unknown, token: unknown) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(token);
                }
            });
        });
    }


    /**
 * This method generates a jwt token based on the environment configured secret
 * 
 * @param id 
 * @returns 
 */
    async changePassword(data: ChangePasswordDto): Promise<unknown> {
        const userId = data.userId;
        let result: AuthResponseDto;
        try {
            if (data.newPassword !== data.newPasswordConfirmed) {
                throw new ApplicationError('Password and its confimation must be equals.', 422);
            }
            const searchParam = userId;
            if (!userId) {
                throw new ApplicationError('Not an id was informed.', 500);
            }
            const userDb = await this.userService.getUserDB(searchParam);
            if (!userDb) {
                throw new ApplicationError('User is not registered in system', 404);
            }
            const validPassword = bcrypt.compareSync(data.currentPassword, userDb.password);
            if (!validPassword) {
                throw new ApplicationError("Not a valid current password", 401);
            }
            const salt = bcrypt.genSaltSync();
            const encryptedPass = bcrypt.hashSync(data.newPassword, salt);
            const updateBody: UserUpdateDto = {
                name: userDb.name,
                email: userDb.email,
                password: encryptedPass,
                status: userDb.status,
                updatedAt: new Date(),
                roleId: userDb.roleId,
                Roles: userDb.roles
            }
            const updatedUser = await this.userService.updateUser(userId, updateBody);
            const token = await this.generateJWT(updatedUser);
            result = {
                user: updatedUser,
                token
            };
            return result;
        } catch (error: any) {
            throw new ApplicationError(error.message, error.httpStatus);
        }
    }



    validateJWT(req: any, res: any, next: any): void {
        const token = req.header('authorization');
        if (!token) {
            return res.status(401).json({
                ok: false,
                msg: 'Does not exist token'
            })
        }
        try {
            const cleanToken = token.replace("Bearer ", "")
            const claims: any = jwt.verify(cleanToken, process.env.JWT_SECRET || '');
            req.user = claims.userDB; //Se inyecta en la petición que será la que finalmente llegará al controlador con el req modificado
            next();
        } catch (err) {
            return res.status(401).json({
                ok: false,
                msg: 'Not a valid token'
            })
        }
    }


    async validateTokenJWT(req: any, res: any, token: any): Promise<any> {
        if (!token) {
            return res.status(401).json({
                ok: false,
                msg: 'Does not exist token'
            })
        }
        try {
            const cleanToken = token.replace("Bearer ", "");
            const claims: any = jwt.verify(cleanToken, process.env.JWT_SECRET || '');
            return this.userService.mapToResponse(claims.userDB);
        } catch (err) {
            res.status(401).json({
                ok: false,
                msg: 'Not a valid token'
            })
        }
    }

    async validateUser(req: any, res: any, next: NextFunction) {
        const { name, email, password, status, roleId } = req.body;
        const errors = [];
        const nameValidationResult = await AppValidator.validateName(req, res, name);
        const emailValidationResult = await AppValidator.validateEmail(req, res, email);
        const passwordValidationResult = await AppValidator.validatePassword(req, res, password);
        const statusValidationResult = await AppValidator.validateStatus(req, res, status);
        const roleValidationResult = await AppValidator.validateIsNumber(req, res, roleId);
        errors.push(
            ...nameValidationResult,
            ...emailValidationResult,
            ...passwordValidationResult,
            ...statusValidationResult,
            ...roleValidationResult
        );
        if (errors.length) {
            return res.status(422).json({
                ok: !(errors.length > 0), // true if any error
                errors
            })
        }
        next();
    }

    async validateLogin(req: any, res: any, next: NextFunction) {
        const { name, email, password } = req.body;
        const errors = [];
        let nameValidationResult: any[] = [];
        let emailValidationResult: any[] = [];
        if (name) {
            nameValidationResult = await AppValidator.validateName(req, res, name);
        }
        if (email) {
            emailValidationResult = await AppValidator.validateEmail(req, res, email);
        }
        if (!name && !email) {
            errors.push({
                field: '[name, email]',
                errorMessage: 'A name or email is necessary.'
            });
        }
        const passwordValidationResult = await AppValidator.validatePassword(req, res, password);
        errors.push(
            ...nameValidationResult,
            ...emailValidationResult,
            ...passwordValidationResult,
        );
        if (errors.length) {
            return res.status(422).json({
                ok: !(errors.length > 0), // true if any error
                errors
            })
        }
        next();
    }

    async validateRequiredToken(req: any, res: any, next: NextFunction) {
        const { token } = req.body;
        const errors = [];
        const tokenValidationResult = await AppValidator.validateRequired(req, res, 'token', token);
        errors.push(...tokenValidationResult);
        if (errors.length) {
            return res.status(422).json({
                ok: !(errors.length > 0), // true if any error
                errors
            })
        }
        next();
    }
}

export default AuthService;