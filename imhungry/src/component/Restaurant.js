import React, { Component } from 'react';

import './CSS/Restaurant.css';
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
//end block
class Restaurant extends Component {
    constructor(props) {
        super(props);
        let id = localStorage.getItem("id");
        const link1 = official_link+"restaurant/" + localStorage.getItem('resid');
            console.log(id);
        let json1 = JSON.parse(this.loadData(link1));

        const dest1 = json1.address;
        const dest2 = dest1.replace(" ", "+");
        const link2 = "https://www.google.com/maps/dir/?api=1&origin=Tommy+Trojan&destination=" + dest2 + "&travelmode=car";

        const link3 = official_link + "list/";             //  listname/restaurant


        this.state = {
            resdrop: 'blank',
            data: json1,
            dest2: link2,
            destlist: link3

        };

        this.handleChange = this.handleChange.bind(this);
        this.button2 = this.button2.bind(this);
        this.addL = this.addL.bind(this);

    }

    loadData(url) {
        const Http = new XMLHttpRequest();
        Http.open("GET", url, false);
        Http.send();
        if (Http.status === 200) {
            console.log(Http.responseText)
            return Http.responseText;
        }
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

    button2() {
        this.props.history.push('/Result')
    }

    addL() {

        if (this.state.resdrop != 'blank')
        {
            if (this.state.resdrop == "Favorite"){
                this.state.resdrop = "FAVORITE";
            } else if (this.state.resdrop == "Explore"){
                this.state.resdrop = "EXPLORE";
            } else if (this.state.resdrop == "NoShow"){
                this.state.resdrop = "BLOCK";
            }
            this.state.destlist = official_link+"list/" + this.state.resdrop + "/restaurant?userId="+localStorage.getItem("id");
           this.addtolist(this.state.destlist);

        }

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }


    render() {
        return (
            <div className="Restaurant">
                <h1 id="restitle" >{this.state.data.name}</h1>
                <div id="wrapper">
                    <div id="resbody">
                        <p>Address:</p>

                        <a class="address" href={this.state.dest2}>{this.state.data.address}</a>
                        <br/>
                        <p>Phone Number:</p>
                        <p class = "phoneNumber">{this.state.data.phoneNumber}</p>
                        <br/>
                        <p>Website:</p>
                        <a class="web" href={this.state.data.websiteUrl} > { this.state.data.websiteUrl }</a>
                        <br/>

                    </div>

                    <div className="resbuttons">
                        <button id="resprint" onClick={() => window.print()}>Printable Version</button>
                        <br></br>
                        <button id="resrp" onClick={this.button2}>Return to Results Page</button>
                        <br></br>
                        <select id="resdrop" name="resdrop" onChange={this.handleChange}>
                            <option value="blank" value></option>
                            <option value="Favorite">Favorites</option>
                            <option value="Explore">To Explore</option>
                            <option value="NoShow">Do Not Show</option>
                        </select>
                        <br></br>
                        <button id="reslist" onClick={this.addL}>Add to List</button>
                    </div>
                </div>
            </div>

        );
    }
}

export default Restaurant;