import './main.css';
import * as React from 'react';
import Window from "../window";
import Form from "../form";

export default class Main extends React.Component<object> {
    render() {
        return (
            <main className="main-container">
                <Window/>
                <Form/>
            </main>
        );
    }
}
