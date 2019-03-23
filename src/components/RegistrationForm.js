import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as actionCreators from "../store/actions";
import { connect } from "react-redux";
class RegistationForm extends Component {
  state = {
    username: "",
    password: ""
  };

  componentWillUnmount = () => {
    this.props.setErrors([]);
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e, type) => {
    e.preventDefault();
    if (type === "login") {
      this.props.login(this.state, this.props.history);
    } else {
      this.props.signup(this.state, this.props.history);
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
    const type = this.props.match.url.substring(1);

    return (
      <div>
        {this.showErrors()}
        <div
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          className="card col-6 mx-auto p-0 mt-5 welcomePage"
        >
          <div className="card-body">
            <h5 className="card-title mb-4">
              {type === "login"
                ? "Login to send messages"
                : "Register an account"}
            </h5>
            <form onSubmit={e => this.submitHandler(e, type)}>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Username"
                  name="username"
                  onChange={this.changeHandler}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={this.changeHandler}
                />
              </div>
              <input
                className="btn btn-primary"
                type="submit"
                value={type.replace(/^\w/, c => c.toUpperCase())}
              />
            </form>
          </div>
          <div className="card-footer">
            <Link
              to={type === "login" ? "/signup" : "/login"}
              className="btn btn-small btn-link"
            >
              {type === "login"
                ? "register an account"
                : "login with an existing account"}
            </Link>
          </div>
        </div>
      </div>
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
    login: (userData, history) =>
      dispatch(actionCreators.login(userData, history)),
    signup: (userData, history) =>
      dispatch(actionCreators.signup(userData, history)),
    setErrors: errors => dispatch(actionCreators.setErrors(errors))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistationForm);
