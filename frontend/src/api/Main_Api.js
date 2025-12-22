// src/api/Main_Api.js
import { publicApi } from "./User_Api";

export const MainSummary = async () => {
  try {
    const response = await publicApi.get("/main/summary");
    return response.data;
  } catch (error) {
    console.error("메인 데이터 로드 실패:", error);
    return { success: false, notice: [], basic_ai: [] };
  }
};
