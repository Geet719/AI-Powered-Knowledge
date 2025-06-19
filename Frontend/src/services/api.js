import axios from "axios";

 const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT ;

const API = axios.create();

console.log("API Endpoint:", API_ENDPOINT);

export const registerUser = (data) => API.post(`${API_ENDPOINT}/auth/register`, data);
export const loginUser = (data) => API.post(`${API_ENDPOINT}/auth/login`, data);
