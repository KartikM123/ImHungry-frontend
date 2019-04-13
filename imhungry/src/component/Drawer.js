import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import MenuIcon from '@material-ui/icons/Menu';
import Dropdown from './Dropdown';
import './CSS/Result.css';
import { withRouter } from 'react-router-dom';
import {MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
  palette: {
    primary: {main:"#CCA6A7", light: "#CCA6A7"},
    secondary: {main:"#A0A5C6", light: "#A0A5C6"},
  },
});

const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
};

class ResultDrawer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      left: false,
      dropdownValue: 'blank',
  
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDropdown = this.handleDropdown.bind(this);
    this.buttonManageList = this.buttonManageList.bind(this);
    this.returnSearch = this.returnSearch.bind(this);
    this.handleSignout = this.handleSignout.bind(this);
    this.handleGrocery = this.handleGrocery.bind(this);

  }
  
  returnSearch() {
    //history redirects it and is appended to URL (i'm guessing)
    this.props.history.push('/Search')
  }
  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  buttonManageList() {
    var liststate = this.state.dropdownValue;
    if (liststate != 'blank') {
        localStorage.setItem("liststate", liststate);
        this.props.history.push('/Favorite');
    }

}

  handleDropdown(event, value){
    this.setState({
        dropdownValue: value
    });
  }

  handleSignout(event){
    this.props.history.push('/SignIn');
  }

  handleGrocery(event){
    this.props.history.push('/Grocery');
  }

  handleChange(event) {
      this.setState({
          [event.target.name]: event.target.value
      });
  }

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        {/* <List> */}
          <Dropdown handleDropdown = {this.handleDropdown}/>
          <Button id="list" variant="outlined" size="small" color="primary" onClick={this.buttonManageList}>Manage List</Button>
          <Button id="retsp" variant="outlined" size="small" color="secondary" onClick={this.returnSearch}>Return to Search</Button>
          <Button id="grocery"  onClick={this.handleGrocery} variant="outlined" size="small" color="primary">Grocery List</Button>

          <Button id="signout"  onClick={this.handleSignout} size="small" color="primary">Sign Out</Button>

        {/* </List> */}

      </div>
    );


    return (
      <MuiThemeProvider theme={theme}>

        <div>
          <Button id="drawer" onClick={this.toggleDrawer("left", true)}><MenuIcon /></Button>
          <Drawer
            open={this.state.left}
            onClose={this.toggleDrawer("left", false)}
          >
            
              {sideList}
            
          </Drawer>
        </div>
      </MuiThemeProvider>
    );
  }
}

ResultDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ResultDrawer);
