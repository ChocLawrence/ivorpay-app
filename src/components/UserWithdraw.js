import React, { useState, useRef, useEffect } from "react";
import EventBus from "../common/EventBus";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import TransactionsService from "../services/transactions.service";
import WalletService from "../services/wallet.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">
        This field is required!
      </div>
    );
  }
};

const UserWithdraw = () => {
  const form = useRef();
  const checkBtn = useRef();
  const currentUser = AuthService.getCurrentUser();

 

  const [walletId, setWalletId] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  var [wallet, setWallet] = useState([]);

  var userId = currentUser.data.id;


  useEffect(() => {
    WalletService.getOneWallet(userId).then(
      (response) => {
        setWallet(response.data);
        setWalletId(response.data.walletNumber);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

          setWallet(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  const navigate = useNavigate();

  const onChangeAmount = (e) => {
    const amount = e.target.value;
    setAmount(amount);
  };

  const handleUserWithdraw = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      TransactionsService.withdraw(walletId, amount).then(
        () => {
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="col-md-12">
      <div>
        <p>
          <strong>WALLET Id:</strong> {wallet ? wallet.walletNumber : "-"}
        </p>
        <p>
          <strong>BALANCE:</strong> {wallet ? wallet.walletBalance : "-"} USD
        </p>
       
      </div>
      <div className="card card-container">
        <h3>WITHDRAW FROM ACCOUNT</h3>

        <Form onSubmit={handleUserWithdraw} ref={form}>
          <div className="form-group">
            <label htmlFor="walletId">WALLET ID</label>
            <Input
              type="password"
              className="form-control"
              name="walletId"
              value={wallet.walletNumber}
              readOnly/>
          </div>

          <div className="form-group">
            <label htmlFor="amount">AMOUNT</label>
            <Input
              type="number"
              className="form-control"
              name="amount"
              value={amount}
              onChange={onChangeAmount}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>CONFIRM</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default UserWithdraw;
