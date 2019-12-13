import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

//TODO fix text area multiline bug 
export class CommentForm extends Component {
	//Formats Date object to YYYY-MM-DD format
	 format = (date) => {
	    var d = date.getDate();
	    var m = date.getMonth() + 1;
	    var y = date.getFullYear();
	    return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
	}

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
						defaultValue={this.format(values.date)}
						disabled={true}
					/>
					<br/>

					<TextField 
						hintText="parašyk komentarą" 
						floatingLabelText="Komentaras"
						onChange={handleChange('comment')}
						defaultValue={values.comment}
						multiline="true"
						rows={6}
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