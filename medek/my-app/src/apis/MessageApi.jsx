// src/apis/MessageApi.jsx
import axios from "axios";

import ProccessApi from "./ProccessApi";

const API_BASE_URL = process.env.REACT_APP_MESSAGE_SERVICE_BASE_URL;

const jwtToken = ProccessApi.getJwtToken();

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${jwtToken}`,
    "Content-Type": "application/json",
  },
});

const MessageApi = {
  // Mesaj gönder
// src/apis/MessageApi.jsx
sendMessage: async (chatId, senderId, content) => {
  // content’in Türkçe karakter veya boşluk içerme ihtimaline karşı encode edelim
  const encodedContent = encodeURIComponent(content);
  const url = `/message/send?chatId=${chatId}&senderId=${senderId}&content=${encodedContent}`;
  const response = await axiosInstance.post(url);
  return response.data;
},


  // Sohbet oluştur
  createChat: async (userIds) => {
    const response = await axiosInstance.post(`/chat`, userIds);
    return response.data;
  },

  // Katılımcı ekle
  addParticipant: async (chatId, userId) => {
    const response = await axiosInstance.post(`/chat/${chatId}/participants`, null, {
      params: { userId },
    });
    return response.data;
  },

  // Katılımcı çıkar
  removeParticipant: async (chatId, userId) => {
    const response = await axiosInstance.delete(`/chat/${chatId}/participants`, {
      params: { userId },
    });
    return response.data;
  },

  // Kullanıcının tüm sohbetleri
  getUserChats: async (userId) => {
    const response = await axiosInstance.get(`/chat/by-user/${userId}`);
    return response.data;
  },

  // Bir sohbete ait mesajları getir
  getMessages: async (chatId) => {
    const response = await axiosInstance.get(`/chat/${chatId}/messages`);
    return response.data;
  },
};

export default MessageApi;
