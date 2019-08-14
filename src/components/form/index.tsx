import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

const fontSize = '1.3rem';


const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'stretch',
        margin: 'auto',
        width: '90%'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        flexGrow: 2
    },
    label: {
        fontSize: fontSize
    },
    input: {
        fontSize: fontSize,
        lineHeight: parseFloat(fontSize) + 0.1 + 'rem'
    },
    button: {

    },
    rightIcon: {
        marginLeft: theme.spacing(1),
    },
}), {
    index: 5
});

export default function Form():JSX.Element {
    const classes = useStyles({});

        return (
            <form className={classes.container}>
                <TextField
                    label="Write a message"
                    InputLabelProps={{'classes': {formControl: classes.label}}}
                    InputProps={{'classes': {inputMultiline: classes.input}}}
                    placeholder="Write a message"
                    multiline
                    className={classes.textField}
                    variant="outlined"
                />
                <Button variant="contained" color="primary" className={classes.button}>
                    Send
                    {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
                    <Icon className={classes.rightIcon}>send</Icon>
                </Button>
            </form>
        );

}
