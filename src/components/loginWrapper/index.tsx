import {State} from "~/data/models";
import {connect} from "react-redux";
import Main from "~/components/main";
import Login from "~/components/login";
import * as React from 'react';

function mapStateToProps (state:State) {
    return {...state};
}

function LoginWrapper(props: State): JSX.Element {
    if (props.userName) {
        return <Main/>
    } else {
        return <Login/>
    }
}

export default connect(mapStateToProps)(LoginWrapper);
