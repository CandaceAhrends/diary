
import React, { useEffect, useState, useContext } from "react";
import classNames from 'classnames';
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import login from "../../api/login";
import LoginIcon from '@material-ui/icons/LockOpen';
import { StoreContext } from "../../AppContext";
import { useHistory, useLocation } from "react-router-dom";
import { ErrorMessage } from "../error/ErrorMessage";
import { inputValidator } from "../../utils";
import './login.scss';

const LOGIN_ACTION = {
    type: 'LOGIN'
}

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '80vw',
            background: '#333'
        },
        display: 'flex',
        flexDirection: 'column'
    },
    header: {
        textAlign: 'center'
    },
    button: {
        color: 'white',
        height: '61px',
        fontSize: '1.23rem',
        textTransform: 'none',

    }
}));

const Login = () => {
    const history = useHistory();
    let location = useLocation();
    const [state, dispatch] = useContext(StoreContext);

    const [user, setUser] = useState({ name: "", pwd: "" });
    const [message, setMessage] = useState("");

    const [loaded, setLoaded] = useState(false);
    const classes = useStyles();
    useEffect(() => {
        const animateLoad = setTimeout(() => {
            setLoaded(true);
        }, 0);

        return () => {
            clearTimeout(animateLoad);
        };
    }, [state]);

    const handleSubmit = () => {


        const error = inputValidator(user.name);
        if (!error) {

            login(user).subscribe((res) => {

                if (res.success) {
                    const route = location.state || { from: '/' };
                    dispatch({
                        ...LOGIN_ACTION, payload: {
                            userName: user.name
                        }
                    })
                    history.push(route.from);
                }

                setMessage(res.message);
            });
        }
        else {
            setMessage(error);
        }

    };
    const handleChange = (evt) => {
        console.log("data changed >", evt.target.name, evt.target.value);
        const changedUser = { ...user, [evt.target.name]: evt.target.value };
        setUser(changedUser);
        console.log(changedUser);
    };
    const loginClasses = classNames(
        {
            "animate-load": loaded,
            "login": true
        }
    );
    return (
        <main className={loginClasses}>
            {state.isAuthenticated ? <p>{state.user} is Logged In</p> : <div>   <div class="login-container">




                <form className={classes.root} onChange={handleChange} noValidate autoComplete="off">
                    <Typography className={classes.header} variant="h5" gutterBottom>
                        Welcome
                </Typography>
                    <ErrorMessage errorMessage={message} hasError={true} ></ErrorMessage>

                    <TextField
                        label="User Name"

                        name="name"
                        className={classes.textField}


                        variant="outlined"
                    />
                    <TextField
                        label="Password"

                        className={classes.textField}

                        name="pwd"
                        variant="outlined"
                    />
                    <div className="btn-group">

                        <Button
                            variant="contained"

                            color="primary"
                            onClick={handleSubmit}
                            className={classes.button}
                            startIcon={<LoginIcon />}
                        >
                            Sign In
      </Button>
                    </div>
                </form>




            </div>
            </div>}



        </main>
    );
};


export default Login;
