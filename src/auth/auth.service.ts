import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService, private jwtService: JwtService) { }

    async validateUser(email: string, password: string) {
        // const user = await this.userService.findByEmail(email);
        // if (!user)
        //     throw new HttpException('user not found', HttpStatus.UNAUTHORIZED);

        // const isPasswordMatch = await compare(password, user.password);
        // if (!isPasswordMatch)
        //     throw new HttpException('invalid credential', HttpStatus.UNAUTHORIZED);
        // return user;
    }

    async validateLogin(user: any) {
        const payload = { sub: user.id };
        return {
            access_token: this.jwtService.sign(payload, { secret: process.env.JWT_SECRET })
        }
    }

}
