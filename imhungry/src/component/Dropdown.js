import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import {MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './CSS/Dropdown.css';


const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
      },
  palette: {
    primary: {main:"#C5796D", light: "#C5796D", dark: "#C5796D"},
  },
});


const styles = theme => ({
    formControl: {
      width: "15vw",
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
            labelWidth:0
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
                            id="resdrop"
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
                        
                            <MenuItem className={classes.menuItem} id="fav" value={"Favorite"}>Favorites</MenuItem>
                            <MenuItem className={classes.menuItem} id="toExplore" value={"Explore"}>To Explore</MenuItem>
                            <MenuItem className={classes.menuItem} id="noShow" value={"NoShow"}>Do Not Show</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </MuiThemeProvider>

        );
    }
}
export default withStyles(styles)(Dropdown);

