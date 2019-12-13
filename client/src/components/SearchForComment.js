import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';



export class SearchForComment extends Component {
	continue = e => {
// constructs query string from fields entered to Form
let params = this.props.values;
let esc = encodeURIComponent;
let query = Object.keys(params)
    .map(k => esc(k) + '=' + esc(params[k]))
    .join('&');
    console.log(query)
		e.preventDefault();
		  	fetch('/feedbacks?'+query, {
			  method: "GET",
			  headers: {
			    'Content-type': 'application/json'
			  },
			  //body: JSON.stringify(this.props)
			})
.then((response) => console.log(response.json()))
//.then((response) => response.json())


		//PROCESS FORM //
		this.props.changeSearch();

	}


//searchName,searchEmail,searchDate,searchComment
	render(){
		console.log(this.props)
		const {values, handleChange}  = this.props;
		return(
			<MuiThemeProvider>
				<React.Fragment>
					<AppBar title="Ieškok komentarų" />
					<TextField 
						hintText="Pagal tekstą" 
						floatingLabelText="Tekstas"
						onChange={handleChange('searchText')}
						defaultValue={values.searchText}
					/>
					<br/>
					<TextField 
						hintText="Pagal datą" 
						floatingLabelText="Data"
						onChange={handleChange('searchDate')}
						defaultValue={values.searchDate}
					/>
					<br/>


					<RaisedButton
						label="Ieškoti"
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

export default SearchForComment



/*
let params = {
    parameter1: 'value_1',
    parameter2: 'value 2',
    parameter3: 'value&3' 
};

let esc = encodeURIComponent;
let query = Object.keys(params)
    .map(k => esc(k) + '=' + esc(params[k]))
    .join('&');*/