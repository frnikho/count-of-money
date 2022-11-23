import {Controller, Get, Post, Request, UseGuards, UseInterceptors} from "@nestjs/common";
import {GoogleService} from "./google.service";
import {GoogleGuard} from "./google.guard";
import {Public} from "../jwt/jwt.decorator";
import { LoginInterceptor } from "../auth.interceptor";

@Controller('auth/google')
export class GoogleController {

  constructor(private googleService: GoogleService) {
  }

  @Public()
  @Get()
  @Post()
  @UseGuards(GoogleGuard)
  public login() {
    // working with guards
  }

  @Public()
  @Get('redirect')
  @UseGuards(GoogleGuard)
  @UseInterceptors(LoginInterceptor)
  public redirect(@Request() req) {
    return this.googleService.login(req);
  }

}
