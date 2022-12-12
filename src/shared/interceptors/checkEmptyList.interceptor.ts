import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class CheckEmptyListInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data: any) => {
        if (!data.length) {
          context.switchToHttp().getResponse().status(HttpStatus.NO_CONTENT);
        } else {
          return data;
        }
      }),
    );
  }
}
