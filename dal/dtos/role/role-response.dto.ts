/* eslint-disable @typescript-eslint/no-explicit-any */
export interface RoleResponseDto {

    id: number;
    name: string;
    description?: string;
    permissions: any[];

}