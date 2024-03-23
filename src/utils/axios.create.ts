import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:3035"
});

export default api;