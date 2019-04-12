import React, { Component } from 'react';

import './CSS/Grocery.css';
import Dropdown from './Dropdown';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router' 
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import green from '@material-ui/core/colors/green';

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
const styles1 = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});
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
      console.log(index);
      console.log(this.state.searches[index].searchTerm);
      console.log(this.state.searches[index].userId);
      console.log(this.state.searches[index].amount);
      console.log(this.state.searches[index].radius);
      localStorage.setItem('query', this.state.searches[index].searchTerm);
      localStorage.setItem('id', this.state.searches[index].userId);
      localStorage.setItem('amount', this.state.searches[index].amount);
      localStorage.setItem('radius', this.state.searches[index].radius);
      this.props.history.push('/Result');
    }
    render() {
        const {classes} = this.props
        if (localStorage.getItem('id') == -1){
            this.props.history.push('/SignIn');
        }
        return (
            <div className="Grocery">
                <p>Saved searches:</p>
                <List className={classes.root}>
                    {this.state.searches.map((value, index) => (
                    <ListItem dense button={true} key={index} role={undefined} onClick={event => this.handleSearch(index)}>
                        <ListItemText primary={'creation date: ' + `${this.state.searches[index].createdAt} `} />
                        <ListItemText primary={'search term: ' + `${this.state.searches[index].searchTerm} `} />
                        <ListItemText primary={'radius: ' + `${this.state.searches[index].radius} `} />
                        <ListItemText primary={'amount: ' + `${this.state.searches[index].amount} `} />
                    </ListItem>
                    ))}
                </List>
            </div>

        );
    }
}
SavedSearch.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles1) (SavedSearch);

