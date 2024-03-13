export interface UserUpdateDto {

    name: string;
    email: string;
    status: boolean;
    password: string;
    updatedAt: Date;
    roleId: any;
    Roles: [];

}