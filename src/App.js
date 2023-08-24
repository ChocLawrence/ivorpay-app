import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import UserTransactions from "./components/UserTransactions";
import UserTransfer from "./components/UserTransfer";
import UserDeposit from "./components/UserDeposit";
import UserWithdraw from "./components/UserWithdraw";
import AdminUsers from "./components/AdminUsers";
import AdminTransactions from "./components/AdminTransactions";

// import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";

const App = () => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      if (user.data.role === "admin") {
        setShowAdminBoard(true);
      }
      // setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      // setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-brand">IVORPAY</div>
        <div className="navbar-nav mr-auto">
          {/* <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li> */}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/alltransactions"} className="nav-link">
                All Transactions
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/users"} className="nav-link">
                All Users
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/deposit"} className="nav-link">
                Deposit
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/transfer"} className="nav-link">
                Transfer
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/withdraw"} className="nav-link">
                Withdraw
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/transactions"} className="nav-link">
                Transactions
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.data.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route exact path={"/"} element={<Profile />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route path="/deposit" element={<UserDeposit />} />
          <Route path="/transfer" element={<UserTransfer />} />
          <Route path="/withdraw" element={<UserWithdraw />} />
          <Route path="/transactions" element={<UserTransactions />} />
          <Route path="/alltransactions" element={<AdminTransactions />} />
          <Route path="/users" element={<AdminUsers />} />
        </Routes>
      </div>

      {/* <AuthVerify logOut={logOut}/> */}
    </div>
  );
};

export default App;
