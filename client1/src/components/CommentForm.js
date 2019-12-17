import React, { Component } from 'react'
//import { MuiThemeProvider } from '@material-ui/core/styles';
import { Paper, Typography, TextField, Button, FormHelperText  } from "@material-ui/core";









import AppBar from '@material-ui/core/AppBar';

import RaisedButton from '@material-ui/core/Button';


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
			<Paper>

					<AppBar title="Parašyk komentarą" />
					<FormHelperText >Vardas</FormHelperText>
					<TextField 
						placeholder="parašyk savo vardą" 
						onChange={handleChange('name')}
						defaultValue={values.name}
					/>
					<br/>
										<FormHelperText >El-paštas</FormHelperText>
					<TextField 
						placeholder="parašyk savo elektroninį paštą" 
						onChange={handleChange('email')}
						defaultValue={values.email}
					/>
					<br/>
										<FormHelperText >Šiandienos data</FormHelperText>
					<TextField 

						placeholder="" 
						onChange={handleChange('date')}
						defaultValue={this.format(values.date)}
						disabled={true}
					/>
					<br/>
					<FormHelperText >Komentaras</FormHelperText>
					<TextField 
						placeholder="parašyk komentarą" 
						onChange={handleChange('comment')}
						defaultValue={values.comment}
						multiline="true"
						rows={6}
					/>
					<br/>
					       

										<Button
						variant="contained"
						color="primary"
						onClick={this.continue}
					>
						Siųsti
					</Button>

			</Paper>


		)
	}
}
const styles = {
	button:{
		margin:15
	}
}

export default CommentForm