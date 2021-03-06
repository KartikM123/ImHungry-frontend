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

import RightDrawer from './RightDrawer';

//all snackbar dependencies
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import amber from '@material-ui/core/colors/amber';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import Button from '@material-ui/core/Button';
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
    backgroundColor: "#97A5CC",
  },
  error: {
    backgroundColor: theme.palette.error.white,
  },
  info: {
    backgroundColor: theme.palette.primary.white,
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
            <AddIcon id="add" style={{color: "white"}} color="inherit"/>
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
                // this.props.history.push('/Grocery')
            }
        };
        var data = JSON.stringify(this.state.checked);
        xhr.send(data);
        this.setState({
          checked: [],
          open: false
        })
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




    render() {

        const {classes} = this.props
        if (localStorage.getItem('id') == -1){

            this.props.history.push('/SignIn');
        }

        if (this.state.data.prepTime === null) {
            this.state.prepTime = 0;
        }

        if (this.state.data.cookTime == null) {
            this.state.data.cookTime = 0;
        }

        let instructs = this.state.data.instructions.split(".");

        let instructrows = [];
        for (var i = 0; i < instructs.length; i++)
        {
            instructrows.push(<p key={i}>{i+1}. {instructs[i]}</p>)
        }

        return (
            <div className="Recipe">
                <RightDrawer history={this.props.history} resultType={"recipe"} print={() =>window.print()} destList={this.state.destlist} offLink={official_link} data={this.state.data}/>

                <h1 id="rcptitle">{this.state.data.title}</h1>
                <div id="rcpbody">
                    <div id="rcpupper">
                        <img id="rcpimg" src={this.state.data.photoUrl} />
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
                    <List className={classes.root} id="ing">
                      {this.state.data.ingredients.map((value, index) => (
                      <ListItem key={index} role={undefined} dense button onClick={this.handleToggle(value)}>
                          <Checkbox
                            color="primary"
                            checked={this.state.checked.indexOf(value) !== -1}
                            tabIndex={-1}
                            disableRipple
                          />
                          <ListItemText primary={`${value}`} />
                          </ListItem>
                          ))}
                    </List>
                    <br></br>
                    <p >Instructions:</p>
                    <div id="rcpinstruct">
                        {instructrows}
                    </div>
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
