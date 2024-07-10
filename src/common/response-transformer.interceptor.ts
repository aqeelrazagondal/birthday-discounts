import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  statusCode: number;
  message: string;
  data: T;
}

@Injectable()
export class ResponseTransformer<T> implements NestInterceptor<T, Response<T>> {
  /**
   * Intercepts the response and transforms it into a standard response object
   * @param context
   * @param next
   */
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => ({
        statusCode: context.switchToHttp().getResponse().statusCode,
        // if data is a string, return that string in message property,
        // else return 'success'
        message: (typeof data === 'string' && data) || 'Request Successful',
        data: data?.data ? data.data : data || {},
      })),
    );
  }
}
