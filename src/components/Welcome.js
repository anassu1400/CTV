import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ChannelList from "./ChannelsList";
class Welcome extends Component {
  render() {
    return (
      <div className="welcomePage">
        {!this.props.user ? (
          <div className="text-center my-auto ">
            <h1
              className="mb-1"
              style={{ marginTop: "10px", marginBottom: "80px" }}
            >
              WELCOME TO CHAT TV
            </h1>
            <h3 className="mb-5">
              <em>You're gonna need to login to see the messages</em>
            </h3>
            <Link
              to="/login"
              className="btn btn-primary btn-lg"
              style={{ zIndex: "2002" }}
            >
              Login
            </Link>
          </div>
        ) : (
          <div className="text-center">
            <h1
              // className="mb-1"
              style={{ paddingTop: "10px", paddingBottom: "100px" }}
            >
              WELCOME TO CHAT TV
            </h1>
            <div style={{ zIndex: "2004" }}>
              <ChannelList channels={this.props.channels} />
            </div>
          </div>
        )}
        {/* <div className="overlay z-0" /> */}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.auth.user,
    channels: state.chnls.channels
  };
};

export default withRouter(connect(mapStateToProps)(Welcome));
