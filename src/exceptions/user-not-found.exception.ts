import { HttpException, HttpStatus } from "@nestjs/common";

export class UserNotFoundException extends HttpException {
  constructor(message?: string, status?: number) {
    super(message || 'User was not found', status || HttpStatus.BAD_REQUEST);
  }
}