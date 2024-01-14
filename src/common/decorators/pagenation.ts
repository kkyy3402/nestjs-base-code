import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PaginationParams } from '../interfaces/pagenation-params';

const DEFAULT_PAGENATION_SIZE = 20;

export const Pagination = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): PaginationParams => {
    const request = ctx.switchToHttp().getRequest();
    const page = parseInt(request.query.page, DEFAULT_PAGENATION_SIZE) || 1;
    const pageSize =
      parseInt(request.query.pageSize, DEFAULT_PAGENATION_SIZE) ||
      DEFAULT_PAGENATION_SIZE;
    return { page, pageSize };
  },
);
