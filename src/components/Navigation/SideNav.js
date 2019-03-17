import React from "react";
// import { Link } from "react-router-dom";
import Modal from "react-responsive-modal";
import { connect } from "react-redux";
import AddChannel from "../AddChannel";
import { withRouter } from "react-router-dom";
// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faPlusCircle
} from "@fortawesome/free-solid-svg-icons";

// Components
import ChannelNavLink from "./ChannelNavLink";

class SideNav extends React.Component {
  state = { collapsed: false, open: false };
  // onComponentDidMount = () => {
  //   if (!this.props.user) {
  //     this.setState({ collapsed: true });
  //   }
  // };
  // onComponentDidUpdate = prevProps => {
  //   if (this.props !== prevProps) {
  //     this.setState({ collapsed: true });
  //   }
  // };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };
  render() {
    const channelLinks = this.props.channels.map(channel => (
      <ChannelNavLink key={channel.name} channel={channel} />
    ));
    return (
      <div>
        {this.props.user ? (
          <div>
            <ul
              className="navbar-nav navbar-sidenav"
              style={{ overflow: "auto" }}
              id="exampleAccordion"
            >
              <li
                className="nav-item"
                data-toggle="tooltip"
                data-placement="right"
              >
                <div className="nav-link heading" onClick={this.onOpenModal}>
                  <span className="nav-link-text mr-2">Channels</span>
                  <FontAwesomeIcon icon={faPlusCircle} />
                </div>
                <Modal
                  open={this.state.open}
                  onClose={this.onCloseModal}
                  center
                >
                  <AddChannel closeModal={this.onCloseModal} />
                </Modal>
              </li>
              {channelLinks}
            </ul>
          </div>
        ) : (
          <div />
        )}
        <ul className="navbar-nav sidenav-toggler">
          <li className="nav-item">
            <span
              className="nav-link text-center"
              id="sidenavToggler"
              onClick={() =>
                this.setState(prevState => ({
                  collapsed: !prevState.collapsed
                }))
              }
            >
              <FontAwesomeIcon
                icon={this.state.collapsed ? faAngleRight : faAngleLeft}
              />
            </span>
          </li>
        </ul>
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

export default withRouter(connect(mapStateToProps)(SideNav));
