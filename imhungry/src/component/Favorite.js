import React, { Component } from 'react';

import './CSS/Favorite.css';
import Dropdown from './Dropdown'
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
class Favorite extends Component {
    constructor(props) {
        super(props);
        let listWanted = localStorage.getItem("liststate");
        let userId = localStorage.getItem("id");
        console.log(listWanted);
        let keyword = "FAVORITE";
        if (listWanted === ("ToExplore") || listWanted === ("Explore") ){
            keyword = "EXPLORE";
        } else if (listWanted === ("NoShow")){
            keyword = "BLOCK";
        }
        const link1 = official_link + "/list/" + keyword + "?userId=" + userId;
        let json1 = JSON.parse(this.loadData(link1));
        console.log("HERE");
            console.log(json1);
        this.favelist = json1;
               this.state = {
                   data: json1.restaurants,
                   list1drop: listWanted,
                   opt1: 'blank',
                   opt2: 'blank',
                   title: keyword,
                   keyword: keyword
               };
        this.state.data.push.apply(json1.restaurants,json1.recipes)
        console.log(this.state.data);
        this.remanageDropdown();
        this.cleanTitle();
        this.handleChange = this.handleChange.bind(this);
        this.redirectList = this.redirectList.bind(this);
        this.returnSearch = this.returnSearch.bind(this);
        this.returnRes = this.returnRes.bind(this);
    }
    cleanTitle(){
        let tempState = localStorage.getItem("liststate");
        if (tempState === ("ToExplore") || tempState === ("Explore") ){
            this.state.title = "To Explore";
        } else if (tempState === ("NoShow")){
            this.state.title = "Do Not Show";
        } else{
            this.state.title = "Favorites"
        }
    }
    loadDataTest(url){
        var xhr = new XMLHttpRequest();

          xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                console.log("CALLBACK",xhr.response);
            } else{
                console.log("idk"); 
            }
          }
          xhr.open('GET', url, true);
         xhr.send('');
    }
    loadData(url) {
        const Http = new XMLHttpRequest();
        Http.open("GET", url, false);
       // Http.responseType = 'json';
        Http.send();
        if (Http.status == 200) {
            //cookie Issues! -- debug later!

           // let cookie = Http.getResponseHeader("Cookie");
           // console.log(cookie);
            //  console.log("adf");
 //           console.log(Http.response);
            return Http.response;
        } else{
            console.log("ERROR:", Http.status);
        }
        Http.onload = function() {
        if (Http.status == 200) {
            //cookie Issues! -- debug later!

           // let cookie = Http.getResponseHeader("Cookie");
           // console.log(cookie);
            //  console.log("adf");
            console.log(Http.response);
            let json1 = Http.response;
            console.log(json1);
            return json1;
        } else{
            console.log("ERROR:", Http.status);
        }
        }

 
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    redirectList() {
        if (!(this.state.list1drop == 'blank')) {
            //should just refresh the page
            localStorage.setItem("liststate",this.state.list1drop);
            this.props.history.push('/Favorite');
            console.log("refreshed localstorage to ", this.state.list1drop);
            this.remanageDropdown();
            window.location.reload();
        }
    }

    remanageDropdown(){
            let o1,o2;
        if (this.state.list1drop == 'NoShow'){
            o1="Favorite";
            o2="ToExplore";

        } else if (this.state.list1drop == 'ToExplore' || this.state.list1drop == 'Explore'){
            o1="Favorite";
            o2 ="NoShow";
        } else{
            o1="ToExplore";
            o2="NoShow";
        }

        // this.setState({
        //     opt1:o1,
        //     opt2:o2,
        //     list1drop:'blank'
        // });
        this.state.opt1 = o1;
        this.state.opt2 = o2;
        this.state.list1drop='blank';
    }

    returnSearch() {
        this.props.history.push('/')
    }

    returnRes() {
        this.props.history.push('/Result')
    }

    render() {

        let favelist = this.state.data;
        let faverows = [];
console.log("KEYWORD", this.state.keyword);
        for (var i = 0; i < favelist.length; i++) {
                console.log(favelist[i]);
            if (favelist[i].address == null) {

                faverows.push(<RecipeRow id={localStorage.getItem("id")} recdata={favelist[i]} currList={this.state.keyword} counter={i} history={this.props.history} />)
            }
            else {
                faverows.push(<RestaurantRow id={localStorage.getItem("id")} resdata={favelist[i]} currList={this.state.keyword} counter={i} history={this.props.history} />)
            }
        }

        return (
            <div className={localStorage.getItem("liststate")}>

                        <h1 id="list1title">{this.state.title}</h1>
  
                <div id="restContent" className="list1col">
                        {faverows}

                </div>

                <div className="list1buttons">
                    <select id="list1drop" name="list1drop" onChange={this.handleChange} >
                        <option value="blank" value></option>
                        <option value={this.state.opt1}>{this.state.opt1}</option>
                        <option value={this.state.opt2}>{this.state.opt2}</option>
                    </select>
                    <br></br>
                    <button id="list1" onClick={this.redirectList}>Manage List</button>
                    <br></br>
                    <button id="list1rp" onClick={this.returnRes}>Return to Results Page</button>
                    <br></br>
                    <button id="list1sp" onClick={this.returnSearch}>Return to Search Page</button>
                </div>
               
            </div>
        );
    }
}

