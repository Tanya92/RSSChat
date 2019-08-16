import './window.css';
import * as React from 'react';
import {connect} from "react-redux";
import {Message, State} from "~/data/models";
import {Actions, actions} from "~/data/reducer";
import {Ref, RefObject} from "react";

class Window extends React.Component<State & Actions> {
    messagesContainer:RefObject<HTMLDivElement> = React.createRef();

    scrollWindow = () => {
        const element = this.messagesContainer.current;
        element.scrollTop = element.scrollHeight;
    };

    componentDidMount() {
        this.props.connect();
        this.scrollWindow();
    }

    componentDidUpdate() {
       this.scrollWindow();
    }

    formatMessage = (message: Message) => {
        return {
            __html: message.message.replace(/\n/g, '<br/>')
        }

    };

    showMessage = (message: Message) => {
        const date = new Date(message.time);
        const options = {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric',
            hour12: false
        };

        return (
            <div style={{display: 'flex', justifyContent: this.props.userName === message.from ? 'flex-end': 'flex-start'}} key={message.id}>
                <div className={this.props.userName === message.from ? "new-message my-message": "new-message"}>
                    <span className="message-time">{date.toLocaleString('ru-RU', options)}</span>
                    <span className="message-author">
                        {this.props.userName === message.from ? `${message.from} (Me)`: message.from}
                    </span>
                    <span className="message-info" dangerouslySetInnerHTML={this.formatMessage(message)}/>
                </div>
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

