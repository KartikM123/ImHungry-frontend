import React, { Component } from 'react';

import './CSS/SavedSearch.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router' 
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import RightDrawerGrocery from './RightDrawerGrocery';
import SearchHistoryCard from './SearchHistoryCard';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase'

// this block is to help with testing
let link_address1 = "https://mysterious-refuge-36265.herokuapp.com/";
let link_address2 = "https://arcane-woodland-80551.herokuapp.com/";
let official_link;
//change the variable below to fit demo or testing
let link_value = 2;
if (link_value === 1){
   official_link = link_address1;
} else if (link_value === 2){
   official_link = link_address2;
}
//For some reason the program breaks when we don't include this styles1 and the "withStyles(styles1)" on the bottom
const styles1 = {
  card: {
    width: "20vw",
    marginLeft: "1vw",
    marginBottom: "5vh",
    float: "left",

  },
};
class SavedSearch extends React.Component {
    constructor(props) {
        super(props);
        const link1 = official_link + "search-history?userid=" + localStorage.getItem('id');
        var data = JSON.parse(this.loadData(link1));
        console.log(data);
        this.state = {
          searches: data,
        }
        this.handleSearch = this.handleSearch.bind(this);
    }
    loadData(url) {
        const Http = new XMLHttpRequest();
        Http.open("GET", url, false);
        Http.send();
        if (Http.status === 200) {
            return Http.responseText;
        }
    }
    handleSearch(index) {
      localStorage.setItem('query', this.state.searches[index].searchTerm);
      localStorage.setItem('id', this.state.searches[index].userId);
      localStorage.setItem('amount', this.state.searches[index].amount);
      localStorage.setItem('radius', this.state.searches[index].radius);
      this.props.history.push('/Result');
    }
    render() {
        const { classes } = this.props;

        if (localStorage.getItem('id') == -1){
            this.props.history.push('/SignIn');
        }
        return (
            <div className="ssearch">
                {this.state.searches.map((value, index) => (
                  <Card className={classes.card}>
                    <CardContent>
                        {this.state.searches[index].searchTerm}
                    </CardContent>
                  </Card>
                ))}
            </div>

        );
    }
}
SavedSearch.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles1) (SavedSearch);

