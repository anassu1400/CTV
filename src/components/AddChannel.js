import React, { Component } from "react";
import { connect } from "react-redux";

// Actions
import * as actionCreators from "../store/actions";

class AddChannel extends Component {
  state = {
    name: ""
  };
  submitChannel = event => {
    event.preventDefault();
    this.props.onChannelSubmit(this.state, this.props.closeModal);
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    return (
      <form onSubmit={this.submitChannel}>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Channel Name</span>
          </div>
          <input
            type="text"
            className="form-control"
            name="name"
            onChange={this.handleChange}
          />
        </div>
        <input type="submit" />
      </form>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onChannelSubmit: (name, closeModal) =>
      dispatch(actionCreators.add_channel(name, closeModal))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AddChannel);
