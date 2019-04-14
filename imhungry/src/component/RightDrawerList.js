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
      right: false,
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

  returnResults() {
    //history redirects it and is appended to URL (i'm guessing)
    this.props.history.push('/Search')
  }
  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  buttonManageList() {
    if (!(this.state.dropdownValue == 'blank')) {
      //should just refresh the page
      localStorage.setItem("liststate",this.state.dropdownValue);
      this.props.history.push('/Favorite');
      console.log("refreshed localstorage to ", this.state.dropdownValue);
      this.remanageDropdown();
      window.location.reload();
  }


}


  remanageDropdown(){
    let o1,o2;
    if (this.state.dropdownValue == 'NoShow'){
      o1="Favorite";
      o2="ToExplore";

    } else if (this.state.dropdownValue == 'ToExplore' || this.state.dropdownValue == 'Explore'){
      o1="Favorite";
      o2 ="NoShow";
    } else{
      o1="ToExplore";
      o2="NoShow";
    }

    // this.setState({
    //     opt1:o1,
    //     opt2:o2,
    //     list1drop:'blank'
    // });
    this.state.opt1 = o1;
    this.state.opt2 = o2;
    this.state.dropdownValue='blank';
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
          <Button id="retsp" variant="outlined" size="small" color="secondary" onClick={this.returnResults}>Return to Results</Button>
          <Button id="grocery"  onClick={this.returnSearch} variant="outlined" size="small" color="primary">Return to Search</Button>

          <Button id="signout"  onClick={this.handleSignout} size="small" color="primary">Sign Out</Button>

        {/* </List> */}

      </div>
    );


    return (
      <MuiThemeProvider theme={theme}>

        <div>
          <Button id="rightDrawer2" onClick={this.toggleDrawer("right", true)}><MenuIcon /></Button>
          <Drawer
            anchor="right"
            open={this.state.right}
            onClose={this.toggleDrawer("right", false)}
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
