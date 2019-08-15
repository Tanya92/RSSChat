import './footer.css';
import * as React from 'react';

export default class Footer extends React.Component<object> {
    render() {
        return (
            <footer className="footer-container">
                <p className="author-name">Author: Tatsiana Mironchyk</p>
                <div className="links-container">
                    <div className="icons-container">
                        <a href="https://github.com/Tanya92" target="_blank" className="info-link">
                            <img src="../assets/github-logo.svg" alt="github_icon" className="icon"/>
                        </a>
                        <a href="https://t.me/tatsiana_mironchyk" target="_blank" className="info-link">
                            <img src="../assets/telegram.svg" alt="telegram_icon" className="icon"/>
                        </a>
                        <a href="mailto:tatiana_mironchik@tut.by" target="_blank" className="info-link">
                            <img src="../assets/mail_logo.svg" alt="mail_icon" className="icon"/>
                        </a>
                    </div>
                    <a href="mailto:tatiana_mironchik@tut.by" target="_blank" className="info-link email-link">
                        <span className="mail-info">(tatiana_mironchik@tut.by)</span>
                    </a>
                </div>
            </footer>
        );
    }

}
