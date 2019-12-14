import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import {Card} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';




export class FormUserDetails extends Component {


	restart =  e => {
		e.preventDefault();
		//PROCESS FORM //
		this.props.changeStep();

	}

componentDidMount(){

    this.callBackendAPI()
      //.then(res => console.log(res.body ))
      .then(res => this.props.handleData(res.body ))
      .catch(err => console.log(err));


}
  callBackendAPI = async () => {
  	console.log(this.constructQuery())
    const response = await fetch('/feedbacks?'+this.constructQuery());
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    //console.log(body)
    return body;
  };
// constructs query string from fields entered to Form
  	constructQuery = (e) => {
		
		let params = this.props.values;
		let esc = encodeURIComponent;
		let query = Object.keys(params)
	    .map(k => esc(k) + '=' + esc(params[k]))
	    .join('&');

    return query

	}


	render(){
		
		const {values:{firstName,lastName,email,
			ocupation, city, bio} }  = this.props;
			console.log(this.props.data)
		return(

			<MuiThemeProvider>
			<React.Fragment>
						<p className="App-intro">{this.props.data !== null ? this.props.data.map(el => el.values.name):null}</p>

					<AppBar title="Rasti Komentarai" />
					{this.props.data !== null ? this.props.data.map(el => 
						<Card key = {el.values.date}>
							<ListItem

								primaryText = {el.values.name}
							/>
							<ListItem

								secondaryText = {el.values.email}
							/>
							<ListItem

								primaryText = {el.values.comment}
							/>
							<ListItem

								secondaryText = {el.values.date}
							/>

						</Card>

					):null}
					
					<br/>

					<RaisedButton
						label="Confirm & Continue"
						primary={true}
						style={styles.button}
						onClick={this.restart}
					/>

				</React.Fragment>
			</MuiThemeProvider>


		)
	}
}
const styles = {
	button:{
		margin:15
	}
}

export default FormUserDetails