import React, { Component } from "react";
import SendMessage from "./SendMessage";
import Messages from "./Messages";

class Channel extends Component {
  render() {
    return (
      <div className="myContent">
        <Messages />
        <SendMessage channelID={this.props.match.params.channelID} />
      </div>
    );
  }
}

export default Channel;
