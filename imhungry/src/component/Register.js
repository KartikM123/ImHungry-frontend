import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import DvrOutlinedIcon from '@material-ui/icons/DvrOutlined';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
//all snackbar dependencies
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import classNames from 'classnames';
import {MuiThemeProvider, createMuiTheme, withTheme } from '@material-ui/core/styles';

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
//end block
//all the snackbar component elements
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
  const { classes, className, message, onClose, variant, ...other } = props;
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
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
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
const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {main:"#CCA6A7", light: "#CCA6A7"},
    secondary: {main:"#A0A5C6", light: "#A0A5C6"},
  },
});
const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);
//regular stuff
const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  button: {
    margin: theme.spacing.unit * 2,
    alignItems: 'center'
  },
  input: {
    display: 'none',
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'linear-gradient(180deg, #97A5CC 0%, #C7A6AA 50%, #C68076 100%), #F2F2F2',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: 'transparent',
    color: 'white'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    color: '#ffffff',
    fontFamily: 'Poppins'
  },
});

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      open: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
  }
  //snackbar stuff
    handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };
  //regular stuff
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value});
  }
  handleSubmit(event){
    event.preventDefault();
    console.log(this.state.username);
    console.log(this.state.password);
    console.log(this.state.email);
    let username = this.state.username;
    let password = this.state.password;
    let email = this.state.email;
    let address = official_link + "register?username=" + username + "&email=" + email + "&password=" + password ;
    var xhr = new XMLHttpRequest();
    var json_obj;
    //var status = false;
    xhr.open("POST",  address, true);
    xhr.onload = function(e){
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          json_obj = JSON.parse(xhr.responseText);
          //status = true; assignment does nothing?
          localStorage.setItem('id', json_obj.id);
          localStorage.setItem('username', json_obj.username);
          this.props.history.push('/Search')
          console.log(json_obj)
        } else if (xhr.status === 500 || xhr.status === 404 || xhr.status == 409){
          this.setState({ open: true });
        } else {
          console.error(xhr.status);
        }
      }
    }.bind(this);
    xhr.onerror = function(e) {
      console.error(xhr.statusText);
    };
    xhr.send(null);
  }
  handleSignIn(){
    this.props.history.push('/SignIn');
  }
  render(){
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <DvrOutlinedIcon />
          </Avatar>
          <h1 id="signin" component="h1" variant="h5">
            Registration
          </h1>
          <form className={classes.form} onSubmit = {this.handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input id="email" type ="email" name="email" autoComplete="email" onChange = {this.handleChange} autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input id="username" name="username" autoComplete="username" onChange = {this.handleChange}autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password"onChange = {this.handleChange} autoComplete="current-password" />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              value="register"
              id="register"
            >
              Register
            </Button>
          </form>
        <Button value="login"id="login" onClick={this.handleSignIn} variant="outlined" justify="center" className={classes.button}>
            Back to Sign in
        </Button>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          >
          <MySnackbarContentWrapper
          onClose={this.handleClose}
          variant="error"
          className={classes.margin}
          message="Username or email is already taken!"
          />
          </Snackbar>
        </Paper>
      </main>
      </MuiThemeProvider>
    );
  }
}
Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);