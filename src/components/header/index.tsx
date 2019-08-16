import './header.css';
import * as React from 'react';
import Button from "@material-ui/core/Button/Button";
import {State} from "~/data/models";
import {connect} from "react-redux";
import {actions, Actions} from "~/data/reducer";


function mapStateToProps(state: State) {
    return {...state};
}

class Header extends React.Component<State & Actions> {
    render() {  console.log(this.props.userName)
        return (
            <div className="header-container">
                <h1 className="header">Rolling Scopes School Chat</h1>
                <p className="user-name" hidden={!this.props.userName}>{this.props.userName}</p>
                <Button
                    variant="contained"
                    size="medium"
                    color="secondary"
                    className={this.props.userName ? "logOut-button": "logOut-button hidden-button"}
                    onClick={this.props.logout}
                >
                    LogOut
                </Button>
            </div>
        );
    }

}

export default connect(mapStateToProps, actions)(Header);

