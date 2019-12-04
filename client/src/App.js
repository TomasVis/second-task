import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
state = {
    data: null
  };

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
    return (
      <div className="App">
                <form action="/feedbacks" method="post">
            <h3>Parašyk komentarą</h3>
            <input  type="text" name="name" placeholder="Vardas*"/>
            <input  type="email" name="email" placeholder="El.paštas*"/>
            <input  type="date" name="date" placeholder="date (yyyy-mm-dd)"/>
            <textarea  name="comment" rows="6" placeholder="Komentaras*" ></textarea>


            <input type="submit" value="Siųsti"/>
          </form>

{/*         Render the newly fetched data inside of this.state.data */}
        <p className="App-intro">{this.state.data}</p>
      </div>
    );
  }
}

export default App;