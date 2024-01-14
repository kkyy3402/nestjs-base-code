import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiMessages } from '../constants';

export class TokenExpiredException extends HttpException {
  constructor() {
    super(ApiMessages.EXPIRED_TOKEN, HttpStatus.UNAUTHORIZED);
  }
}
