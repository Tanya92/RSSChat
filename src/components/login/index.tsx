import * as React from "react";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {State} from "~/data/models";
import {connect} from "react-redux";
import {Actions, actions} from "~/data/reducer";
import {FormEvent} from "react";

const fontSize = "1.3rem";

const useStyles = makeStyles(theme => ({
    main: {
        width: '90%',
        margin: 'auto'
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        flexGrow: 2,
        maxWidth: '800px',
        fontSize: fontSize,
    },
    label: {
        fontSize: fontSize
    },
}), {
    index: 2
});

function mapStateToProps (state:State) {
  return {...state};
}


function Login(props: Actions): JSX.Element {
    const classes = useStyles({});

    function onSubmit(event: FormEvent): void {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const input = form.login;
        props.setUserName(input.value);
    }

    return (
      <main className={classes.main}>
          <form className={classes.container} onSubmit={onSubmit}>
              <TextField
                  label="Write a user name"
                  InputLabelProps={{'classes': {formControl: classes.label}}}
                  placeholder="Write a user name"
                  className={classes.textField}
                  variant="outlined"
                  name="login"
                  required
              />
              <Button variant="contained" color="primary" type="submit">
                  LogIn
              </Button>
          </form>
      </main>
    );
}

export default connect(mapStateToProps, actions)(Login);
