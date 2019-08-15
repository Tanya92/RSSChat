import * as React from 'react';
import './app.css';
import Header from '../header'
import Footer from "../footer";
import Main from "../main";
import {Provider} from "react-redux";
import {store} from "~/store";

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Header />
                <Main/>
                <Footer />
            </Provider>
        );
    }
}


