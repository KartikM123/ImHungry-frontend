import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import MenuIcon from '@material-ui/icons/Menu';
import Dropdown from './Dropdown';
import './CSS/Drawer.css';
import {MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';


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

class RightDrawerGrocery extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      right: false,
      dropdownValue: 'blank',
      destlist: this.props.destList,
      official_link:this.props.offLink

  
    };
    this.handleChange = this.handleChange.bind(this);
    this.returnToResult = this.returnToResult.bind(this);
    this.handleSignout = this.handleSignout.bind(this);



  }
  
  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  print(url) {
    var printWindow = window.open("##");
    printWindow.addEventListener('load', function(){
        printWindow.print();
        printWindow.close();
    }, true);
  }

  returnToResult() {
    this.props.history.push('/Result');
  }

  handleSignout(event){
    this.props.history.push('/SignIn');
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
        <Button  id="resprint" onClick={this.print} variant="outlined" size="small" color="secondary" >Printable Version</Button>
        <Button id="resrp" onClick={this.returnToResult} variant="outlined" size="small" color="primary">Return to Results</Button>
        <Button id="signout"  onClick={this.handleSignout} size="small" color="primary">Sign Out</Button>
      </div>
    );


    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <Button id="rightDrawer" onClick={this.toggleDrawer("right", true)}><MenuIcon /></Button>
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

RightDrawerGrocery.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RightDrawerGrocery);
