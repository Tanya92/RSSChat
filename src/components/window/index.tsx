import './window.css';
import * as React from 'react';
import {connect} from "react-redux";
import {Message, State} from "~/data/models";
import {Actions, actions} from "~/data/reducer";
import {Ref, RefObject} from "react";

class Window extends React.Component<State & Actions> {
    messagesContainer:RefObject<HTMLDivElement> = React.createRef();

    componentDidMount() {
        this.props.connect();
    }

    componentDidUpdate() {
       const element = this.messagesContainer.current;
       element.scrollTop = element.scrollHeight;
    }

    showMessage(message: Message) {
        const date = new Date(message.time);
        const options = {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric',
            hour12: false
        };

        return (
            <div className="new-message" key={message.id}>
                <span className="message-time">{date.toLocaleString('ru-RU', options)}</span>
                <span className="message-author">{message.from}</span>
                <span className="message-info">{message.message}</span>
            </div>
        )
    }
    render() {
        return (
            <div className="window">
                <div className="messages"
                     ref={this.messagesContainer}
                >
                    {this.props.messages.map(this.showMessage)}
                </div>
            </div>
        );
    }
}

function mapStateToProps (state:State) {
  return {...state};
}

export default connect(mapStateToProps, actions)(Window);

