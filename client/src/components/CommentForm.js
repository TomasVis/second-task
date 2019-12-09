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
//name,email,date,comment
	render(){
		console.log(this.props)
		const {values, handleChange}  = this.props;
		return(
			<MuiThemeProvider>
				<React.Fragment>
					<AppBar title="Parašyk komentarą" />
					<TextField 
						hintText="parašyk savo vardą" 
						floatingLabelText="Vardas"
						onChange={handleChange('name')}
						defaultValue={values.name}
					/>
					<br/>
					<TextField 
						hintText="parašyk savo elektroninį paštą" 
						floatingLabelText="El-paštas"
						onChange={handleChange('email')}
						defaultValue={values.email}
					/>
					<br/>
					<TextField 
						hintText="" 
						floatingLabelText="Šiandienos data"
						onChange={handleChange('date')}
						defaultValue={values.date}
					/>
					<br/>
					<TextField 
						hintText="parašyk komentarą" 
						floatingLabelText="Komentaras"
						onChange={handleChange('comment')}
						defaultValue={values.comment}
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