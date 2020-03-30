import axios from "axios";

const api = axios.create({
  baseURL: "https://betheherobackend.herokuapp.com"
});

export default api;
