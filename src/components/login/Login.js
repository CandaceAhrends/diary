
import React, { useEffect, useState, useContext } from "react";
import classNames from 'classnames';
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import login from "../../api/login";
import {StoreContext} from "../../AppContext";
import { useHistory, useLocation } from "react-router-dom";
import './login.scss';

const LOGIN_ACTION = {
    type: 'LOGIN'
}
const Login = () => {
    const history = useHistory();
    let location = useLocation();
    const [state, dispatch] = useContext(StoreContext);
  
    const [user, setUser] = useState({ name: "", pwd: "" });
    const [message, setMessage] = useState("please log in");

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);

    }, []);

    const handleSubmit = () => {
        
        login(user).subscribe((res) => {
            
              if(res.success){
                const route = location.state || { from: '/'};
                dispatch({
                    ...LOGIN_ACTION, payload: {
                        userName: user.name
                    }
                })
                history.push(route.from);
            }
              
            
          
            setMessage(res.message);
        });
    };
    const handleChange = (evt) => {
        console.log("data changed >", evt.target.name, evt.target.value);
        const changedUser = { ...user, [evt.target.name]: evt.target.value };
        setUser(changedUser);
        console.log(changedUser);
    };
    const loginClasses = classNames(
        {
            "active": loaded,
            "login-wrapper": true
        }
    );
    return (
        <main className={loginClasses}>
           {state.isAuthenticated?<p>{state.user} is Logged In</p>: <div>   <div class="login-container">
                <form class="login-form" onChange={handleChange} autoComplete="off">
                    <label htmlFor="name">User Name</label>
                    <TextField name="name" type="text" />
                    <label htmlFor="name">Password</label>
                    <TextField name="pwd" type="password" />
                    <Button color="primary" onClick={handleSubmit}>Sign In</Button>
                </form>
                {/* <div>{message}</div> */}
            </div>
            </div>}



        </main>
    );
};


export default Login;
