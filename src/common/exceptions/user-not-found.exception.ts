import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiMessages } from '../constants';

export class UserNotFoundException extends HttpException {
  constructor() {
    super(ApiMessages.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}
