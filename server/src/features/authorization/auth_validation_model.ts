import { IsString } from "class-validator";

export class AuthValidationModel {
    @IsString()
    email: string;
    @IsString()
    password: string;
}