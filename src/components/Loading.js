import React, { Component } from "react";

class Loading extends Component {
  render() {
    return (
      <img
        src={require("../assets/images/loadin.png")}
        className="loadContain"
        alt="loading"
      />
    );
  }
}

export default Loading;
