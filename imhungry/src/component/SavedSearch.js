import React, { Component } from 'react';

import './CSS/SavedSearch.css';
import Dropdown from './Dropdown';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router' 
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import RightDrawerGrocery from './RightDrawerGrocery';

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
      // console.log(index);
      // console.log(this.state.searches[index].searchTerm);
      // console.log(this.state.searches[index].userId);
      // console.log(this.state.searches[index].amount);
      // console.log(this.state.searches[index].radius);
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
                <RightDrawerGrocery history={this.props.history} />
                <h1 id="sstitle" >Search History</h1>
                <Table className={classes.table} id="searchTable">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date Searched</TableCell>
                      <TableCell align="right">Search Term</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="right">Radius</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {this.state.searches.map((value, index) => (
                      <TableRow button={true} key={index} role={undefined} onClick={event => this.handleSearch(index)}>
                        <TableCell component="th" scope="row">
                        {`${this.state.searches[index].createdAt}`}
                        </TableCell>
                        <TableCell align="right">{`${this.state.searches[index].searchTerm}`}</TableCell>
                        <TableCell align="right">{`${this.state.searches[index].amount}`}</TableCell>
                        <TableCell align="right">{`${this.state.searches[index].radius}`}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
            </div>

        );
    }
}
SavedSearch.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles1) (SavedSearch);

