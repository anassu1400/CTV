import React, { Component } from "react";
import ChannelNavLink from "./Navigation/ChannelNavLink";

class ChannelsList extends Component {
  state = {
    starts: 0,
    ends: 0,
    page: 1
  };
  componentDidMount = () => {
    this.setState({ starts: 1, ends: 10 });
  };
  //   componentDidUpdate = prevState => {
  //     if (prevState.page !== this.state.page) {
  //       this.setState({});
  //     }
  //   };
  moveUpPage = () => {
    this.setState({
      page: this.state.page + 1,
      starts: this.state.starts + 9,
      ends: this.state.ends + 9
    });
  };
  moveDownPage = () => {
    this.setState({
      page: this.state.page - 1,
      starts: this.state.starts - 9,
      ends: this.state.ends - 9
    });
  };
  render() {
    const channelLinks = this.props.channels
      .map(channel => (
        <ChannelNavLink
          onClose={this.props.closeModal}
          key={channel.name}
          channel={channel}
        />
      ))
      .slice(this.state.starts - 1, this.state.ends);
    return (
      <div style={{ zIndex: "2004" }}>
        <ul>{channelLinks}</ul>
        <table style={{ marginRight: "0%", marginLeft: "32%" }}>
          <thead>
            <tr>
              {this.state.page !== 1 ? (
                <td>
                  <button className="buttns" onClick={this.moveDownPage}>
                    prev
                  </button>
                </td>
              ) : (
                <td />
              )}
              {this.state.page <=
              Math.round(this.props.channels.length / 10) ? (
                <td>
                  <button className="buttns" onClick={this.moveUpPage}>
                    next
                  </button>
                </td>
              ) : (
                <td />
              )}
            </tr>
          </thead>
        </table>
      </div>
    );
  }
}

export default ChannelsList;
