export class CreateMemoDto {
  content: string;

  // 여기서는 user의 ID를 받는다고 가정합니다. 실제로는 사용자 인증을 통해 얻을 수도 있습니다.
  userId: number;
}
