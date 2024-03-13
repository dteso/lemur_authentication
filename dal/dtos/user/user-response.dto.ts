/* eslint-disable @typescript-eslint/no-explicit-any */
export interface UserResponseDto {
    id: number;
    name: string;
    email: string;
    status: boolean;
    role: any;
    roleId: any;
    // roles: []; // When role-user many to many relatios exists
    createdAt: any;
    updatedAt: any;
}