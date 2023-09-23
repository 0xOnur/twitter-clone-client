import axios from "axios";
import axiosInstance from "./axiosInstance";

// Get All Chats
export const getAllConversations = async () => {
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

// Get Chat
export const getConversation = async (chatId: string) => {
  try {
    const response = await axiosInstance.get(`/chat/get-chat/${chatId}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return Promise.reject(error.response?.data);
    }
    return Promise.reject(error);
  }
};

// Get Chat Messages
export const getConversationMessages = async (
  chatId: string,
  page: number,
  limit: number
) => {
  try {
    const response = await axiosInstance.get(
      `/chat/get-chat-messages/${chatId}?page=${page}&limit=${limit}`
    );
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

// Create conversation
export const createConversation = async (users: IUser[]) => {
  try {
    const response = await axiosInstance.post("/chat/create-conversation", {
      users,
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return Promise.reject(error.response?.data);
    }
    return Promise.reject(error);
  }
};

// Send message
export const sendMessage = async (message: FormData) => {
  try {
    const response = await axiosInstance.post("/chat/send-message", message, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return Promise.reject(error.response?.data);
    }
    return Promise.reject(error);
  }
};

// Send Tweet via Message
export const sendTweet = async (message: {
  tweetId: string,
  messageContent?: string,
  selectedUsers?: IUser[],
  selectedConversations?: IChat[],
}) => {
  try {
    const response = await axiosInstance.post("/chat/send-tweet", message)
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return Promise.reject(error.response?.data);
    }
    return Promise.reject(error);
  }
};

// Read message
export const readMessage =async (messageId:string) => {
  try {
    const response = await axiosInstance.put(`/chat/read-message/${messageId}`)
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return Promise.reject(error.response?.data);
    }
    return Promise.reject(error);
  }
};

// Delete message
export const deleteMessage = async (messageId:string) => {
  try {
    const response = await axiosInstance.delete(`/chat/delete-message/${messageId}`)
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return Promise.reject(error.response?.data)
    }
    return Promise.reject(error)
  }
};

// Edit group
export const editGroup =async (formData: FormData) => {
  try {
    const response = await axiosInstance.put("/chat/edit-group", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return Promise.reject(error.response?.data)
    }
    return Promise.reject(error)
  }
}