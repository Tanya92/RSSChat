import * as React from 'react';
import './app.css';
import Header from '../header'
import Footer from "../footer";

export default class App extends React.Component {
    render() {
        return (
            <>
                <Header />
                <Footer />
            </>
        );
    }
}


