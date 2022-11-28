import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common";
import {LoginResponse, User} from "@count-of-money/shared";
import {map, Observable} from "rxjs";
import {take} from "@count-of-money/utils";

@Injectable()
export class RegisterInterceptor implements NestInterceptor<User> {
  intercept(context: ExecutionContext, next: CallHandler<User>): Observable<User> | Promise<Observable<User>> {
    return next.handle().pipe(map(data => take(data, ['lastname', 'email', 'firstname', 'id'])));
  }
}

@Injectable()
export class LoginInterceptor implements NestInterceptor<LoginResponse> {
  intercept(context: ExecutionContext, next: CallHandler<LoginResponse>): Observable<unknown> | Promise<Observable<unknown>> {
    return next.handle().pipe(map(data => ({
      accessToken: data.accessToken,
      user: take(data.user, ['email', 'id', 'firstname', 'lastname', 'createdAt', 'updatedAt']),
    })));
  }
}
