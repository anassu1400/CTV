import React, { Component } from "react";

class Message extends Component {
  render() {
    const msg = this.props.message;
    return (
      <li className="messageStyle" key={msg.id}>
        {msg.username}: {msg.message}
      </li>
    );
  }
}

export default Message;
