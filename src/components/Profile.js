import React from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  const navigate = useNavigate();

  const routeChange = () => {
    navigate("/login");
  };

  return currentUser ? (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser ? currentUser.data.username : ""}</strong>{" "}
          Profile
        </h3>
      </header>
      <p>
        <strong>Id:</strong> {currentUser ? currentUser.data.id : "-"}
      </p>
      <p>
        <strong>Username:</strong>{" "}
        {currentUser ? currentUser.data.username : "-"}
      </p>
      <p>
        <strong>Firstname:</strong>{" "}
        {currentUser ? currentUser.data.firstname : "-"}
      </p>
      <p>
        <strong>Middlename:</strong>{" "}
        {currentUser ? currentUser.data.middlename : "-"}
      </p>
      <p>
        <strong>Lastname:</strong>{" "}
        {currentUser ? currentUser.data.lastname : "-"}
      </p>
      <p>
        <strong>DOB:</strong> {currentUser ? currentUser.data.dob : "-"}
      </p>
      <p>
        <strong>Gender:</strong> {currentUser ? currentUser.data.gender : "-"}
      </p>
      <p>
        <strong>Email:</strong> {currentUser ? currentUser.data.email : "-"}
      </p>
      {/* <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul> */}
    </div>
  ) : (
    <div className="row">
      <span> You are logged out </span>
      <button color="primary" className="px-4" onClick={routeChange}>
        Login
      </button>
    </div>
  );
};

export default Profile;
