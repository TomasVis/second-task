import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';




class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      data: null,
      name:"",
      email:"",
      date:"",
      comment:""
    };
  }




handleChange(e){
  //console.log( e.target.id)
  e.target.id === "name" ? this.setState({name:e.target.value}): 
  e.target.id === "email" ? this.setState({email:e.target.value}): 
  e.target.id === "date" ? this.setState({date:e.target.value}): 
  e.target.id === "comment" ? this.setState({comment:e.target.value}):
  this.setState({unknown:e.target.value})

}
/*  handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(data)
    
    fetch('/feedbacks', {
      method: 'POST',
      body: data,
    });
  }*/
  handleSubmit(e) {
  fetch('/feedbacks', {
  method: "POST",
  headers: {
    'Content-type': 'application/json'
  },
  body: JSON.stringify(this.state)
})
.then((response) => response.json())
.then((result) => {
  console.log(result)
})
}
  componentDidMount() {
      // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  render() {
      console.log(this.state)
    return (
      <div className="App">
            <form onSubmit={this.handleSubmit}>
        <label htmlFor="username">Enter username</label>
        <input id="username" name="username" type="text" />

        <label htmlFor="email">Enter your email</label>
        <input id="email" name="email" type="email" />

        <label htmlFor="birthdate">Enter your birth date</label>
        <input id="birthdate" name="birthdate" type="text" />

        <button>Send data!</button>
      </form>





      <form onSubmit={this.handleSubmit}>
        <label>
          Essay:
          <textarea name="name" placeholder="vardas" id="name" value={this.state.name} onChange={this.handleChange}  />
          <textarea placeholder="El paštas" id="email" value={this.state.email} onChange={this.handleChange} />
          <textarea placeholder="data" id="date" value={this.state.date} onChange={this.handleChange} />
          <textarea placeholder="komentaras" id="comment" value={this.state.comment} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>

{/*         Render the newly fetched data inside of this.state.data */}
        <p className="App-intro">{this.state.data}</p>
      </div>
    );
  }
}

export default App;