import React, { Component } from "react";
import * as actionCreators from "../store/actions";
import Loading from "./Loading";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import scrollf from "../assets/js/scroll";
import Message from "./Message";

class Messages extends Component {
  state = {
    time: 0,
    start: 0
  };

  componentDidMount = () => {
    this.startTimer();
    this.props.onFetchMessages(this.props.match.params.channelID, scrollf);
    this.props.loadMessages();
  };
  componentDidUpdate = prevProps => {
    if (
      prevProps.match.params.channelID !== this.props.match.params.channelID
    ) {
      clearInterval(this.timer);
      actionCreators.clearTS();
      actionCreators.clearMsgs();
      this.props.loadMessages();
      this.props.onFetchMessages(this.props.match.params.channelID, scrollf);

      this.resetTimer();
      this.startTimer();
    }
  };

  startTimer = () => {
    this.setState({
      time: this.state.time,
      start: Date.now() - this.state.time
    });
    this.timer = setInterval(() => {
      this.setState({
        time: Date.now() - this.state.start
      });
      this.props.onFetchMessages(this.props.match.params.channelID, scrollf);
    }, 5000);
  };

  componentWillUnmount = () => {
    clearInterval(this.timer);
    actionCreators.clearTS();
    actionCreators.clearMsgs();
  };

  resetTimer = () => {
    this.setState({ time: 0 });
  };

  getView = () => {
    // const type = this.props.value;
    let messages = [];

    messages = this.props.messages.map(msg =>
      msg.username ? (
        <Message
          type={msg.type}
          key={msg.id}
          username={msg.username}
          message={msg.message}
        />
      ) : (
        <></>
      )
    );

    // let latest = {};

    if (this.props.loading) {
      return <Loading />;
    } else {
      return messages.length ? (
        <div className="messagesStyle">
          <ul className="pre-scrollable">
            {messages}
            <div id="latestMessage" />
            <li />
          </ul>
        </div>
      ) : (
        <div />
      );
    }
  };

  render() {
    return <>{this.getView()}</>;
  }
}
const mapStateToProps = state => {
  return {
    messages: state.chnl.messages,
    loading: state.chnl.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchMessages: (channelID, scroll) =>
      dispatch(actionCreators.fetch_messages(channelID, scroll)),
    loadMessages: () => dispatch(actionCreators.loading())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Messages)
);
