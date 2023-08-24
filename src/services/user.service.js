import axios from "axios";

const API_URL = "http://localhost:3000/";

const getAllUsers = () => {
  return axios.get(API_URL + "users");
};

const getOneUser = (id) => {
  return axios.get(API_URL + "users/" + id);
};

const inviteUser = (email) => {
  return axios.post(API_URL + "invite", {
    email,
  });
};

const enableUser = (id) => {
  return axios.get(API_URL + "users/e/" + id);
};

const disableUser = (id) => {
  return axios.get(API_URL + "users/d/" + id);
};

const UserService = {
  getAllUsers,
  getOneUser,
  inviteUser,
  enableUser,
  disableUser,
};

export default UserService;
