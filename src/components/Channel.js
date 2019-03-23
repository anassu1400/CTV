import React, { Component } from "react";
import SendMessage from "./SendMessage";
import Messages from "./Messages";
// import Loading from "./Loading";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
class Channel extends Component {
  // state = {
  //   value: false
  // };
  // isAsciif = v => {
  //   this.setState({ value: v });
  // };

  getView = () => {
    if (this.props.channels) {
      return (
        <div>
          <Messages />
          <SendMessage
            // asciif={this.isAsciif}
            channelID={this.props.match.params.channelID}
          />
        </div>
      );
    } else {
      return <div />;
    }
  };
  render() {
    return this.getView();
  }
}

const mapStateToProps = state => {
  return {
    // loading: state.chnl.loading,
    channels: state.chnls.channels
  };
};
export default withRouter(connect(mapStateToProps)(Channel));
