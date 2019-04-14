import React, { Component } from 'react';

import './CSS/Grocery.css';
import Dropdown from './Dropdown';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

//all snackbar dependencies
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import amber from '@material-ui/core/colors/amber';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
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


const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};



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
  warning: {
    backgroundColor: amber[700],
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

function MySnackbarContent(props) {
  const { handle, classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      } //change this later
      action={[
        <Button onClick = {handle} color="default" aria-label="Add" className={classes.fab}>
            <DeleteForeverOutlinedIcon id="delete"/>
        </Button>,
      ]}
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

//end snackbar component 
//This variable holds all of the toggled restaurant items
let newChecked = [];
class Grocery extends Component {
    constructor(props) {
        super(props);
        const link1 = official_link + "grocery?userid=" + localStorage.getItem('id');
        var data = JSON.parse(this.loadData(link1));
        var ingredients_List = new Array;
        var ingredients_Id = new Array;
        for(var i in data) {
            ingredients_List.push(data[i].ingredientValue);
            ingredients_Id.push(data[i].id);
        }
        console.log(ingredients_Id);
        console.log(ingredients_List);
        this.state = {
            ingredients_Id: ingredients_Id,
            ingredients_List: ingredients_List,
            data: data,
            checked: [],
        }
        this.loadData = this.loadData.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
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

        console.log(id);
        const { checked } = this.state;
        const currentIndex = checked.indexOf(id);
        newChecked = [...checked];
        if (currentIndex === -1) {
          newChecked.push(id);
        } else {
          newChecked.splice(currentIndex, 1);
        }
        this.setState({
          checked: newChecked,
        });

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
    };
    handleDelete() {

        console.log('REACHED');
        for (var i in this.state.checked) {
            var xhr = new XMLHttpRequest();
            var url = official_link + 'grocery/deleteItem?userid=' + localStorage.getItem('id') + '&ingredientid=' + this.state.checked[i];
            console.log(url);
            xhr.open("DELETE", url, false);
            xhr.send();
            if (xhr.status === 200){
                console.log("YEAHHHH");
            }
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
                    <ListItem key={this.state.data[index].id} role={undefined} dense button onClick={this.handleToggle(index, this.state.data[index].id)}>

                        <Checkbox
                          color="primary"
                          checked={this.state.checked.indexOf(this.state.data[index].id) !== -1}
                          tabIndex={-1}
                          disableRipple
                        />
                        <ListItemText primary={`${this.state.data[index].ingredientValue}`} />
                        </ListItem>
                        ))}
                    </List>
                    <Snackbar
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      open={this.state.open}
                      >
                      <MySnackbarContentWrapper
                      handle={this.handleDelete}
                      variant="error"
                      className={classes.margin}
                      message="Delete items"
                      />
                    </Snackbar>
            </div>

        );
    }
}
Grocery.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles1) (Grocery);

