import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as actionCreators from "../../store/actions";
import { connect } from "react-redux";
// Fontawesome
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faSignOutAlt,
//   faSignInAlt,
//   faUserPlus
// } from "@fortawesome/free-solid-svg-icons";

class AuthButton extends Component {
  render() {
    const user = this.props.user;
    let buttons = (
      <li>
        <div className="button">
          <span onClick={this.props.logout}>
            {/* <FontAwesomeIcon icon={faSignOutAlt} />  */}
            Logout
          </span>
        </div>
      </li>
    );

    if (!user) {
      buttons = [
        <li key="loginButton">
          <div className="button">
            <Link to="/login">
              {/* <FontAwesomeIcon icon={faSignInAlt} /> */}
              Login
            </Link>
          </div>
        </li>,
        <li key="signupButton">
          <div className="button">
            <Link to="/signup">
              {/* <FontAwesomeIcon icon={faUserPlus} />  */}
              Signup
            </Link>
          </div>
        </li>
      ];
    }

    return (
      <div>
        <ul className="buttons authBtns">
          <li>
            {user ? (
              <div className="button">
                <span>{user.username}</span>
              </div>
            ) : (
              <div />
            )}
          </li>
          {buttons}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actionCreators.logout())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthButton);
