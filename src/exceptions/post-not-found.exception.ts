import { HttpException, HttpStatus } from "@nestjs/common";

export class PostNotFoundException extends HttpException {
  constructor(message?: string, status?: number) {
    super(message || 'Post was not found', status || HttpStatus.BAD_REQUEST);
  }
}