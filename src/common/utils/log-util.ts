export const printLog = (message: string) => {
  const env = process.env.NODE_ENV || 'development'; // NODE_ENV가 없다면 'development'로 간주

  if (env === 'development') {
    console.log(message);
  }
  // 프로덕션 환경에서는 아무것도 출력하지 않습니다.
};
