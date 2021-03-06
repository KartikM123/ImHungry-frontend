import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import {ExpandMore, ExpandLess} from '@material-ui/icons';
import RightDrawerList from './RightDrawerList'
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
        console.log("KEYWORD: ", keyword);
        const link1 = official_link + "list/" + keyword + "?userId=" + userId;
        let json1 = JSON.parse(this.loadData(link1));
        console.log("HERE");
            console.log(json1);
        this.favelist = json1;
               this.state = {
                   data: json1,
                   list1drop: listWanted,
                   opt1: 'blank',
                   opt2: 'blank',
                   title: keyword,
                   keyword: keyword,
                   link:link1
               };
        console.log(this.state.data);
        this.cleanTitle();
    
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
            return Http.response;
        } else{
            console.log("ERROR:", Http.status);
        }
        Http.onload = function() {
        if (Http.status == 200) {

            console.log(Http.response);
            let json1 = Http.response;
            console.log(json1);
            return json1;
        } else{
            console.log("ERROR:", Http.status);
        }
        }

 
    }


    render() {

        if (localStorage.getItem('id') == -1){
            this.props.history.push('/SignIn');
        }


        let favelist = this.state.data.items;

        let faverows = [];
        console.log("KEYWORD", this.state.keyword);
        console.log(this.state.data);
        for (var i = 0; i < favelist.length; i++) {
                console.log(favelist[i]);
            if (favelist[i].type == "recipe") {
                faverows.push(<RecipeRow id={localStorage.getItem("id")} url={this.state.link} data={this.state.data} total={favelist} recdata={favelist[i]} currList={this.state.keyword} counter={i} history={this.props.history} />)
            }
            else {
                faverows.push(<RestaurantRow id={localStorage.getItem("id")} url={this.state.link} data={this.state.data} total={favelist} resdata={favelist[i]} currList={this.state.keyword} counter={i} history={this.props.history} />)
            }
        }

        return (
            <div className={localStorage.getItem("liststate")}>
                <RightDrawerList history={this.props.history} resultType={"recipe"} print={() =>window.print()} />
                <h1 id="list1title">{this.state.title}</h1>
  
                <div id="restContent" className="list1col">{faverows}</div>         
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
            this.Up= this.Up.bind(this);
            this.Down= this.Down.bind(this);
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
        console.log("adding restaurant to ", url);
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
    Up() {
        if(this.props.counter==0){
            //quick exit impossible up
            return;
        }
        const Http = new XMLHttpRequest();
        let init_value = this.props.counter;
        let next_value = this.props.counter-1;
        let total = this.props.total;
        let url = this.props.url;
         //swap logic
         let temp = total[init_value];
         total[init_value] = total[next_value];
         total[next_value] = temp;
         this.props.data.items = total;
         //now send total
 
         Http.open("PUT", url, false);
         Http.setRequestHeader('Content-type', 'application/json;CHARSET=UTF-8');
         // Http.responseType = 'json';
         console.log("PUTTING UP TO ", url , " with ", this.props.data);
         Http.send(JSON.stringify(this.props.data));
        // Http.send(total);
         if (Http.status == 200) {
             console.log("SUCCESS");
             window.location.reload();
         } else{
             console.log("ERROR:", Http.status);
         }
         Http.onload = function() {
         if (Http.status == 200) {
 
             console.log(Http.response);
             let json1 = Http.response;
             console.log(json1);
             return json1;
         } else{
             console.log("ERROR:", Http.status);
         }
         }
 

    }
    Down() {
        if(this.props.counter==this.props.total.length-1){
            //quick exit impossible down
            return;
        }
        const Http = new XMLHttpRequest();
        let init_value = this.props.counter;
        let next_value = this.props.counter+1;
        let total = this.props.total;
        let url = this.props.url;

        //swap logic
        let temp = total[init_value];
        total[init_value] = total[next_value];
        total[next_value] = temp;
        this.props.data.items = total;
        //now send total

        Http.open("PUT", url, false);
        Http.setRequestHeader('Content-type', 'application/json;CHARSET=UTF-8');
        // Http.responseType = 'json';
        console.log("PUTTING DOWN TO ", url , " with ", this.props.data);
        Http.send(JSON.stringify(this.props.data));
        if (Http.status == 200) {
            console.log("SUCCESS");
           window.location.reload();
        } else{
            console.log("ERROR:", Http.status);
        }
        Http.onload = function() {
        if (Http.status == 200) {

            console.log(Http.response);
            let json1 = Http.response;
            console.log(json1);
            return json1;
        } else{
            console.log("ERROR:", Http.status);
        }
        }

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
        let style = "row0"
        if (this.props.counter % 2 === 1 ) {
            style = "row2"
        }
        let uniqid = "res" + this.props.counter;
            row = <div className={style} class={"row"+this.props.counter%5} id={uniqid} style={{height:"fit-content"}}>
                    <img src="http://pngimg.com/uploads/star/star_PNG41507.png" alt="str" id="starimg"></img>
                    <font id="star"> {array.rating} </font>
                   
                    <font onClick={this.button4}>{array.name}</font>
                    <br></br>
                    <small>Distance: {array.distance}</small>
                    <br></br>
                    <small>Address: {array.address}</small>

                    <small id="price">Price: {price}</small>               
                    <Dropdown handleDropdown = {this.handleDropdown}/>
                    <div id="mvbuttons" >
                        <Button id="moveres" variant="contained" size="small" onClick={this.move}> Move </Button>
                        <Button id="removeres" variant="contained" size="small" onClick={this.remove}> Remove </Button>
                    
                        <Button onClick = {this.Up} id="upres" >
                            <ExpandLess/>
                        </Button>
                        <Button onClick = {this.Down} id="downres">
                            <ExpandMore/>
                        </Button>  
                    </div>             
                </div>


        
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
            this.Up= this.Up.bind(this);
            this.Down= this.Down.bind(this);
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

    Up() {
        if(this.props.counter==0){
            //quick exit impossible up
            return;
        }
        console.log("hmm",this.props.data);
        const Http = new XMLHttpRequest();
        let init_value = this.props.counter;
        let next_value = this.props.counter-1;
        let total = this.props.total;
        let url = this.props.url;
         //swap logic
         let temp = total[init_value];
         total[init_value] = total[next_value];
         total[next_value] = temp;
         this.props.data.items = total;
         //now send total
 
         Http.open("PUT", url, false);
         Http.setRequestHeader('Content-type', 'application/json;CHARSET=UTF-8');
         // Http.responseType = 'json';

         console.log("PUTTING UP TO ", url , " with ", this.props.data);
          Http.send(JSON.stringify(this.props.data));
         if (Http.status == 200) {
             console.log("SUCCESS");
            window.location.reload();
         } else{
             console.log("ERROR:", Http.status);
         }
         Http.onload = function() {
         if (Http.status == 200) {
 
             console.log(Http.response);
             let json1 = Http.response;
             console.log(json1);
             return json1;
         } else{
             console.log("ERROR:", Http.status);
         }
         }
 

    }
    Down() {
        if(this.props.counter==this.props.total.length-1){
            //quick exit impossible down
            return;
        }
        const Http = new XMLHttpRequest();
        let init_value = this.props.counter;
        let next_value = this.props.counter+1;
        let total = this.props.total;
        let url = this.props.url;

        //swap logic
        let temp = total[init_value];
        total[init_value] = total[next_value];
        total[next_value] = temp;
        this.props.data.items = total;
        //now send total

        Http.open("PUT", url, false);
        Http.setRequestHeader('Content-type', 'application/json;CHARSET=UTF-8');
        // Http.responseType = 'json';
         console.log("PUTTING DOWN TO ", url , " with ", this.props.data);
        Http.send(JSON.stringify(this.props.data));
        if (Http.status == 200) {
            console.log("SUCCESS");
            window.location.reload();
        } else{
            console.log("ERROR:", Http.status);
        }
        Http.onload = function() {
        if (Http.status == 200) {

            console.log(Http.response);
            let json1 = Http.response;
            console.log(json1);
            return json1;
        } else{
            console.log("ERROR:", Http.status);
        }
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
        let style = "row0";
        if (this.props.counter % 2 === 1) {
            style = "row2";
        }
        let uniqid = "rec" + this.props.counter;
            row = <div className={style} class={"row"+this.props.counter%5} id={uniqid} style={{height:"fit-content"}}>
                <img src="http://pngimg.com/uploads/star/star_PNG41507.png" alt="str" id="starimg"></img>
                <font id="star"> {array.id % 5} </font>

                <br/>
                <font onClick={this.button5}>{array.title}</font>
                <br></br>
                <small>Prep Time: {array.prepTime} min</small>
                <br></br>
                <small>Cook Time: {array.cookTime} min</small>               
                <Dropdown class="move" handleDropdown = {this.handleDropdown}/>
                 
                <div id="mvbuttons" >
                    <Button id="moverec" variant="contained" size="small" onClick={this.move}> Move </Button>
                    <Button id="removerec" variant="contained" size="small" onClick={this.remove}> Remove </Button>
                    
                    <Button onClick = {this.Up} id="uprec" >
                        <ExpandLess/>
                    </Button>
                    <Button onClick = {this.Down} id="downrec" >
                        <ExpandMore/>
                    </Button>
                </div>
            </div>


        
        return row;
    }
} 

export default Favorite;