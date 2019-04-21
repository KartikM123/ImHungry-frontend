import React, { Component } from 'react';

import './CSS/Grocery.css';
import Dropdown from './Dropdown';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import RightDrawerGrocery from './RightDrawerGrocery'


//will have to handle this page onload -> populate data on load
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


//All the snackbar components will go below




const styles1 = theme => ({
  success: {
    backgroundColor: "#97A5CC",
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },

  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});


let newChecked = [];
class Grocery extends Component {
    constructor(props) {
        super(props);
        const link1 = official_link + "grocery?userid=" + localStorage.getItem('id');
        var data = JSON.parse(this.loadData(link1));
        var ingredients_List = new Array;
        var ingredients_Id = new Array;
        var ingredients_checked = new Array;

        for(var i in data) {
            ingredients_List.push(data[i].ingredientString);
            ingredients_Id.push(data[i].id);
            if(data[i].checked){
              ingredients_checked.push(data[i].id);
            }
        }
        console.log(ingredients_Id);
        console.log(ingredients_List);
        this.state = {
            ingredients_Id: ingredients_Id,
            ingredients_List: ingredients_List,
            data: data,
            checked: ingredients_checked,
        }
        this.loadData = this.loadData.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    onClose(){

    }
    loadData(url) {
        const Http = new XMLHttpRequest();
        Http.open("GET", url, false);
        Http.send();
        if (Http.status === 200) {
            return Http.responseText;
        }
    }
    handleToggle = (index, id) => () => {
        const Http = new XMLHttpRequest();
       
        console.log(id);
        const { checked } = this.state;
        const currentIndex = checked.indexOf(id);
        newChecked = [...checked];
        if (currentIndex === -1) {
          url = official_link + "grocery/check?userid=" + localStorage.getItem('id')+"&ingredientid="+id;
          newChecked.push(id);
        } else {
          url = official_link + "grocery/uncheck?userid=" + localStorage.getItem('id')+"&ingredientid="+id;
          newChecked.splice(currentIndex, 1);
        }
        this.setState({
          checked: newChecked,
        });

        var url;
        if (newChecked.length > 0){
          this.setState({
              open: true,
          });
        }
        else {
          this.setState({
              open: false,
          });
        }
        Http.open("PUT", url, false);
        Http.send();
        if (Http.status === 200) {
            return Http.responseText;
        }
    };
    handleDelete= (index, id) => () => {

        console.log('REACHED');

        var xhr = new XMLHttpRequest();
        var url = official_link + 'grocery/deleteItem?userid=' + localStorage.getItem('id') + '&ingredientid=' + id;
        console.log(url);
        xhr.open("DELETE", url, false);
        xhr.send();
        if (xhr.status === 200){
            console.log("YEAHHHH");
        }
        
        window.location.reload();
    }
    render() {
        const {classes} = this.props
        if (localStorage.getItem('id') === -1){
            this.props.history.push('/SignIn');
        }
        return (
            <div className="Grocery">
                <RightDrawerGrocery history={this.props.history} resultType={"recipe"} print={() =>window.print()}/>
                <h1 id="rcptitle">Grocery List</h1>

                    <List id="groceryList" className={classes.root}>
                    {this.state.ingredients_Id.map((value, index) => (
                    <ListItem key={index} role={undefined} dense>

                        <Checkbox
                          color="primary"
                          checked={this.state.checked.indexOf(this.state.data[index].id) !== -1}
                          tabIndex={-1}
                          onClick={this.handleToggle(index, this.state.data[index].id)}
                        />
                        <ListItemText primary={`${this.state.data[index].ingredientString}`} />
                        <IconButton
                          key="close"
                          aria-label="Close"
                          color="inherit"
                          onClick={this.handleDelete(index, this.state.data[index].id)}
                        >
                          <CloseIcon/>
                        </IconButton>
                      </ListItem>

                        ))}
                    </List>
                    
            </div>

        );
    }
}
Grocery.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles1) (Grocery);

