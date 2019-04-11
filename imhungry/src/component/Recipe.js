import React, { Component } from 'react';

import './CSS/Recipe.css';
import Dropdown from './Dropdown';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
//all snackbar dependencies
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import classNames from 'classnames';
const styles = theme => ({
  root: {
    alignItems: 'start',
  },
});
// this block is to help with testing
let link_address1 = "https://mysterious-refuge-36265.herokuapp.com/";
let link_address2 = "https://arcane-woodland-80551.herokuapp.com/";
let official_link;
//change the variable below to fit demo or testing
let link_value = 2;
if (link_value == 1){
   official_link = link_address1;
} else if (link_value == 2){
   official_link = link_address2;
}
// end block
//all the snackbar stuff will go below
const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
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
        <Fab onClick = {handle} color="default" aria-label="Add" className={classes.fab}>
            <AddIcon  variant = "outlined"/>
        </Fab>,
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

//This variable holds all of the toggled restaurant items
let newChecked = [];
class Recipe extends Component {
    constructor(props) {
        super(props);
        const link1 = official_link + "recipe/" + localStorage.getItem('recid');
        let json1 = JSON.parse(this.loadData(link1));


        this.state = {
            rcpdrop: 'blank',
            data: json1,
            destlist: 'blank',
            checked: [],
        };
        this.handleToggle = this.handleToggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.button2 = this.button2.bind(this);
        this.button3 = this.button3.bind(this);
        this.handleDropdown = this.handleDropdown.bind(this);
        this.handleAdd = this.handleAdd.bind(this);

    }
    handleAdd() {
        var xhr = new XMLHttpRequest();
        var url = official_link + 'grocery/addItems?userid=' + localStorage.getItem('id');
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log(xhr.responseText);
                this.props.history.push('/Grocery')
            }
        };
        var data = JSON.stringify(newChecked);
        xhr.send(data);
    }
    handleToggle = value => () => {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(value);
        newChecked = [...checked];

        if (currentIndex === -1) {
          newChecked.push(value);
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
        console.log(newChecked);
    };

    loadData(url) {
        const Http = new XMLHttpRequest();
        Http.open("GET", url, false);
        Http.send();
        if (Http.status == 200) {
            return Http.responseText;
        }
    }

    handleDropdown(event, value){
        this.setState({
            rstdrop: value
        });
    }
    addtolist(url) {
        const Http = new XMLHttpRequest();
        Http.open("POST", url, false);
        Http.setRequestHeader('Content-type', 'application/json;CHARSET=UTF-8');
        let json_send = JSON.stringify(this.state.data);
        console.log("sending ", json_send, " to ", url);
        Http.send(json_send);

        if (Http.status === 200) {
            console.log("sent")
        }else {
            console.log("not send because", Http.status);
        }

    
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    button2() {
        this.props.history.push('/Result')
    }

    button3() {

        // console.log(this.state.rstdrop);

        if (this.state.rstdrop != 'blank')
        {
            if (this.state.rstdrop == "Favorite"){
                this.state.rstdrop = "FAVORITE";
            } else if (this.state.rstdrop == "Explore"){
                this.state.rstdrop = "EXPLORE";
            } else if (this.state.rstdrop == "NoShow"){
                this.state.resdrop = "BLOCK";
            }
            this.state.destlist = official_link+"list/" + this.state.rstdrop + "/recipe?userId="+localStorage.getItem("id");
           this.addtolist(this.state.destlist);

        }
    }


    render() {
        const {classes} = this.props
        if (localStorage.getItem('id') === -1){
            this.props.history.push('/SignIn');
        }
        var prepTimeNew = this.state.prepTime;
        var cookTimeNew = this.state.cookTime;
        if (this.state.data.prepTime === null) {
            prepTimeNew = 0;
        }

        if (this.state.data.cookTime == null) {

            this.state.data.cookTime = 0;
        }

        let ingredients = this.state.data.ingredients.join(', ');
        let instructs = this.state.data.instructions.split(".");
        // console.log(instructs);

        let instructrows = [];
        for (var i = 0; i < instructs.length; i++)
        {
            instructrows.push(<p>{i+1}. {instructs[i]}</p>)
        }

        return (
            <div className="Recipe">

                <h1 id="rcptitle">{this.state.data.title}</h1>
                <div id="rcpbody">
                    <div id="rcpupper">
                        <img id="rcpimg" src={this.state.data.photoUrl} />

                            <div className="rcpbuttons">
                                <button id="rcpprint" onClick={() => window.print()} > Printable Version</button>
                            <br></br>
                            <button id="rcpsp" onClick={this.button2}>Return to Results Page</button>
                            <Dropdown handleDropdown = {this.handleDropdown}/>
                            <button id="rcplist" onClick={this.button3} > Add to List</button>
                            </div>

                    </div>

                    <div id="prep">
                        <p>Prep Time:</p>
                        <p>{this.state.data.prepTime} mins</p>
                    </div>
                    <div id="cook">
                        <p>Cook Time:</p>
                        <p>{this.state.data.cookTime} mins</p>
                    </div>
                    <br></br>
                    <p>Ingredients:</p>
                    <List className={classes.root}>
                    {this.state.data.ingredients.map(value => (
                    <ListItem key={value} role={undefined} dense button onClick={this.handleToggle(value)}>
                        <Checkbox
                          checked={this.state.checked.indexOf(value) !== -1}
                          tabIndex={-1}
                          disableRipple
                        />
                        <ListItemText primary={`${value + 1}`} />
                        </ListItem>
                        ))}
                    </List>
                    <br></br>
                    <p >Instructions:</p>
                    <p id="rcpinstruct">
                        {instructrows}
                    </p>
                </div>
                <Snackbar
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  open={this.state.open}
                  >
                  <MySnackbarContentWrapper
                  handle={this.handleAdd}
                  variant="success"
                  className={classes.margin}
                  message="Add items"
                  />
                </Snackbar>
            </div>
            
        );
    }
}
Recipe.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles) (Recipe);
