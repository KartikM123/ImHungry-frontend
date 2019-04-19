import React, { Component } from 'react';
import './CSS/Drawer.css';
import ReactPaginate from 'react-paginate';
import Dropdown from './Dropdown';
import Collage3 from './Collage3';
import ResultDrawer from './Drawer';

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
class Result extends Component {
    constructor(props) {
        super(props);
        console.log('REACHED');
        //We are saving the results data within the constructor of the Results.js
        let saved_link = official_link + "search-history?userid=" + localStorage.getItem('id') + "&searchterm=" + localStorage.getItem('query') + "&amount=" + localStorage.getItem('amount') + "&radius=" + localStorage.getItem('radius');
        console.log(saved_link);
        var xhr = new XMLHttpRequest();
        xhr.open("POST",  saved_link, false);
        xhr.send();
        if (xhr.status === 200){
            console.log("Success!!");
        }
        //CHANGE THIS LET TO CONNECT TO ENDPOINTS
        let test = false;

        const recipeLink = official_link +"/recipe?name="+  localStorage.getItem('query') + "&amount=" + localStorage.getItem('amount') +"&radius="+localStorage.getItem('radius')+"&userid=" + localStorage.getItem("id");   
        console.log(recipeLink);
        const restLink = official_link+ "/restaurant?name="+ localStorage.getItem('query') + "&amount=" + localStorage.getItem('amount') +"&radius="+localStorage.getItem('radius')+"&userid=" + localStorage.getItem("id");
        const collageLink = official_link + "/collage?searchTerm="+localStorage.getItem('query');
        console.log(recipeLink);
        console.log(restLink);
        console.log(collageLink);
        //TEST MODE
        const test1 = './JSON/recip.json';
        const test2 = './JSON/rest.json';
         
        var json1;
        var json2;
        //technically the following code can be done in any language
        if (test){
            fetch(test1).then(res => console.log(res));
            json1 = JSON.parse(test1, {encoding: "utf8"}, function(err, data){
             if(err){
                console.log(err)
             }              
             console.log(data);
            });
            json2 = JSON.parse(test2, {encoding: "utf8"}, function(err, data){
             if(err){
                console.log(err)
             }              
             console.log(data);
          });        
        } else {
            json1 = JSON.parse(this.loadData(recipeLink));
            json2 = JSON.parse(this.loadData(restLink));
            
             
            
        }

        this.state = {
            dropdownValue: 'blank',
            recdata: json1,
            resdata: json2,
            size: localStorage.getItem('amount'),
            collageLink: collageLink,
            perPage: 5, //just a default for now
            offset: 0,
            pageCount: Math.ceil(localStorage.getItem('amount')/5),
            indOnPage: [0, 5], //from result x to result y displayed

        };

        this.handlePageClick = this.handlePageClick.bind(this);

        
    }

    
    loadData(url) {
        const Http = new XMLHttpRequest();
        Http.open("GET", url, false);
        Http.send();
        if(Http.status === 200) {
           // console.log(Http.responseText)
            return Http.responseText;
        }
    }



    handlePageClick = data => {
        var selected = data.selected;
        var offset = selected;
        var ind1 = offset * this.state.perPage;
        var ind2 = Math.min(ind1+this.state.perPage, this.state.size);
        this.setState({ 
            offset: offset,
            indOnPage: [ind1, ind2]
        });
      };

   

    render() {
        if (localStorage.getItem('id') == -1){
            this.props.history.push('/SignIn');
        }
        let recrows = [];
        let resrows = [];
        
        console.log(JSON.parse(this.loadData(this.state.collageLink)));
        let images = JSON.parse(this.loadData(this.state.collageLink));
        for (var i = this.state.indOnPage[0]; i < this.state.indOnPage[1]; i++) {
            recrows.push(<RecipeRow recdata={this.state.recdata} counter={i} history={this.props.history} />)
            resrows.push(<RestaurantRow resdata={this.state.resdata} counter={i} history={this.props.history} />)
            
        }
        if (resrows.length == 0){
            resrows = ["EMPTY"]
        }
        return (
            <div className="Result">
                <div id="rstheader">
                    
                    <Collage3 images={images} id="collage" alt="collage"/>
                    <br/>
                    <div class="drawNtitle">
                        <ResultDrawer history={this.props.history}/>
                        <h1 id="rsttitle"> Results for: {localStorage.getItem('query')}</h1>
                    </div>
                    <div id="rstheader2">

                    </div>
                </div>
                <div className="col1"  style={{width:"40%", margin:"2.5%"}}>
                    <h2 id="reshead">Restaurants</h2>
                    {resrows}

                </div>
                <div className= "col2" style={{width:"40%", margin:"2.5%"}}>
                    <h2 id="rechead">Recipes</h2>
                    {recrows}
                </div>

                <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={0}
                    pageRangeDisplayed={4}
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                />
             

            </div>
        );
    }
}

class RestaurantRow extends Component {

    toResPage =(e)=> {
        console.log("previously was button4");
        console.log(e.currentTarget.id);
        localStorage.setItem('resid', e.currentTarget.id);

        this.props.history.push('/Restaurant')
    }


    render() {
        let row;
        let price;
        if (this.props.resdata.length > this.props.counter){
            const array = this.props.resdata[this.props.counter];
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

        
            row = <div className={"row"+this.props.counter%5} id={array.id} onClick={this.toResPage} style={{width:"100%"}}> 
                <img src="http://pngimg.com/uploads/star/star_PNG41507.png" alt="str" id="starimg"></img>
                <font id="star"> {array.rating} </font>
                <font className="restaurantname">{array.name}</font>
                <br></br>
                <small className="distance">Distance: {array.distance}</small>
                <br></br>
                <small className="address">Address: {array.address}</small>
                
                <small id="price">Price: {price}</small>

            </div>

    
        } else {
            if (this.props.counter%5==0){
            row = <div className="rowbad"  style={{width:"100%"}}>
                <font className="restaurantname" > No search results exists</font>

            </div>
            } else{
             row = <div style={{height:'0vh', width:'0vh'}}>

                </div>
            }
        }
        return row;
    }
}


class RecipeRow extends Component {

    toRecPage =(e)=> {
        console.log("was button5");
        console.log(e.currentTarget.id);
        localStorage.setItem('recid', e.currentTarget.id);

        this.props.history.push('/Recipe')
    }

    render() {
        let row;
        if (this.props.recdata.length > this.props.counter ){        
        const array = this.props.recdata[this.props.counter];
 
        row = <div className={"row"+this.props.counter%5}  id={array.id} onClick={this.toRecPage} style={{width:"100%"}}>
            <img src="http://pngimg.com/uploads/star/star_PNG41507.png" alt ="str" id="starimg"></img>
            <font id="star"> {array.id % 5} </font>
            <font className="recipename">{array.title}</font>
            <br></br>
            <small className="preptime">Prep Time: {array.prepTime} min</small>
            <br></br>
            <small className="cooktime">Cook Time: {array.cookTime} min</small>
        </div>

        }else {
            if (this.props.counter%5==0){
            row = <div className="rowbad" style={{width:"100%"}} >
                <font className="restaurantname"> No search results exists</font>

            </div>
            } else{
            row = <div style={{height:'0vh', width:'0vh'}}>

                </div>
            }
        }
        return row;
    }
}

export default Result;
