import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8888", // 스프링 부트 백엔드 기본 url
  // "http://172.30.1.76:8888/api"
  withCredentials: true, // 세션 쿠키 전달
});

export default api;
