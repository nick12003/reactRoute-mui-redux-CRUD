import _axios from "axios";

const Proxy = import.meta.env.VITE_Proxy;
const apiUrl = import.meta.env.VITE_ApiUrl;
const token = import.meta.env.VITE_Token;

function getBaseUrl(proxy, url) {
  if (proxy) return proxy + url;
  return url;
}

const axios = _axios.create({
  baseURL: getBaseUrl(Proxy, apiUrl),
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

axios.interceptors.response.use((response) => {
  return response.data;
});

export const getList = () => axios.get("/task");

export const getOne = (id) => axios.get(`/task/${id}`);

export const create = (data) => axios.post("/task", data);

export const update = (id, data) => axios.put(`/task/${id}`, data);

export const remove = (id) => axios.delete(`/task/${id}`);
