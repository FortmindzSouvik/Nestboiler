import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local-auth.guard';
import { JWTGuard } from './guards/jwt.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Request() req) {
    const accessToken = await this.authService.validateLogin(req.user);
    const res = {
      ...req.user,
      ...accessToken,
    }
    return res;
  }
}
