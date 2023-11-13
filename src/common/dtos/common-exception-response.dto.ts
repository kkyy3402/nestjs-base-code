export class ExceptionResponseDto {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string | object;
}
