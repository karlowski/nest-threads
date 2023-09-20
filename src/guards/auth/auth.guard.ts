import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeaders(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const response = await this.jwtService.verifyAsync(
        token,
        {
          secret: 'asd'
        }
      );

      request['user'] = { id: response.id, username: response.username, email: response.email };
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeaders(request: Request): string | null {
    const [role, token] = request.headers.authorization?.split(' ') || [];
    return role === 'Bearer' ? token : null;
  }
}
