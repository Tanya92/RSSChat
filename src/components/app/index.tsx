import * as React from 'react';
import './app.css';
import Header from '../header'
import Footer from "../footer";
import {Provider} from "react-redux";
import {store} from "~/store";
import LoginWrapper from "~/components/loginWrapper";
import {Actions} from "~/data/reducer";

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Header />
                <LoginWrapper/>
                <Footer />
            </Provider>
        );
    }
}


