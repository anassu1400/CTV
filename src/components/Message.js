import React, { Component } from "react";

class Message extends Component {
  render() {
    const msg = this.props.message;
    return (
      <li className="messageStyle">
        {this.props.username}:{" "}
        <div>
          {this.props.type === "asciified"
            ? msg.split("\n").map(line => (
                <p key={line} style={{ marginBottom: "0" }}>
                  {line.replace(/\s/g, "\u00a0\u00a0\u00a0")}
                </p>
              ))
            : msg.split("\n").map(line => (
                <p key={line} style={{ marginBottom: "0" }}>
                  {line}
                </p>
              ))}
        </div>
      </li>
    );
  }
}

export default Message;
