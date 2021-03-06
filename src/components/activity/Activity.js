
import React, { useEffect, useState, useContext } from "react";
import classNames from 'classnames';
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { StoreContext } from "../../AppContext";
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getcurrentDate } from '../../utils';
import saveActivity from '../../api/saveActivity';
import { take } from 'rxjs/operators';

import { useHistory, useLocation } from "react-router-dom";
import './activity.scss';

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
    table: {
        width: '80vw',

    },
    header: {

    },
    button: {
        color: 'white',
        '& .MuiButton-root': {
            color: 'white'
        }
    }
}));
function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('better cognitive function', 0),
    createData('jogging', 200)

];
const Activity = () => {
    const history = useHistory();
    let location = useLocation();
    const [state, dispatch] = useContext(StoreContext);
    const [activityFormData, setActivityFormData] = useState({ action: '', cal: 0 });

    const classes = useStyles();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);

    }, []);
    const buildRequest = () => {

        return {

            userId: state.user,
            date: getcurrentDate(),
            ...activityFormData,
            cal: parseInt(activityFormData.cal),
            qty: 1,
            id: Math.floor(Math.random() * 1000)

        }

    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const activity = buildRequest();
        saveActivity(activity).pipe(take(1)).subscribe(res => {
            console.log("subscription return ", res);
        });


    };
    const handleChange = (evt) => {

        setActivityFormData({ ...activityFormData, [evt.target.name]: evt.target.value });

    };
    const activityClasses = classNames(
        {
            "xactive": loaded,
            "activity-wrapper": loaded,
            "initial-state": true
        }
    );
    const formClasses = classNames(
        {

            "form-wrapper": loaded,
            "initial-state": true
        }
    );
    return (
        <main className="activity-wraper">
            <div className={formClasses}>
                <form className={classes.root} onSubmit={handleSubmit} onChange={handleChange} noValidate autoComplete="off">
                    <Typography className={classes.header} variant="h5" gutterBottom>
                        Activity Tracking
                </Typography>

                    <TextField

                        label="Record an activity, mood, or ailment"
                        multiline
                        rows={2}
                        name="action"
                        placeholder="Enter something to keep track of"
                        variant="outlined"
                    />
                    <TextField
                        label="Calories Burned"
                        id="outlined-margin-normal"
                        name="cal"
                        className={classes.textField}
                        type="number"

                        variant="outlined"
                    />
                    <div className="btn-group">
                        <Button
                            variant="contained"
                            color="secondary"

                            className={classes.button}
                            startIcon={<ClearIcon />}
                        >
                            Clear
      </Button>
                        <Button
                            variant="contained"

                            color="primary"
                            type="submit"
                            className={classes.button}
                            startIcon={<SaveIcon />}
                        >
                            Save
      </Button>
                    </div>
                </form>


                <TableContainer className={classes.table} component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Activity</TableCell>
                                <TableCell align="right">Calories</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.calories}</TableCell>


                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </main>
    );
};


export default Activity;
