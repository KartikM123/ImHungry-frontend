import React, { Component } from 'react';

import './CSS/SavedSearch.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router' 
import ThumbnailCollage from './ThumbnailCollage';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
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
    width: "15vw",
    height: "9vh",
    marginLeft: "1vw",
    marginBottom: "5vh",
    display: "inline-block"

  },
  content:{
    padding: "0",
    marginTop: "1vh"
  },
  button: {
    width: "50%",
    fontFamily:"inherit",
    float: "right"
  }
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
    handleSearch(event, index) {
      localStorage.setItem('query', this.state.searches[index].searchTerm);
      localStorage.setItem('id', this.state.searches[index].userId);
      localStorage.setItem('amount', this.state.searches[index].amount);
      localStorage.setItem('radius', this.state.searches[index].radius);
      window.location.reload();
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
                     <ThumbnailCollage images={this.state.searches[index].collageList}/>

                    <ButtonBase className={classes.button} onClick={event => this.handleSearch(event, index)}>
                      <CardContent className={classes.content}>
                          {this.state.searches[index].searchTerm}
                      </CardContent>
                    </ButtonBase>

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

