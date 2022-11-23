import React from "react";
import { CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      background: "rgba(33, 122, 244, .1)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#217af4",
      height: "30%",
      outline: "1px solid slategrey",
    },
  },
});

const Spinner = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress thickness={4} size={100} color="primary" />
    </div>
  );
};

export default Spinner;
