import { green, yellow } from "chalk";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { TcpContext } from "@nestjs/microservices";

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const req = context.switchToRpc().getContext<TcpContext>();
    const method = req.getPattern();
    const data = req.getArgs();

    console.log(yellow("Request"), { method, data });

    return next.handle().pipe(
      tap((d) => {
        console.log(green("Response"), { duration: Date.now() - now, d });
      })
    );
  }
}
