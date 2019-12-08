import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


export class CommentForm extends Component {
	continue = e => {
		e.preventDefault();
		  	fetch('/feedbacks', {
			  method: "POST",
			  headers: {
			    'Content-type': 'application/json'
			  },
			  body: JSON.stringify(this.props)
			})
.then((response) => response.json())

		//PROCESS FORM //
		this.props.changeStep();

	}

	render(){
		console.log(this.props)
		const {values, handleChange}  = this.props;
		return(
			<MuiThemeProvider>
				<React.Fragment>
					<AppBar title="Parašyk komentarą" />
					<TextField 
						hintText="Enter Your Ocupation" 
						floatingLabelText="Ocupation"
						onChange={handleChange('ocupation')}
						defaultValue={values.ocupation}
					/>
					<br/>
					<TextField 
						hintText="Enter Your City" 
						floatingLabelText="City"
						onChange={handleChange('city')}
						defaultValue={values.city}
					/>
					<br/>
					<TextField 
						hintText="Enter Your Bio" 
						floatingLabelText="Bio"
						onChange={handleChange('bio')}
						defaultValue={values.bio}
					/>
					<br/>
					<RaisedButton
						label="Siųsti"
						primary={true}
						style={styles.button}
						onClick={this.continue}
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

export default CommentForm