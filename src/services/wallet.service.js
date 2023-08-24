import axios from "axios";

const API_URL = "http://localhost:3000/";

const getAllWallets = () => {
  return axios.get(API_URL + "wallets");
};

const getOneWallet = (id) => {
  return axios.get(API_URL + "wallets/" + id);
};

const WalletService = {
  getAllWallets,
  getOneWallet,
};

export default WalletService;
