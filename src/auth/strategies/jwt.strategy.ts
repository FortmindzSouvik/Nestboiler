import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";
import { ConfigType } from "@nestjs/config";
import jwtConfig from "../config/jwt.config";

export class JWTStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService, private readonly jwtConfiguration: ConfigType<typeof jwtConfig>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConfiguration.secret,
        })
    }

    validate(user: any) {
        return this.authService.validateLogin(user);
    }
}