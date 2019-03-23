import React, { Component } from "react";
import asciify from "../assets/js/asciify-image";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions";
class ImageForm extends Component {
  state = { imageUrl: "", ascii: "" };

  onTextchange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  submitImage = event => {
    event.preventDefault();
    this.handleImage(this.state.imageUrl);
    this.props.closeModal();
  };
  componentWillUnmount = () => {
    this.props.setErrors([]);
  };
  handleImage = imageUrl => {
    // let asciify = require("asciify-image");
    let options = {
      color: false,
      fit: "box",
      width: 10,
      height: 10
    };
    const asc = (err, asciified) => {
      if (err) console.error(err);
      this.props.ascifymsg(asciified);
    };
    try {
      asciify(imageUrl, options, (err, asciified) => asc(err, asciified));
    } catch (error) {
      this.props.setErrors(error.response.data);
    }
  };
  showErrors = () => {
    if (!!this.props.errors.length) {
      return (
        <>
          <div className="noiseContain">
            <div />
          </div>
          <div
            style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
            className="card col-6 mx-auto p-0 mt-5 welcomePage"
          >
            {this.props.errors.map(err => (
              <p key={err.key}>{err}</p>
            ))}
          </div>
        </>
      );
    }
  };
  render() {
    return (
      <form className="imageBox" onSubmit={this.submitImage}>
        {this.showErrors()}
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Image URL</span>
          </div>
          <input
            type="text"
            className="form-control"
            name="imageUrl"
            onChange={this.onTextchange}
          />
          <input type="submit" value="upload image" />
        </div>
      </form>
    );
  }
}
const mapStateToProps = state => {
  return {
    errors: state.errors.errors
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setErrors: errors => dispatch(actionCreators.setErrors(errors))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageForm);
