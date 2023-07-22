import { Controller, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from './decorators/user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // we use the same endpoint for login and signup because we want to keep the API simple
  // and it is the same thing from the client's perspective
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@User() user: UserEntity): Promise<{ accessToken: string }> {
    return this.authService.getAccessTokenForUser(user);
  }
}
