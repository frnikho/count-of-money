import {Body, Request, Controller, Post, UseGuards, UseInterceptors, HttpCode} from "@nestjs/common";
import {ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {LoginBody, RegisterBody, User} from "@count-of-money/shared";
import {AuthService} from "./auth.service";
import {LoginInterceptor, RegisterInterceptor} from "./auth.interceptor";
import {NativeGuard} from "./native/native.guard";
import { Public } from "./jwt/jwt.decorator";
import {ResponseError} from "@count-of-money/documentation";

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
  @ApiOkResponse({description: 'Successfully logged in'})
  @ApiBadRequestResponse({description: 'An error occurred ! (bad password field/bad email field )', type: ResponseError})
  @ApiForbiddenResponse({description: 'Missing body parameters !', type: ResponseError})
  @ApiBody({type: LoginBody, description: 'Login body'})
  public login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('register')
  @HttpCode(201)
  @UseInterceptors(new RegisterInterceptor())
  @ApiCreatedResponse({description: 'User created', type: User})
  @ApiBadRequestResponse({description: 'Bad Request', type: ResponseError})
  public register(@Body() body: RegisterBody): Promise<User> {
    return this.authService.register(body);
  }
}
