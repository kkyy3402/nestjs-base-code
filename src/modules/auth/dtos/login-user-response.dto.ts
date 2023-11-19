//accessToken: string; refreshToken: string

export class LoginUserResponseDto {
  accessToken: string;
  refreshToken: string;

  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  static from(accessToken: string, refreshToken: string) {
    return new LoginUserResponseDto(accessToken, refreshToken);
  }
}
