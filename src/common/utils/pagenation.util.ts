import { PaginationParams } from '../interfaces/pagenation-params';

export const applyPagination = (
  queryBuilder,
  paginationParams: PaginationParams,
) => {
  const { page, pageSize } = paginationParams;
  queryBuilder.skip((page - 1) * pageSize).take(pageSize);
};
