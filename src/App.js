import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
// Scripts
import main from "./assets/js/main";
import * as actionCreators from "./store/actions";

// Components
import TVNav from "./components/Navigation/TVNav";
// import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import Welcome from "./components/Welcome";
import RegistrationForm from "./components/RegistrationForm";
import SuperSecretPage from "./components/SuperSecretPage";
import Channel from "./components/Channel";
// import NavBar from "./components/Navigation/NavBar";
// import AuthButton from "./components/Navigation/AuthButton";
class App extends Component {
  componentDidMount() {
    main();
    this.props.onFetchChannels();
  }
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.props.onFetchChannels();
    }
  }
  getView = () => {
    return (
      <div className="con">
        {/* <div className="add_grad" /> */}

        <Switch>
          <Route path="/welcome" component={Welcome} />
          <Route path="/(login|signup)" component={RegistrationForm} />
          <Route path={`/channels/:channelID`} component={Channel} />
          <PrivateRoute path="/private" component={SuperSecretPage} />
          <Redirect to="/welcome" />
        </Switch>

        {/* <Footer /> */}
        <div className="scan" />
      </div>
    );
  };
  render() {
    return (
      <div>
        <img
          id="tvFrame"
          src={require("./assets/images/frame.png")}
          alt="tvframe"
        />
        <TVNav />
        <div className="content-wrapper">{this.getView()}</div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchChannels: () => dispatch(actionCreators.fetch_channels()),
    setErrors: () => dispatch(actionCreators.setErrors())
  };
};
export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(App)
);
