import React from "react";
import { connect } from "react-redux";
import { setAuthenticatedUser } from "../authenticatedUser";
import "./login.css"; // Import the CSS file

function Login(props) {
  const { users, setAuthenticatedUser } = props;

  const handleChange = (e) => {
    setAuthenticatedUser(e.target.value);
  };

  return (
    <div className="columns is-centered question">
      <div className="column is-4 has-background-white-ter">
        <div className="card question-panel">
          <header className="header has-background-primary">
            <p className="card-header-title has-text-light">Login</p>
          </header>
          <div className="card-content">
            <div className="content">
              <div className="card-image">
                <figure className="image 48x48px">
                  <img
                    src="/images/johndoe.png"
                    className="is-rounded"
                    alt="Login-icon"
                  />
                </figure>
              </div>
              <div className="control has-text-centered">
                <div className="select">
                  <select onChange={handleChange} defaultValue={"DEFAULT"}>
                    <option disabled value="DEFAULT">
                      Select User
                    </option>
                    {Object.entries(users).map(([id, user]) => (
                      <option key={id} value={id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ users, authenticatedUser }) => ({
  users,
  authenticatedUser,
});

export default connect(mapStateToProps, { setAuthenticatedUser })(Login);
