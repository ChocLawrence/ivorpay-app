import axios from "axios";

const API_URL = "http://localhost:3000/";

const register = (username,firstname, lastname, gender, email, pass) => {
  return axios.post(API_URL + "register", {
    username,
    firstname,
    lastname,
    gender,
    email,
    pass,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "login", {
      username,
      password,
    })
    .then((response) => {
      if (response) {
        localStorage.setItem("user", JSON.stringify(response));
      }

      return response;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  return axios.post(API_URL + "logout").then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
}

export default AuthService;
