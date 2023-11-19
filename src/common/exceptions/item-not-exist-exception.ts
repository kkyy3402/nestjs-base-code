import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiMessages } from '../constants';

export class ItemNotExistException extends HttpException {
  constructor() {
    super(ApiMessages.NOT_EXIST_ITEM, HttpStatus.NOT_FOUND);
  }
}
