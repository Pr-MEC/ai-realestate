import axios from "axios";

const API_BASE_URL = "const API_BASE_URL = "https://ai-realestate-744e.onrender.com/api";";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const registerUser = (data) => api.post("/users", data);
export const loginUser = (data) => api.post("/users/login", data);
export const getUsers = () => api.get("/users");
export const getUserById = (id) => api.get(`/users/${id}`);
export const updateUser = (id, data) => api.put(`/users/${id}`, data);
export const deleteUser = (id) => api.delete(`/users/${id}`);

export const getProperties = (filters = {}) =>
    api.get("/properties", { params: filters });
export const getPropertyById = (id) => api.get(`/properties/${id}`);
export const addProperty = (data) => api.post("/properties", data);
export const updateProperty = (id, data) => api.put(`/properties/${id}`, data);
export const deleteProperty = (id) => api.delete(`/properties/${id}`);

export const getInquiries = (filters = {}) =>
    api.get("/inquiries", { params: filters });
export const getInquiryById = (id) => api.get(`/inquiries/${id}`);
export const submitInquiry = (data) => api.post("/inquiries", data);
export const updateInquiry = (id, data) => api.put(`/inquiries/${id}`, data);
export const deleteInquiry = (id) => api.delete(`/inquiries/${id}`);

export const getAiRequests = (filters = {}) =>
    api.get("/ai", { params: filters });
export const getAiRequestById = (id) => api.get(`/ai/${id}`);
export const createAiRequest = (data) => api.post("/ai", data);
export const updateAiRequest = (id, data) => api.put(`/ai/${id}`, data);
export const deleteAiRequest = (id) => api.delete(`/ai/${id}`);

export default api;