import React, { Component } from "react";

//redux, routers
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

//font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

//Components
import ChannelsList from "./ChannelsList";
import AddChannel from "./AddChannel";
import Modal from "react-responsive-modal";

class ChannelsButtons extends Component {
  state = { open: false, show: false };
  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };
  displayModal = () => {
    this.setState({ show: !this.state.show });
  };
  noDisplayModal = () => {
    this.setState({ show: false });
  };
  render() {
    return (
      <div className="channelbuttons">
        {this.props.user ? (
          <div>
            <ul>
              <li>
                <div className="button" onClick={this.onOpenModal}>
                  <span>Add Channel</span>
                  <FontAwesomeIcon icon={faPlusCircle} />
                </div>
              </li>
              <li>
                <div className="button" onClick={this.displayModal}>
                  Show Channels
                </div>
              </li>
            </ul>
            <Modal open={this.state.open} onClose={this.onCloseModal} center>
              <AddChannel closeModal={this.onCloseModal} />
            </Modal>
            <Modal
              className="channelsModal"
              open={this.state.show}
              onClose={this.noDisplayModal}
              center
            >
              <ChannelsList
                channels={this.props.channels}
                closeModal={this.noDisplayModal}
              />
            </Modal>
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    channels: state.chnls.channels,
    user: state.auth.user
  };
};

export default withRouter(connect(mapStateToProps)(ChannelsButtons));
