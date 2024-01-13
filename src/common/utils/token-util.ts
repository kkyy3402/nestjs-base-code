export const getIsTokenExpired = (exp: number): boolean => {
  const currentTime = Math.floor(Date.now() / 1000); // 현재 시간 (초 단위)
  return exp <= currentTime; // 만료 시간이 현재 시간보다 이전인 경우 만료된 것으로 처리
};
