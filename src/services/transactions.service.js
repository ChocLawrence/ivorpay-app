import axios from "axios";

const API_URL = "http://localhost:3000/";

const getAllTransactions = () => {
  return axios.get(API_URL + "transactions");
};

const getUserTransactions = (id) => {
  return axios.get(API_URL + "transaction/user/" + id);
};

const getOneTransaction = (id) => {
  return axios.get(API_URL + "transactions/" + id);
};

const deposit = (walletId, amount) => {
  return axios.post(API_URL + "transactions/d", {
    walletId,
    amount,
  });
};

const withdraw = (walletId, amount) => {
  return axios.post(API_URL + "transactions/w", {
    walletId,
    amount,
  });
};

const transfer = (walletId, amount, debittedWalletId) => {
  return axios.post(API_URL + "transactions/t", {
    walletId,
    amount,
    debittedWalletId,
  });
};

const TransactionService = {
  getAllTransactions,
  getUserTransactions,
  getOneTransaction,
  deposit,
  withdraw,
  transfer,
};

export default TransactionService;
