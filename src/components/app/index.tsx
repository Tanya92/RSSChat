import * as React from 'react';
import './app.css';
import Header from '../header'
import Footer from "../footer";
import Main from "../main";

export default class App extends React.Component {
    render() {
        return (
            <>
                <Header />
                <Main/>
                <Footer />
            </>
        );
    }
}


