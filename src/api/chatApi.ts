import axios from "axios";
import axiosInstance from "./axiosInstance";

// Get All Chats
export const getAllChats = async () => {
  try {
    const response = await axiosInstance.get("/chat/get-chats");
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return Promise.reject(error.response?.data);
    }
    return Promise.reject(error);
  }
};

// Pin conversation
export const pinConversation = async (chatId: string) => {
  try {
    const response = await axiosInstance.put(
      `/chat/pin-conversation/${chatId}`
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return Promise.reject(error.response?.data);
    }
    return Promise.reject(error);
  }
};

// Unpin conversation
export const unpinConversation = async (chatId: string) => {
  try {
    const response = await axiosInstance.put(
      `/chat/unpin-conversation/${chatId}`
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return Promise.reject(error.response?.data);
    }
    return Promise.reject(error);
  }
};

// Delete conversation (Leave chat)
export const deleteConversation = async (chatId: string) => {
  try {
    const response = await axiosInstance.delete(
      `/chat/delete-conversation/${chatId}`
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return Promise.reject(error.response?.data);
    }
    return Promise.reject(error);
  }
};