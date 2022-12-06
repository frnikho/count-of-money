import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common";
import {map, Observable} from "rxjs";
import {take} from "@count-of-money/utils";
import {User} from '.prisma/client';

@Injectable()
export class UserInterceptor implements NestInterceptor<User> {
  intercept(context: ExecutionContext, next: CallHandler<User>): Observable<User> | Promise<Observable<User>> {
    return next.handle().pipe(map(data => take(data, ['lastname', 'email', 'firstname', 'id', 'role'])));
  }
}
