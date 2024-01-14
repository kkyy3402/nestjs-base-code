export const ApiMessages = {
  USER_NOT_FOUND: '유저를 찾을 수 없습니다.',
  NOT_EXIST_ITEM: '존재하지 않는 게시물입니다.',
  SUCCESS: '성공',
  INVALID_REQUEST: '잘못된 요청입니다.',
  UNAUTHORIZED: '인증되지 않았습니다.',
  FORBIDDEN: '접근이 거부되었습니다.',
  ITEM_CREATED_SUCCESSFULLY: '게시물이 성공적으로 생성되었습니다.',
  ITEM_UPDATED_SUCCESSFULLY: '게시물이 성공적으로 업데이트되었습니다.',
  ITEM_DELETED_SUCCESSFULLY: '게시물이 성공적으로 삭제되었습니다.',
  INTERNAL_SERVER_ERROR: '서버 내부 오류가 발생했습니다.',
  BAD_REQUEST: '유효하지 않은 요청입니다.',
  ITEM_ALREADY_EXISTS: '이미 존재하는 게시물입니다.',
  OPERATION_COMPLETED_SUCCESSFULLY: '작업이 성공적으로 완료되었습니다.',
  PASSWORD_UPDATE_SUCCESS: '비밀번호가 성공적으로 업데이트되었습니다.',
  EMAIL_ALREADY_IN_USE: '이미 사용 중인 이메일입니다.',
  UNKNOWN: '알 수 없는 에러가 발생하였습니다',
};

export enum TokenStatus {
  Valid, // 유효한 토큰
  Expired, // 유효기간이 지난 토큰
  Invalid, // 유효하지 않은 토큰
}

export const roles = {
  admin: 'Admin',
  user: 'User',
  manager: 'Manager',
};

export const platformTypes = {
  kakao: 'Kakao',
  google: 'Google',
};

export const roleNames: string[] = Object.values(roles);
export const platformTypeNames: string[] = Object.values(platformTypes);
