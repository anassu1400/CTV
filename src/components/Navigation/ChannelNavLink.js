import React, { Component } from "react";
import { NavLink } from "react-router-dom";
// FontAwesome
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHashtag } from "@fortawesome/free-solid-svg-icons";

class ChannelNavLink extends Component {
  render() {
    const hashCode = s => {
      return s.split("").reduce((a, b) => {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
      }, 0);
    };
    const channel = this.props.channel;
    return (
      <li
        className="nav-item"
        data-toggle="tooltip"
        data-placement="right"
        title={channel.name}
      >
        <NavLink className="nav-link" to={`/channels/${channel.id}/`}>
          {channel.image_url ? (
            <img
              style={{ borderRadius: "50%", width: "50px", height: "50px" }}
              src={channel.image_url}
              alt={"image for " + channel.name}
            />
          ) : (
            <img
              style={{ borderRadius: "50%", width: "50px", height: "50px" }}
              src={`https://www.gravatar.com/avatar/${hashCode(
                channel.name + channel.id * 10
              )}?d=identicon`}
              alt={"image for " + channel.name}
            />
          )}
          <span className="nav-link-text"> {channel.name}</span>
        </NavLink>
      </li>
    );
  }
}

export default ChannelNavLink;
