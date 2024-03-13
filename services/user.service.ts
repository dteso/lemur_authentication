/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApplicationError } from "../core/application.error.dto";
import { UserCreateDto } from "../dal/dtos/user/user-create.dto";
import { UserDto } from "../dal/dtos/user/user-dto";
import { UserResponseDto } from "../dal/dtos/user/user-response.dto";
import { UserUpdateDto } from "../dal/dtos/user/user-update.dto";
import UserRepository from "../dal/repositories/user.repository";
import RoleService from "./role.service";


class UserService {

    private userRepository = new UserRepository();
    private roleService = new RoleService();

    /**
     * Creates a new user y does not already exists
     * 
     * @param body 
     * @returns 
     */
    async createUser(body: UserCreateDto): Promise<UserResponseDto> {
        const user = await this.userRepository.createUser(body);
        if (!user) {
            throw new ApplicationError('error creating user', 500);
        }
        return await this.mapToResponse(user);
    }

    /**
     * Retrieves all users in db
     * 
     * @returns 
     */
    async getAllUsers(): Promise<UserResponseDto[]> {
        const usersResponse: UserResponseDto[] = [];

        const users = await this.userRepository.getAllUsers();
        if (users) {
            users.forEach(async (user: UserDto) => {
                const userRes = await this.mapToResponse(user);
                usersResponse.push(userRes);
            })

        }
        return usersResponse;
    }

    /**
     * Retreives the specified user througth the identifier id
     * 
     * @param id 
     * @returns 
     */
    async getUser(id: number): Promise<UserResponseDto> {
        const user = await this.userRepository.getUserById(id);
        if (!user) {
            throw new ApplicationError('Not user found by Id', 404);
        }
        return await this.mapToResponse(user);
    }

    /**
 * Retreives the specified user througth the identifier id
 * 
 * @param id 
 * @returns 
 */
    async getUserDB(id: number): Promise<any> {
        const user = await this.userRepository.getUserById(id);
        if (!user) {
            throw new ApplicationError('Not user found by Id', 404);
        }
        return await user;
    }


    /**
     * Updates the specifier user by the identifier (id) if exists
     * 
     * @param id 
     * @param body 
     * @returns 
     */
    async updateUser(id: number, body: UserUpdateDto): Promise<UserResponseDto> {
        const user = await this.userRepository.updateUser(id, body);
        if (!user) {
            throw new ApplicationError('Not user found by Id', 404);
        }
        return await this.mapToResponse(user);
    }

    /**
     * Removes the user by the id specified if exists
     * 
     * @param id 
     * @returns 
     */
    async deleteUser(id: number): Promise<UserResponseDto> {
        const user = await this.userRepository.deleteUser(id);
        if (!user) {
            throw new ApplicationError('Not user found by Id', 404);
        }
        return await this.mapToResponse(user);
    }

    /**
     * Allows to assign Role to an specified user by his identifier
     * 
     * @param userId 
     * @param roleId 
     * @returns 
     */
    async assignRoleToUserUsingIds(userId: number, roleId: number) {
        const user = await this.getUserDb(userId);
        if (!user) {
            throw new ApplicationError('Not found user by id to assign role', 404);
        }
        const role = await this.roleService.getRole(roleId);
        if (!role) {
            throw new ApplicationError('Not role found by for user assignation', 404);
        }
        await user.setRole(role);
        // await user.addRole(role); In case we were using a many to many user-roles relationship
        return await this.updateUser(userId, user);
    }


    /**
     * Checks if argument is an username or an email (unique values) and retrieves the belonged user
     * 
     * @param userOrEmail 
     * @returns 
     */
    async getUserByNameOrEmail(userOrEmail: string) {
        return userOrEmail.indexOf('@') > -1 ?
            this.userRepository.getUserByEmail(userOrEmail)
            : this.userRepository.getUserByUsername(userOrEmail);
    }

    /**
     * User Response Mapper
     * 
     * @param user 
     * @returns 
     */
    async mapToResponse(user: UserDto | any) {
        try {
            const userRole = user.Role || user.role ?
                user.Role || user.role
                : await this.roleService.getRole(user.roleId);
            if (user.password !== null && user.password !== undefined) {
                delete user.password;
            }
            const userRes: UserResponseDto = {
                id: user.id,
                name: user.name,
                email: user.email,
                status: user.status,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                role: userRole,
                roleId: userRole.id
            }
            return userRes;
        } catch (e) {
            throw new ApplicationError('Failed to map roles: ' + e, 422);
        }

    }

    /**
     * Gets user directly from db without any mapping or transformation
     * @param id 
     */
    async getUserDb(id: number) {
        const user = await this.userRepository.getUserById(id);
        if (!user) {
            throw new ApplicationError('Not user found by Id', 404);
        }
        return user;
    }

}

export default UserService;