class RestaurantRow extends Component {
    constructor(props) {
        super(props);
        this.state =  {
            ddown: 'blank'
        };
            this.deleteRes = this.deleteRes.bind(this);
            this.addRes= this.addRes.bind(this);

    }
    deleteRes(resid) {
        let url = official_link + "/list/" + this.props.currList + "/restaurant?userId=" + this.props.id + "&restaurantId=" + resid;
        console.log("deleting restaurant from ", url);
          const Http = new XMLHttpRequest();
        Http.open("DELETE", url, false);
        Http.send();
        if (Http.status === 200) {
            console.log("DELETE SUCCESSFUL");
        } else{
            console.log("DELETE UNSUCCESSFUL");
        }

    }

    addRes(resid, newList) {
         const Http = new XMLHttpRequest();
         let url = official_link + "list/" + newList + "/restaurant?userId="+ this.props.id;
         console.log("adding restaurant from ", url);
       Http.open("POST", url, false);
        Http.setRequestHeader('Content-type', 'application/json;CHARSET=UTF-8');
        let json_send = JSON.stringify(this.props.resdata);
        console.log("sending ", json_send, " to ", url);
        Http.send(json_send);


        if (Http.status === 200) {
            console.log("sent")
        }else {
            console.log("not send because", Http.status);
        }
    }
    button4 = (e) => {
        console.log("temp4");
        console.log(this.props.resdata.id);
        localStorage.setItem('resid', this.props.resdata.id);

        this.props.history.push('/Restaurant')
    }
    handleDropdown = (e, value) => {
        let newval = "blank";
        if (value == "Favorite"){
                newval = "FAVORITE";
            } else if (value == "Explore"){
                newval = "EXPLORE";
            } else if (value == "NoShow"){
                newval = "BLOCK";
            } 

        this.setState({
               ddown: newval
        });
    }
    move = (e) => {
        console.log("moving " + this.props.resdata.id + " to " + this.state.ddown);
        if (this.props.currList === this.state.ddown){
            console.log("LIST MUST CHANGE");
        } else if (this.state.ddown ==="blank"){
            console.log("please pick valid list");
        } else{
            this.deleteRes(this.props.resdata.id);
            this.addRes(this.props.resdata.id, this.state.ddown);
            window.location.reload();
        }
    }
    remove = (e) =>{
        console.log("removing " + this.props.resdata.id);
        this.deleteRes(this.props.resdata.id);
            window.location.reload();

    }

    render() {
        const array = this.props.resdata;
        let row;
        let price;

        if (array.priceRating === "EXPENSIVE") {
            price = "$$$";
        }
        else if (array.priceRating === "MODERATE") {
            price = "$$";
        }
        else if (array.priceRating === "INEXPENSIVE") {
            price = "$";
        }
        else {
            price = "";
        }

        if (this.props.counter % 2 === 0 ) {
            row = <div className="recrow1" id={array.id} >
                <img src="http://pngimg.com/uploads/star/star_PNG41507.png" alt="str" id="starimg"></img>
                <font id="star"> {array.rating} </font>
                <font onClick={this.button4}>{array.name}</font>
                <br></br>
                <small>Distance: {array.distance}</small>
                <br></br>
                <small>Address: {array.address}</small>

                <small id="price">Price: {price}</small>
                <Dropdown handleDropdown = {this.handleDropdown}/>
                <button onClick={this.move}> Move </button>
                <button  onClick={this.remove}> Remove </button>
            </div>

        }
        else {
            row = <div className="recrow2" id={array.id}  >
                <img src="http://pngimg.com/uploads/star/star_PNG41507.png" alt="str" id="starimg"></img>
                <font id="star"> {array.rating} </font>
                <font onClick={this.button4}>{array.name}</font>
                <br></br>
                <small>Distance: {array.distance}</small>
                <br></br>
                <small>Address: {array.address}</small>

                <small id="price">Price: {price}</small>               
                <Dropdown handleDropdown = {this.handleDropdown}/>
                             <button onClick={this.move}> Move </button>
                <button  onClick={this.remove}> Remove </button>
            </div>


        }
        return row;
    }
}


class RecipeRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ddown: 'blank'
        }
            this.deleteRec = this.deleteRec.bind(this);
            this.addRec= this.addRec.bind(this);
    }
    button5 = (e) => {
        console.log("temp5");
        console.log(this.props.recdata.id);
        localStorage.setItem('recid', this.props.recdata.id);

        this.props.history.push('/Recipe')
    }
    deleteRec(resid) {
        const Http = new XMLHttpRequest();
        let url = official_link + "list/" + this.props.currList + "/recipe?userId=" + this.props.id + "&recipeId=" + resid;
        console.log("deleting recipe from ", url);
        Http.open("DELETE", url, false);
        Http.send();
        if (Http.status === 200) {
            console.log("DELETE SUCCESSFUL");
        } else{
            console.log("DELETE UNSUCCESSFUL");
        }

    }

    addRec(resid, newList) {
         const Http = new XMLHttpRequest();
         let url = official_link + "list/" + newList + "/recipe?userId="+ this.props.id;
        console.log("adding recipe to ", url);
        Http.open("POST", url, false);
        Http.setRequestHeader('Content-type', 'application/json;CHARSET=UTF-8');
        let json_send = JSON.stringify(this.props.recdata);
        console.log("sending ", json_send, " to ", url);
        Http.send(json_send);


        if (Http.status === 200) {
            console.log("sent")
        }else {
            console.log("not send because", Http.status);
        }
    }
    handleDropdown = (e, value) => {
         let newval = "blank";
        if (value == "Favorite"){
                newval = "FAVORITE";
            } else if (value == "Explore"){
                newval = "EXPLORE";
            } else if (value == "NoShow"){
                newval = "BLOCK";
            } 
            this.setState({
                    ddown: newval
            });
    }
     move = (e) => {
        console.log("moving " + this.props.recdata.id + " to " + this.state.ddown);
        if (this.props.currList === this.state.ddown){
            console.log("LIST MUST CHANGE");
        } else if (this.state.ddown ==="blank"){
            console.log("please pick valid list");
        } else{
            this.deleteRec(this.props.recdata.id);
            this.addRec(this.props.recdata.id, this.state.ddown);
                
            window.location.reload();

        }

    }
    remove = (e) =>{
        console.log("removing " + this.props.recdata.id);
        this.deleteRec(this.props.recdata.id);
        window.location.reload();
    }

    render() {
        const array = this.props.recdata;
        let row;

        if (this.props.counter % 2 === 0) {
            row = <div className="recrow1" id={array.id} >
                <img src="http://pngimg.com/uploads/star/star_PNG41507.png" alt="str" id="starimg"></img>
                <font id="star"> {array.id % 5} </font>
                <font onClick={this.button5}>{array.title}</font>
                <br></br>
                <small>Prep Time: {array.prepTime} min</small>
                <br></br>
                <small>Cook Time: {array.cookTime} min</small>
                <Dropdown handleDropdown = {this.handleDropdown}/>
                                <button onClick={this.move}> Move </button>
                <button  onClick={this.remove}> Remove </button>
            </div>
        }
        else {
            row = <div className="recrow2" id={array.id} >
                <img src="http://pngimg.com/uploads/star/star_PNG41507.png" alt="str" id="starimg"></img>
                <font id="star"> {array.id % 5} </font>
                <font onClick={this.button5}>{array.title}</font>
                <br></br>
                <small>Prep Time: {array.prepTime} min</small>
                <br></br>
                <small>Cook Time: {array.cookTime} min</small>               
                <Dropdown handleDropdown = {this.handleDropdown}/>
                 
                <button onClick={this.move}> Move </button>
                <button  onClick={this.remove}> Remove </button>
            </div>


        }
        return row;
    }
} 

export default Favorite;