import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// Components
import AuthButton from "./AuthButton";
import ChannelsButtons from "../ChannelsButtons";
class TVNav extends Component {
  render() {
    return (
      <div>
        <Link className="ChatLink" to="/welcome">
          <h2
            className="ChatLogo"
            style={{ textShadow: "5px 5px 10px #3c65a8" }}
          >
            Chat TV
          </h2>
        </Link>

        <AuthButton />
        <ChannelsButtons />
      </div>
    );
  }
}
export default withRouter(
  connect(
    null,
    null
  )(TVNav)
);
