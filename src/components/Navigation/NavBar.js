import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// Components
import SideNav from "./SideNav";
// import AuthButton from "./AuthButton";

class NavBar extends Component {
  render() {
    return (
      <div>
        <nav id="mainNav">
          <button
            className="navbar-toggler navbar-toggler-right"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <SideNav />
          </div>
        </nav>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};
export default withRouter(connect(mapStateToProps)(NavBar));
