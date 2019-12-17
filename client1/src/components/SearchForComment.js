import React, { Component } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import { Paper, Typography, TextField, Button, FormHelperText  } from "@material-ui/core";
import MaterialUIPickers from "./MaterialUIPickers.js";


export class SearchForComment extends Component {
	continue = e => {
		/*// constructs query string from fields entered to Form
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
*/

		//PROCESS FORM //
		this.props.changeSearch();
	};

	//searchName,searchEmail,searchDate,searchComment
	render() {
		//console.log(this.props)
		const { values, handleChange } = this.props;
		return (

						<Paper>
				<React.Fragment>
					<AppBar title="Ieškok komentarų" />
					<FormHelperText>Tekstas</FormHelperText>
					<TextField
						placeholder="Pagal tekstą"
						onChange={handleChange("searchText")}
						defaultValue={values.searchText}
					/>
					<br />
					<FormHelperText>Data</FormHelperText>
									<MaterialUIPickers />
					<TextField
						placeholder="Pagal datą"
						onChange={handleChange("searchDate")}
						defaultValue={values.searchDate}
					/>
					<br />

					<Button
						variant="contained"
						color="primary"
						onClick={this.continue}
					>
						Ieškoti
					</Button>
				</React.Fragment>
							</Paper>

		);
	}
}
const styles = {
	button: {
		margin: 15
	}
};

export default SearchForComment;

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
