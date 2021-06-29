import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { CustomExpressRequest } from "src/types/CustomExpressRequest";

@Injectable()
export class AuthGurad implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest<CustomExpressRequest>();
        if(!request.user) throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
        return true;
    }

}