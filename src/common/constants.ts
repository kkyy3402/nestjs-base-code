import { ApiMessage } from './interfaces/api-message';

export const ApiMessages: { [key: string]: ApiMessage } = {
  USER_NOT_FOUND: { code: 1000, message: '유저를 찾을 수 없습니다.' },
  NOT_EXIST_ITEM: { code: 1001, message: '존재하지 않는 게시물입니다.' },
  SUCCESS: { code: 1002, message: '성공' },
  INVALID_REQUEST: { code: 1003, message: '잘못된 요청입니다.' },
  UNAUTHORIZED: { code: 1004, message: '인증되지 않았습니다.' },
  FORBIDDEN: { code: 1005, message: '접근이 거부되었습니다.' },
  ITEM_CREATED_SUCCESSFULLY: {
    code: 1006,
    message: '게시물이 성공적으로 생성되었습니다.',
  },
  ITEM_UPDATED_SUCCESSFULLY: {
    code: 1007,
    message: '게시물이 성공적으로 업데이트되었습니다.',
  },
  ITEM_DELETED_SUCCESSFULLY: {
    code: 1008,
    message: '게시물이 성공적으로 삭제되었습니다.',
  },
  INTERNAL_SERVER_ERROR: {
    code: 1009,
    message: '서버 내부 오류가 발생했습니다.',
  },
  BAD_REQUEST: { code: 1010, message: '유효하지 않은 요청입니다.' },
  ITEM_ALREADY_EXISTS: { code: 1011, message: '이미 존재하는 게시물입니다.' },
  OPERATION_COMPLETED_SUCCESSFULLY: {
    code: 1012,
    message: '작업이 성공적으로 완료되었습니다.',
  },
  PASSWORD_UPDATE_SUCCESS: {
    code: 1013,
    message: '비밀번호가 성공적으로 업데이트되었습니다.',
  },
  EMAIL_ALREADY_IN_USE: { code: 1014, message: '이미 사용 중인 이메일입니다.' },
  EXPIRED_TOKEN: { code: 1015, message: '토큰이 만료되었습니다.' },
  UNKNOWN: { code: 9999, message: '알 수 없는 에러가 발생하였습니다' },
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
