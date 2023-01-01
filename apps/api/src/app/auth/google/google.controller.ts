import {Body, Controller, Get, Post, Request, UseGuards, UseInterceptors} from "@nestjs/common";
import {GoogleService} from "./google.service";
import {GoogleGuard} from "./google.guard";
import {Public} from "../jwt/jwt.decorator";
import { LoginInterceptor } from "../auth.interceptor";
import {ApiOperation, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {QueryParamsGoogleLoginRedirect} from "@count-of-money/documentation";
import {GoogleLoginBody} from "@count-of-money/shared";

@Controller('auth/google')
@ApiTags('Authentification')
export class GoogleController {

  constructor(private googleService: GoogleService) {
  }

  @Public()
  @Get()
  @Post()
  @UseGuards(GoogleGuard)
  @ApiResponse({status: 302, description: 'Redirect to google login popup'})
  public login() {
    // working with guards
  }

  @Public()
  @Get('redirect')
  @UseGuards(GoogleGuard)
  @UseInterceptors(LoginInterceptor)
  @ApiResponse({status: 200, description: 'Login successful to google'})
  @ApiQuery({type: QueryParamsGoogleLoginRedirect})
  @ApiOperation({description: 'WARNING ! \nYou should call /auth/google before using this route and redirect all uri query response parameters here'})
  public redirect(@Request() req) {
    return this.googleService.login(req);
  }

  @Public()
  @Post('login')
  public loginWithToken(@Body() body: GoogleLoginBody) {
    return this.googleService.loginWithToken(body);
  }

}
