import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UsersService } from "src/api/v1/users/services/users.service";



@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super();
  }

  async validate(email: string, password: string): Promise<any> {
    const user = this.usersService.getUserByEmail(email);

    if (!user) {
      return new UnauthorizedException();
    }
  }
}