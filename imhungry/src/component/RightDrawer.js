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

class RightDrawer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      right: false,
      dropdownValue: 'blank',
      destlist: this.props.destList,
      official_link:this.props.offLink

  
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleGrocery = this.handleGrocery.bind(this);
    this.returnToResult = this.returnToResult.bind(this);
    this.handleDropdown = this.handleDropdown.bind(this);
    this.buttonManageList = this.buttonManageList.bind(this);
    this.handleSignout = this.handleSignout.bind(this);
    this.addToList = this.addToList.bind(this);
    this.sendList = this.sendList.bind(this);



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
  buttonManageList() {
    var liststate = this.state.dropdownValue;
    if (liststate !== 'blank') {
        localStorage.setItem("liststate", liststate);
        this.props.history.push('/Favorite');
    }

}

  returnToResult() {
    this.props.history.push('/Result');
  }

  handleDropdown(event, value){
    this.setState({
        dropdownValue: value
    });
  }

  handleGrocery(event){
    this.props.history.push('/Grocery');
  }
  handleSignout(event){
    this.props.history.push('/SignIn');
  }
  handleChange(event) {
      this.setState({
          [event.target.name]: event.target.value
      });
  }

  addToList() {

    if (this.state.dropdownValue != 'blank')
        {
            if (this.state.dropdownValue == "Favorite"){
                this.state.dropdownValue = "FAVORITE";
            } else if (this.state.dropdownValue == "Explore"){
                this.state.dropdownValue = "EXPLORE";
            } else if (this.state.dropdownValue == "NoShow"){
                this.state.dropdownValue = "BLOCK";
            }
            this.state.destlist = this.state.official_link+"list/" + this.state.dropdownValue + "/"+this.props.resultType+"?userId="+localStorage.getItem("id");
           this.sendList(this.state.destlist);
           console.log(this.state.destlist);
          } else{
            console.log('WHAT');
          }

  }

  sendList(url) {
    const Http = new XMLHttpRequest();
      Http.open("POST", url, false);
      Http.setRequestHeader('Content-type', 'application/json;CHARSET=UTF-8');
      let json_send = JSON.stringify(this.props.data);
      console.log("sending ", json_send, " to ", url);
      Http.send(json_send);


      if (Http.status === 200) {
          console.log("sent")
      }else {
          console.log("not send because", Http.status);
      }

  
  }

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <Button  id="resprint" onClick={this.print} variant="outlined" size="small" color="secondary" >Printable Version</Button>
        <Button id="resrp" onClick={this.returnToResult} variant="outlined" size="small" color="primary">Return to Results</Button>
        <Dropdown handleDropdown = {this.handleDropdown}/>
        <Button id="reslist" onClick={this.addToList} variant="outlined" size="small" color="secondary">Add to List</Button> 
        <Button id="grocery"  onClick={this.handleGrocery} variant="outlined" size="small" color="primary">Grocery List</Button>
    
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

RightDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RightDrawer);
