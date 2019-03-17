import React, { Component } from "react";
import * as actionCreators from "../store/actions";
import Loading from "./Loading";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import scroll from "../assets/js/scroll";
import Message from "./Message";
class Messages extends Component {
  state = {
    time: 0,
    start: 0
  };

  componentDidMount = () => {
    this.startTimer();
    this.props.onFetchMessages(this.props.match.params.channelID);
    this.props.loadMessages();
    scroll("latestMessage");
  };
  componentDidUpdate = prevProps => {
    if (
      prevProps.match.params.channelID !== this.props.match.params.channelID
    ) {
      clearInterval(this.timer);
      this.props.onFetchMessages(this.props.match.params.channelID);
      this.props.loadMessages();
      scroll("latestMessage");
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
      if (Math.floor(this.state.time / 1000) % 2 === 0) {
        this.props.onFetchMessages(this.props.match.params.channelID);
        scroll("latestMessage");
      }
    }, 1000);
  };
  componentWillUnmount = () => {
    clearInterval(this.timer);
  };
  resetTimer = () => {
    this.setState({ time: 0 });
  };

  getView = () => {
    const messages = this.props.messages.map(msg => <Message message={msg} />);
    let latest = {};
    if (messages.length) {
      latest = messages[messages.length - 1];
    }

    if (this.props.loading) {
      return <Loading />;
    } else {
      return messages.length && latest ? (
        <div>
          <ul className="messagesStyle pre-scrollable">
            {messages.slice(0, messages.length - 1)}
            <li className="messageStyle" id="latestMessage">
              {latest.props.children}
            </li>
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
    onFetchMessages: channelID =>
      dispatch(actionCreators.fetch_messages(channelID)),
    loadMessages: () => dispatch(actionCreators.loading())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Messages)
);
