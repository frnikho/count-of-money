import {Body, Request, Controller, Post, UseGuards, UseInterceptors, HttpCode} from "@nestjs/common";
import {ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {Exception, RegisterBody, User} from "@count-of-money/shared";
import {AuthService} from "./auth.service";
import {LoginInterceptor, RegisterInterceptor} from "./auth.interceptor";
import {NativeGuard} from "./native/native.guard";
import { Public } from "./jwt/jwt.decorator";

@Controller('auth')
@ApiTags('Authentification')
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @Public()
  @Post('login')
  @HttpCode(200)
  @UseGuards(NativeGuard)
  @UseInterceptors(new LoginInterceptor())
  @ApiOkResponse()
  public login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('register')
  @HttpCode(201)
  @UseInterceptors(new RegisterInterceptor())
  @ApiCreatedResponse({description: 'User created', type: User})
  @ApiBadRequestResponse({description: 'Bad Request', type: Exception})
  public register(@Body() body: RegisterBody): Promise<User> {
    return this.authService.register(body);
  }
}
