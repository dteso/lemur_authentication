export interface ChangePasswordDto {
    userId: number;
    currentPassword?: any;
    newPassword?: string;
    newPasswordConfirmed: string;

}