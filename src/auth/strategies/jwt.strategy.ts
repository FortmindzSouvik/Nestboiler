import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET

        })
        console.log('strategyyyy', process.env.JWT_SECRET);

    }

    async validate(payload: any) {
        console.log('strategy', process.env.JWT_SECRET);
        return await this.userService.findUserById(payload.sub);

    }
}