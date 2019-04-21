import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase'

const styles = {
  card: {
    width: "20vw",
    marginLeft: "1vw",
    marginBottom: "5vh",
    float: "left",

  },

  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

function SearchHistoryCard(props) { 

  const { classes } = props;
  return (
    <Card className={classes.card}>
            <CardContent>
                {props.searchTerm}
            </CardContent>
    </Card>
  );
}



export default withStyles(styles)(SearchHistoryCard);
