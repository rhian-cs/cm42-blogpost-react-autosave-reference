import axios from "axios";

const API_URL = "http://localhost:4000";

export const getProfile = async () => {
  const response = await axios.get(`${API_URL}/profile`);

  return response.data;
};

export const updateProfile = (profile) => {
  return axios.put(`${API_URL}/profile`, profile);
};
