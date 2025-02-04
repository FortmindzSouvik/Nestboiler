import { IsEmail, IsNotEmpty } from "class-validator";
import { Unit } from "src/unit/schema/units.schema";

export class CreateUserDto {

    fullName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    unitId: Unit

}
