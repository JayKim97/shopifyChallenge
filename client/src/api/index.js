import axios from "axios";

const API = axios.create({ baseURL: "http://127.0.0.1:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const createImage = (newImage) => API.post("/images", newImage);
export const fetchImages = () => API.get("/images");
export const updateImage = (id, updatedImage) =>
  API.patch(`/images/${id}`, updatedImage);
export const deleteImages = (id) => API.delete(`/images/${id}`);
export const likeImages = (id) => API.patch(`/images/${id}/likeImage`);
export const fetchImage = (id) => API.get(`/images/${id}`);

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
export const getPosted = () => API.get("/user/posted");
