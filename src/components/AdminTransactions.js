import React, { useState, useEffect } from "react";

import TransactionService from "../services/transactions.service";
import EventBus from "../common/EventBus";

const AdminTransactions = () => {
  var [content, setContent] = useState([]);

  useEffect(() => {
    TransactionService.getAllTransactions().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>All TRANSACTIONS</h3>
      </header>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>FROM WALLET ID</th>
            <th>TO WALLET ID</th>
            <th>AMOUNT</th>
            <th>TRANSACTION STATUS</th>
          </tr>
        </thead>
        <tbody>
          {content.length > 0 ? (
            content.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.debitedWallet ? user.debitedWallet : '-'}</td>
                  <td>{user.creditedWallet ? user.creditedWallet : '-'}</td>
                  <td>{user.amount}</td>
                  <td>{user.transactionType}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>No content</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTransactions;
