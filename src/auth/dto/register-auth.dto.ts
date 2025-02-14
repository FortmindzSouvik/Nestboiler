import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { isString } from 'lodash';

export class RegisterDto {

    @IsString()
    readonly fullName: string;

    @IsNotEmpty()
    @IsString()
    readonly username: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password: string;
}