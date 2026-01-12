// AI_Detail_Api.js
import { protectedApi, TokenManager } from './User_Api';



//ai정보 조회 Api
export const fetchAiDetail = async (aiId) => {
    const token = localStorage.getItem('authToken');
    const url = token ? `/ai/${aiId}` : `/ai/public/${aiId}`;

    const response = await protectedApi.get(url);
  return response.data;
};

//리뷰 생성 Api
export const createReview = async (aiId, reviewText) => {
  if (!TokenManager.isLoggedIn()) {
    throw new Error('로그인이 필요합니다.');
  }
  const response = await protectedApi.post(`/ai/${aiId}/review`, {
    review_write: reviewText
  });
  return response.data;
};

//리뷰삭제 Api
export const deleteReview = async (aiId, reviewId) => {
  if (!TokenManager.isLoggedIn()) {
    throw new Error('로그인이 필요합니다.');
  }
  const response = await protectedApi.delete(`/ai/${aiId}/review/${reviewId}`);
  return response.data;
};

//usebox 생성 Api
export const createUseBoxDetail = async (aiId) => {
    return protectedApi.post(`/ai/${aiId}/usebox`);
};