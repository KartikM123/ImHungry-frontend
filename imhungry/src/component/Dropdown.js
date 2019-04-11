import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import {MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './CSS/Dropdown.css';


const theme = createMuiTheme({
  palette: {
    primary: {main:"#C5796D", light: "#C5796D", dark: "#C5796D"},
  },
});


const styles = theme => ({
    formControl: {
      minWidth: 160,
    },


    menuItem:{
        overflow: 'visible',
        width: 160
    }

  });

class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resdrop: 'blank',
        };
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange = event => {
        this.setState({ resdrop: event.target.value });
        this.props.handleDropdown(event, event.target.value);
    };
  

    render() {
        const { classes } = this.props;

        return (
            <MuiThemeProvider theme={theme}>

                <div >
                    <FormControl id="listdrop" variant="outlined" className={classes.formControl}>

                       <Select
                            value={this.state.resdrop}
                            onChange={this.handleChange}
                            inputProps={{
                                name: 'resdrop',
                                id: 'resdrop' 
                            }}

                            input={
                                <OutlinedInput
                                    labelWidth={this.state.labelWidth}
                                    name="age"
                                    id="outlined-age-simple"
                                />
                            }
                        >
                        
                            <MenuItem className={classes.menuItem} value={"Favorite"}>Favorite</MenuItem>
                            <MenuItem className={classes.menuItem} value={"Explore"}>To Explore</MenuItem>
                            <MenuItem className={classes.menuItem} value={"NoShow"}>Do Not Show</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </MuiThemeProvider>

        );
    }
}
export default withStyles(styles)(Dropdown);

