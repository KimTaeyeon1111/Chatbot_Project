// src/api/Notice_Api.js
import { protectedApi,publicApi } from "./User_Api";  // ← protectedApi!

export const Notice_Api = async (noticeData) => {
  try {
    const response = await protectedApi.post("notices", noticeData);
    return response.data;
  } catch (error) {
    console.error("notice 등록 실패:", error);
    return { success: false };
  }
};

export const getNotices = async () => {
  const response = await publicApi.get("notices");  // 읽기는 public
  return response.data;
};
