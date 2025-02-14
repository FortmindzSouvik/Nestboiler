import { IsEmail, IsNotEmpty } from "class-validator";


export class CreateUserDto {

    fullName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;



}
