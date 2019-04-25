import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import MenuIcon from '@material-ui/icons/Menu';
import Dropdown from './Dropdown';
import './CSS/Result.css';
import { withRouter } from 'react-router-dom';
import {MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {main:"#CCA6A7", light: "#CCA6A7"},
    secondary: {main:"#A0A5C6", light: "#A0A5C6"},
  },
});

const styles = {
  list: {
    width: "20vw"
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
    this.handleGrocery = this.handleGrocery.bind(this);
    this.handleDropdown = this.handleDropdown.bind(this);
    this.buttonManageList = this.buttonManageList.bind(this);
    this.returnSearch = this.returnSearch.bind(this);
    this.returnResults = this.returnResults.bind(this);
    this.handleSignout = this.handleSignout.bind(this);
    this.handleGrocery = this.handleGrocery.bind(this);

  }
  
  returnSearch() {
    //history redirects it and is appended to URL (i'm guessing)
    this.props.history.push('/Search')
  }

  returnResults() {
    //history redirects it and is appended to URL (i'm guessing)
    this.props.history.push('/Result')
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
      window.location.reload();
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
      <div className={classes.list} id="newlists">
        {/* <List> */}
          <Dropdown handleDropdown = {this.handleDropdown}/>
          <Button id="list" variant="outlined" size="small" color="primary" onClick={this.buttonManageList}>Manage List</Button>
          <Button id="retsp" variant="outlined" size="small" color="secondary" onClick={this.returnResults}>Return to Results</Button>
          <Button id="retsp"  onClick={this.returnSearch} variant="outlined" size="small" color="primary">Return to Search</Button>
          <Button id="grocery"  onClick={this.handleGrocery} variant="outlined" size="small" color="secondary">Grocery List</Button>

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
