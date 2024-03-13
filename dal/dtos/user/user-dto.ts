import Role from "../../models/role.model";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface UserDto {

    id: number;
    name: string;
    email: string;
    password: string;
    Role: Role;
    RoleId?: string;
    // Roles: []; // When role-user many to many relatios exists
    status: boolean;
    createdAt: any;
    updatedAt: any;

}