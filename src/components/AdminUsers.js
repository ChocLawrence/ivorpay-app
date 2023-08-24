import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

const AdminUsers = () => {
  var [content, setContent] = useState([]);

  useEffect(() => {
    UserService.getAllUsers().then(
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
        <h3>All Users</h3>
      </header>
      <table className="table">
        <thead>
          <tr>
            <th>WALLET ID</th>
            <th>FIRSTNAME</th>
            <th>LASTNAME</th>
            <th>EMAIL</th>
            <th>STATUS</th>
            <th>STATUS</th>
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody>
          {content.length > 0 ? (
            content.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.email}</td>
                  <td>{user.status}</td>
                  <td>
                    {user.status === "enable" ? (
                      <button>DISABLE</button>
                    ) : (
                      <span>
                        <button>ENABLE</button> &nbsp;&nbsp;
                        <button>INVITE</button>
                      </span>
                    )}
                  </td>
                  <td>
                    <button>Delete</button>
                  </td>
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

export default AdminUsers;
