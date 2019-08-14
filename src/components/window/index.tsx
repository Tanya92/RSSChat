import './window.css';
import * as React from 'react';

export default class Window extends React.Component<object> {
    render() {
        return (
            <div className="window">
                <div className="messages"></div>
            </div>
        );
    }
}
