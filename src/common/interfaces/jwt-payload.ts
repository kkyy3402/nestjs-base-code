export interface JwtPayload {
  sub: number; // userId
  username: string; // 사용자 이름
  roles?: string[]; // 사용자 역할
  iat?: number; // 토큰 발행 시간
  exp?: number; // 토큰 만료 시간
}
