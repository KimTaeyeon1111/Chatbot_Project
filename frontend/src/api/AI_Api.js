// src/api/ai_Api.js
import { protectedApi, TokenManager } from './User_Api';

// ===== 1. 챗봇 인트로 + 히스토리 로드 =====
export const getIntroAndHistory = async (aiType) => {
  try {
    if (!TokenManager.isLoggedIn()) {
      throw new Error('로그인 후 이용해주세요.');
    }

    const response = await protectedApi.get(`/ai/aa/${aiType}`);
    if (!response.data.status === "success") {
      throw new Error(response.data.message || '챗봇 정보를 불러올 수 없습니다.');
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ===== 2. 메시지 전송 =====
export const sendMessage = async (aiType, message) => {
  try {
    if (!TokenManager.isLoggedIn()) {
      throw new Error('로그인 후 이용해주세요.');
    }
    if (!message?.trim()) {
      throw new Error('메시지가 비어있습니다.');
    }

    const response = await protectedApi.post(`/ai/aa/${aiType}/ask`, { message });
    if (!response.data.status === "success" && !response.data.response) {
      throw new Error(response.data.message || '메시지 전송 실패');
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ===== 3. 리포트 생성 =====
export const generateReport = async (aiType) => {
  try {
    if (!TokenManager.isLoggedIn()) {
      throw new Error('로그인 후 이용해주세요.');
    }

    const response = await protectedApi.get(`/ai/aa/${aiType}/report`);
    if (!response.data.report) {
      throw new Error(response.data.message || '리포트 생성 실패');
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};
