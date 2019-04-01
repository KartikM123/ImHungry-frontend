import React, { Component } from 'react';

import './CSS/Recipe.css';
import Dropdown from './Dropdown';


//will have to handle this page onload -> populate data on load

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
class Recipe extends Component {
    constructor(props) {
        super(props);

        const link1 = official_link + "recipe/" + localStorage.getItem('recid');
        let json1 = JSON.parse(this.loadData(link1));


        this.state = {
            rcpdrop: 'blank',
            data: json1,
            destlist: 'blank'
        };

        this.handleChange = this.handleChange.bind(this);
        this.button2 = this.button2.bind(this);
        this.button3 = this.button3.bind(this);
        this.handleDropdown = this.handleDropdown.bind(this);



    }

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

        console.log(this.state.rstdrop);

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

        if (this.state.data.prepTime == null) {
            this.state.data.prepTime = 0;
        }

        if (this.state.data.cookTime == null) {

            this.state.data.cookTime = 0;
        }

        let ingredients = this.state.data.ingredients.join(', ');

        let instructs = this.state.data.instructions.split(".");
        console.log(instructs);

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
                    <p>{ingredients}</p>
                    <br></br>
                    <p >Instructions:</p>
                    <p id="rcpinstruct">
                        {instructrows}
                    </p>
                </div>


            </div>
        );
    }
}

export default Recipe;
