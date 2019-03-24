import React, { Component } from "react";
import * as actionCreators from "../store/actions";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-responsive-modal";
import ImageForm from "./ImageForm";
// import Speech from "react-speech";
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continous = true;
// recognition.interimResults = true;
recognition.lang = "en-US";

class SendMessage extends Component {
  state = {
    message: "",
    listening: false,
    open: false
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  toggleListen = () => {
    this.setState(
      {
        listening: !this.state.listening
      },
      this.handleListen
    );
  };
  ascifymsg = asciified => {
    this.props.onSendMessage(this.props.channelID, {
      message: asciified + " 򹷍쪬w󀆬񪉭 ",
      type: "asciified"
    });
  };
  handleListen() {
    // console.log("listening?", this.state.listening);
    if (this.state.listening) {
      recognition.start();
      recognition.onend = () => {
        // console.log("...continue listening...");
        recognition.start();
      };
    } else {
      recognition.stop();
      recognition.onend = () => {
        // console.log("Stopped listening per click");
      };
    }

    recognition.onstart = () => {
      // console.log("Listening!");
    };

    let finalTranscript = "";
    recognition.onresult = event => {
      // let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalTranscript += transcript + " ";
        // else interimTranscript += transcript;
      }
      // document.getElementById("interim").innerHTML = interimTranscript;
      this.setState({ message: finalTranscript });

      //-------------------------COMMANDS------------------------------------

      const transcriptArr = finalTranscript.split(" ");
      const stopCmd = transcriptArr.slice(-3, -1);
      // console.log("stopCmd", stopCmd);

      if (stopCmd[0] === "stop" && stopCmd[1] === "listening") {
        recognition.stop();
        recognition.onend = () => {
          // console.log("Stopped listening per command");
          const finalText = transcriptArr.slice(0, -3).join(" ");
          document.getElementById("final").innerHTML = finalText;
        };
      }
    };

    //-----------------------------------------------------------------------

    recognition.onerror = event => {
      // console.log("Error occurred in recognition: " + event.error);
    };
  }
  submitMessage = event => {
    event.preventDefault();
    this.props.onSendMessage(this.props.channelID, {
      message: this.state.message,
      type: "message"
    });
    this.setState({ message: "" });
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };
  render() {
    return (
      <div className="messageBox">
        <form onSubmit={this.submitMessage}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              name="message"
              value={this.state.message}
              onChange={this.handleChange}
              placeholder="send a message"
            />
          </div>

          <input type="submit" className="buttns" />

          <button className="buttns" onClick={this.toggleListen}>
            <FontAwesomeIcon icon={faMicrophone} />
          </button>
          <button className="buttns" onClick={this.onOpenModal}>
            <span>Images</span>
          </button>
        </form>

        <Modal open={this.state.open} onClose={this.onCloseModal} center>
          <ImageForm
            ascifymsg={this.ascifymsg}
            // handleImage={this.handleImage}
            closeModal={this.onCloseModal}
          />
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSendMessage: (channelID, message) =>
      dispatch(actionCreators.send_message(channelID, message))
  };
};
export default connect(
  null,
  mapDispatchToProps
)(SendMessage);
