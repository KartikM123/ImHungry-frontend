import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


import './CSS/Search.css';
import {MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {main:"#b7525f", text:"#FFFFFF"},

    secondary: {main:"#FFFFFF"}
  },
});


class Search extends Component {
    constructor(props) {
        super(props);
               this.state = {
                   query: '',
                   amount: '5',
                   radius: '', 
                   open:true
                };
        //setting global parameters
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSignout = this.handleSignout.bind(this);
    }

    //state.open tracks whether or not button is pressed
        //only communicates with getImageName
    toggleImage = () => {
        this.setState(state => ({ open: !state.open }))
    }

    getImageName = () => this.state.open ? 'grumpy' : 'happy'

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        //when adding to database, we will want to cache THIS INFO
        localStorage.setItem('query', this.state.query);
        localStorage.setItem('amount', this.state.amount);
        localStorage.setItem('radius', this.state.radius);


        //res
        localStorage.setItem("Favoritea", []);
        localStorage.setItem("NoShowa", []);
        localStorage.setItem("Explorea", []);

        //rec
        localStorage.setItem("Favoriteb", []);
        localStorage.setItem("NoShowb", []);
        localStorage.setItem("Exploreb", []);


        event.preventDefault();

        this.props.history.push('/Result');

    }
    handleSignout(event){
        this.props.history.push('/SignIn');
    }


    render() {
        if (localStorage.getItem('id') === -1){
            this.props.history.push('/SignIn')
        }
        //this way the image name dynamically updates
        const imageName = this.getImageName();
        if (localStorage.getItem('id') === -1){
            this.props.history.push('/SignIn');
        }
        return (
            <MuiThemeProvider theme={theme}>
            
            <div className="Search">

                    <div id="form">
                    <h1 id="title">I'm Hungry</h1>
                    <form onSubmit={this.handleSubmit}>

                    <TextField
                        required
                        id="query"
                        label="Enter Food"
                        name="query"
                        onChange={this.handleChange}
                        value={this.state.query}
                        variant="outlined"

                        margin="normal"
                        />

                    <TextField
                        required
                        InputProps={{ inputProps: { min: 1, max: 1000 } }}
                        type="number"
                        id="amount"
                        label="Number of Results"
                        name="amount"
                        onChange={this.handleChange}
                        value={this.state.amount}
                        variant="outlined"

                        margin="normal"
                        />

                    <TextField
                        required
                        InputProps={{ inputProps: { min: 1, max: 10000000 } }}
                        type="number"
                        id="radius"
                        label="Search Radius"
                        name="radius"
                        onChange={this.handleChange}
                        value={this.state.radius}
                        variant="outlined"

                        margin="normal"
                        />  
                       
                            <br></br>
                            {/* <input type="submit" alt="pikachu" id="pik" onClick={this.toggleImage}
                                 value="Submit"/> */}
                            <Button type="submit" id="feedme" variant="contained" size="large" color="primary">Feed Me!</Button>
                    </form>

                    </div>
                    <Button id="signoutSearch" variant="outlined" onClick={this.handleSignout} size="small" color="primary">Sign Out</Button>

                    
            </div>
            </MuiThemeProvider>

            
        );
    }
}

export default Search;
