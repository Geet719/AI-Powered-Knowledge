import axios from "axios";

 const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || "http://localhost:5000";

const API = axios.create();

console.log("API Endpoint:", API_ENDPOINT);

export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post(`${API_ENDPOINT}/auth/login`, data);
