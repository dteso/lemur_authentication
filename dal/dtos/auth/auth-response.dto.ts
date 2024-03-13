import { UserResponseDto } from "../user/user-response.dto";

export interface AuthResponseDto {

    user: UserResponseDto;
    token: unknown;

}