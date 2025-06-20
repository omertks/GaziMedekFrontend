import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_MEDEK_SERVICE_URL; // Backend URL

const jwtToken = localStorage.getItem("token");
const userId = localStorage.getItem("userId");

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
    },
});

const MedekApi = {

    downloadForm: async (id) => {
        // burada header farklı olduğu için böyle yaptım
        const headers = {
            "Content-Type": "multipart/form-data",
            "accept": '*/*',
            "Authorization": jwtToken ? `Bearer ${jwtToken}` : "",
        };
        const response = await axios.post(`${API_BASE_URL}/Pdf/medek/download/${id}`,null, {
                headers: headers,
                responseType: "blob"
            });
        return response.data;
    },
    deleteForm:async (id) => {
        const response = await axiosInstance.delete(`/Pdf/medek/delete/${id}`);
        return response.data;
    },  
    getFormsByUser: async (id) => {
        const response = await axiosInstance.get(`/Pdf/medek/user/${id}`);
        return response.data;
    },

}

export default MedekApi