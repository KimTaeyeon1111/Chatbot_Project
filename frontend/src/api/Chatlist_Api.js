// src/api/Chatlist_Api.js
import { protectedApi, TokenManager } from "./User_Api";

export const GetLastChat = async () => {
  try {
    const userId = await TokenManager.getUserId();

    if (!userId) {
      return { last_chats: [] };
    }
    const response = await protectedApi.get(`/${userId}/last-chats`);
    return response.data;
  } catch (error) {
    return { last_chats: [] };
  }
};

export const GetRoomMessages = async (useboxId) => {
  try {
    const userId = await TokenManager.getUserId();

    if (!userId) {
      return { success: false, messages: [] };
    }

    const response = await protectedApi.get(`/${userId}/chats/${useboxId}/messages`);
    return response.data;
  } catch (error) {
    return { success: false, messages: [] };
  }
};
