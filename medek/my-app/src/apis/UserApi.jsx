// src/apis/UserApi.js
import axios from "axios";
import ProccessApi from "./ProccessApi";
// API URL'yi bir çevresel değişkende tutarak yönlendirebiliriz
const API_BASE_URL = process.env.REACT_APP_USER_SERVICE_URL;

const UserApi = {
  // Login metodunu buraya ekliyoruz
  login: async (email, password) => {
    const body = {
      emailAddress: email,
      password: password,
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/User/login`, body, {
        headers: {
          "Content-Type": "application/json",
          "accept": "*/*",
        },
      });

      return response; // Başarı durumunda response'u döndürüyoruz
    } catch (err) {
      throw err; // Hata durumunda hatayı fırlatıyoruz
    }
  },

  saveUser: async (user) => {
    try {
      // LocalStorage'den token'ı çekiyoruz.
      const token = ProccessApi.getJwtToken();

      const response = await axios.post(`${API_BASE_URL}/User/save-user`, user, {
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
          // Token varsa Authorization header'ına ekliyoruz.
          Authorization: token ? `Bearer ${token}` : ""
        },
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  },

  getUsers: async ()=> {
        try {
      // LocalStorage'den token'ı çekiyoruz.
      const token = ProccessApi.getJwtToken();

      const response = await axios.get(`${API_BASE_URL}/User`, {
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
          // Token varsa Authorization header'ına ekliyoruz.
          Authorization: token ? `Bearer ${token}` : ""
        },
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

};

export default UserApi;
