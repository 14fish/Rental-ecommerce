import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import "./ProfileInfo.css";

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    fontSize: 13,
  },
});

export const ProfileInfo = ({ userData }) => {
  const classes = useStyles();
  const { firstname, lastname, email } = userData;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.pos} color='textSecondary'>
          name
        </Typography>
        <Typography variant='h6' component='p'>
          {firstname}
        </Typography>
        <Typography className={classes.pos} color='textSecondary'>
          surname
        </Typography>
        <Typography variant='h6' component='p'>
          {lastname}
        </Typography>
        <Typography className={classes.pos} color='textSecondary'>
          email
        </Typography>
        <Typography variant='h6' component='span'>
          {email}
        </Typography>
      </CardContent>
    </Card>
  );
};
