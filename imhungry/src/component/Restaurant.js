import React, { Component } from 'react';
import RightDrawer from './RightDrawer';
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



    handleDropdown(event, value){
        this.setState({
            rstdrop: value
        });
    }
 


    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }


    render() {
        if (localStorage.getItem('id') == -1){
            this.props.history.push('/SignIn');
        }

        return (
            <div className="Restaurant">
                <div id="resTitleAndDraw">
                    <RightDrawer id="rd" history={this.props.history} resultType={"restaurant"} print={() =>window.print()} destList={this.state.destlist} offLink={official_link} data={this.state.data}/>
                    <h1 id="restitle" >{this.state.data.name}</h1>

                </div>
                <div id="wrapper">
                    <div id="resbody">
                        <p>Address: <a className="address" href={this.state.dest2}>{this.state.data.address}</a></p>                        
                        <p>Phone Number: {this.state.data.phoneNumber}</p>                      
                        <p>Website: <a className="web" href={this.state.data.websiteUrl} > { this.state.data.websiteUrl }</a></p>
                       
                    </div>
                </div>
            </div>

        );
    }
}

export default Restaurant;