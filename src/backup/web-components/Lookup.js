import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Comment";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#2E2E33",
    height: "250px",
    overflow: "scroll",
    overflowX: "hidden",
    color: "white"
  },
}));

export default function Lookup({ url, search }) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    console.log("web comp click", value);

    const myEvent = new CustomEvent("test_msg", {
      bubbles: true,  
      composed: true,  
      detail: {
        
        calories: 100,
        q: search,
      },
    });

    window.dispatchEvent(myEvent);
  };

  const dummydata = [
    {
      label: "Coffee",
      id: 100,
      nutrition: {
        calories: 0,
        caffiene: 12,
      },
    },
    {
      label: "Coffee test",
      id: 909,
      nutrition: {
        calories: 0,
        caffiene: 12,
      },
    },
    {
      label: "Coffee",
      id: 2,
      nutrition: {
        calories: 0,
        caffiene: 12,
      },
    },
    {
      label: "Coffee dummy data",
      id: 1,
      nutrition: {
        calories: 0,
        caffiene: 12,
      },
    },
  ];

  return (
    <List className={classes.root}>
      {dummydata.map((data) => {
       
        return (
          <ListItem
            key={data.id}
            role={undefined}
            dense
            button
            onClick={handleToggle(data.id)}
          >
            <ListItemText id={data.id} primary={data.label} />
            
          </ListItem>
        );
      })}
    </List>
  );
}
