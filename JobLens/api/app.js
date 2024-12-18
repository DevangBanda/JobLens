import axios from "axios"; 

const API = axios.create({
    baseURL:"http://localhost:5100/api/"
});

export const userSignIn = async(data) => API.post("/user/signIn", data);
export const userSignUp = async(data) => API.post("/user/signUp", data);

export const sendAudioFile = async(data) => API.post("/user/dashboard/mp3Upload/", data, {
    headers: {
        'Content-Type': 'multipart/form-data',
      },
});

export const jobDescUpload = async(formData) => API.post("/user/dashboard/jobUpload/", formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
      },
});
  
export default API;