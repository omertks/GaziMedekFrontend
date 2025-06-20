import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_SCHOOL_SERVICE_BASE_URL; // Backend URL

const jwtToken = localStorage.getItem("token");
const userId = localStorage.getItem("userId");

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
    },
});

const SchoolApi = {

    //#region User

    // Get user by ID
    getUserById: async (id) => {
        try {
            const response = await axiosInstance.get(`/user/${id}`);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },

    // Get user by UserId
    getUserByUserId: async (id) => {
        try {
            const response = await axiosInstance.get(`/user/userId/${id}`);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },

    // Get teachers by department ID
    getTeachersByDepartmentId: async (departmentId) => {
        try {
            const response = await axiosInstance.get(`/user/teacher/department/${departmentId}`);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },

    // Get manager by department ID
    getManagerByDepartmentId: async (departmentId) => {
        try {
            const response = await axiosInstance.get(`/user/manager/department/${departmentId}`);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },

    // Save teacher (create new user)
    saveTeacher: async (createUserDto) => {
        try {
            const response = await axiosInstance.post(`/user`, createUserDto);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },

    // Delete user
    deleteUser: async (id) => {
        try {
            const response = await axiosInstance.delete(`/user`, { data: { id } });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },

    // Update user
    updateUser: async (id, updateUserDto) => {
        try {
            const response = await axiosInstance.put(`/user`, updateUserDto, { params: { id } });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },
    //#endregion


    //#region Department

    // Tüm departmanları getir
    getAllDepartments: async () => {
        const response = await axiosInstance.get("/department");
        return response.data;
    },

    // Belirli bir üniversiteye ait departmanları getir
    getDepartmentsByUniversityId: async (universityId) => {
        const response = await axiosInstance.get(`/department/university/${universityId}`);
        return response.data;
    },

    // ID’ye göre departman getir
    getDepartmentById: async (id) => {
        const response = await axiosInstance.get(`/department/${id}`);
        return response.data;
    },

    // Yeni departman oluştur
    createDepartment: async (createDto) => {
        const response = await axiosInstance.post("/department", createDto);
        return response.data;
    },

    // Departmanı güncelle
    updateDepartment: async (id, updateDto) => {
        const response = await axiosInstance.put(`/department/${id}`, updateDto);
        return response.data;
    },

    // Departmanı sil
    deleteDepartment: async (id) => {
        const response = await axiosInstance.delete(`/department/${id}`);
        return response.data;
    },

    //#endregion


    //#region Lesson

    // Tüm dersleri getir
    getAllLessons: async () => {
        const response = await axiosInstance.get("/lesson");
        return response.data;
    },

    // ID'ye göre dersi getir
    getLessonById: async (id) => {
        const response = await axiosInstance.get(`/lesson/${id}`);
        return response.data;
    },

    // Kullanıcıya göre dersleri getir
    getLessonsByTeacherId: async (userId) => {
        const response = await axiosInstance.get(`/lesson/user/${userId}`);
        return response.data;
    },

    // Departmana göre dersleri getir
    getLessonsByDepartmentId: async (departmentId) => {
        const response = await axiosInstance.get(`/lesson/department/${departmentId}`);
        return response.data;
    },

    // Üniversiteye göre dersleri getir
    getLessonsByUniversityId: async (universityId) => {
        const response = await axiosInstance.get(`/lesson/university/${universityId}`);
        return response.data;
    },

    // Yeni ders oluştur
    createLesson: async (createDto) => {
        const response = await axiosInstance.post("/lesson", createDto);
        return response.data;
    },

    // Dersi güncelle
    updateLesson: async (id, updateDto) => {
        const response = await axiosInstance.put(`/lesson/${id}`, updateDto);
        return response.data;
    },

    // Dersi sil
    deleteLesson: async (id) => {
        const response = await axiosInstance.delete(`/lesson/${id}`);
        return response.data;
    },

    //#endregion


    //#region University

    // Tüm üniversiteleri getir
    getAllUniversities: async () => {
        const response = await axiosInstance.get("/university");
        return response.data;
    },

    // ID'ye göre üniversite getir
    getUniversityById: async (id) => {
        const response = await axiosInstance.get(`/university/${id}`);
        return response.data;
    },

    // Yeni üniversite oluştur
    createUniversity: async (createDto) => {
        const response = await axiosInstance.post("/university", createDto);
        return response.data;
    },

    // Üniversite güncelle
    updateUniversity: async (id, updateDto) => {
        const response = await axiosInstance.put(`/university/${id}`, updateDto);
        return response.data;
    },

    // Üniversite sil
    deleteUniversity: async (id) => {
        const response = await axiosInstance.delete(`/university/${id}`);
        return response.data;
    },

    //#endregion


}


export default SchoolApi;