import { HttpException, HttpStatus } from "@nestjs/common";

export class EntitiesNotFoundException extends HttpException {
  constructor(message?: string, status?: number) {
    super(message || 'Entities were not found', status || HttpStatus.BAD_REQUEST);
  }
}