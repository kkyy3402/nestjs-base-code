import { PaginationParams } from '../interfaces/pagination-params';

export const applyPagination = (
  queryBuilder,
  paginationParams: PaginationParams,
) => {
  const { page, pageSize } = paginationParams;
  queryBuilder.skip((page - 1) * pageSize).take(pageSize);
};
