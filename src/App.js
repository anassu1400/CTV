import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
// Scripts
import main from "./assets/js/main";
import * as actionCreators from "./store/actions";

// Components
import NavBar from "./components/Navigation/NavBar";
// import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import Welcome from "./components/Welcome";
import RegistrationForm from "./components/RegistrationForm";
import SuperSecretPage from "./components/SuperSecretPage";
import Channel from "./components/Channel";
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
      <div>
        <Switch>
          <Route path="/welcome" component={Welcome} />
          <Route path="/(login|signup)" component={RegistrationForm} />
          <Route path={`/channels/:channelID`} component={Channel} />
          <PrivateRoute path="/private" component={SuperSecretPage} />
          <Redirect to="/welcome" />
        </Switch>
        {/* <Footer /> */}
      </div>
    );
  };
  render() {
    return (
      <div>
        <NavBar />
        <div className="content-wrapper">
          <div className="bubbles x1" />
          <div className="bubbles x2" />
          <div className="bubble x3" />
          <div className="bubble x4" />
          <div className="bubble x5" />
          <div className="bubble x6" />
          {this.getView()}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchChannels: () => dispatch(actionCreators.fetch_channels())
  };
};
export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(App)
);
