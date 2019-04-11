import React, { Component } from 'react';

import './CSS/NoShow.css';

class NoShow extends Component {
    constructor(props) {
        super(props);

        const link1 = "http://localhost:8080/list/BLOCK";

        let json1 = JSON.parse(this.loadData(link1));
        console.log(json1);

               this.state = {
                   data: link1,
                   list2drop: 'blank'

               };

        this.handleChange = this.handleChange.bind(this);
        this.button1 = this.button1.bind(this);
        this.button2 = this.button2.bind(this);
        this.button3 = this.button3.bind(this);
    }

    loadData(url) {
        const Http = new XMLHttpRequest();
        Http.open("GET", url, false);
        Http.send();
        if (Http.status === 200) {
            let cookie = Http.getResponseHeader("Cookie");
            console.log(cookie);
            console.log("adf");

            return Http.responseText;
        }

 
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    button1() {
        if (this.state.list2drop !== 'blank') {
            this.props.history.push('/' + this.state.list2drop);
        }
    }

    button2() {
        this.props.history.push('/')
    }

    button3() {
        this.props.history.push('/Result')
    }

    render() {
        if (localStorage.getItem('id') == -1){
            this.props.history.push('/SignIn');
        }
        return (
            <div className="NoShow">

                        <h1 id="list2title">Do Not Show</h1>

  
                <div className="list2col">

                    {/*
                    <table>
                        <tbody>{this.state.data.map(function (item, key) {

                            return (
                                <tr key={key}>
                                    <td>{item.userId}</td>
                                    <td>{item.id}</td>
                                    <td>{item.title}</td>
                                    <td>{item.body}</td>
                                </tr>
                            )

                        })}</tbody>
                    </table>
                    */}
                </div>

                <div className="list2buttons">
                    <select id="list2drop" name="list2drop" onChange={this.handleChange} >
                        <option value="blank" selected></option>
                        <option value="Explore">To Explore</option>
                        <option value="Favorite">Favorite</option>
                    </select>
                    <br></br>
                    <button id="list2" onClick={this.button1} > Manage List</button>
                    <br></br>
                    <button id="list2rp" onClick={this.button3}>Return to Results Page</button>
                    <br></br>
                    <button id="list2sp" onClick={this.button2}>Return to Search Page</button>
                    <br></br>
                    <button id="list2remove"> Remove</button>
                    <br></br>
                    <button id="list2move"> Move</button>
                </div>
               
            </div>
        );
    }
}

export default NoShow;
