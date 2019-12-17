import React, { Component } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import {
	Paper,
	Typography,
	TextField,
	Button,
	FormHelperText
} from "@material-ui/core";


//-----------------------------------------------
import "date-fns";

import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker
} from "@material-ui/pickers";

export class SearchForComment extends Component {
	continue = e => {
		//PROCESS FORM //
		this.props.changeSearch();
	};

	//searchName,searchEmail,searchDate,searchComment
	render() {
		//console.log(this.props)
		const { values, handleChange, handleDateChange, style } = this.props;
		return (
			<Paper style={style}>
				<FormHelperText>Tekstas</FormHelperText>
				<TextField
					placeholder="Pagal tekstą"
					onChange={handleChange("searchText")}
					defaultValue={values.searchText}
				/>
				<br />
				<FormHelperText>Data</FormHelperText>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<Grid container justify="space-around">
						<KeyboardDatePicker
							disableToolbar
							variant="inline"
							format="yyyy-MM-dd"
							margin="normal"
							id="date-picker-inline"
							label="Data Nuo:"
							value={values.searchDateFrom}
							onChange={handleDateChange("searchDateFrom")}
							KeyboardButtonProps={{
								"aria-label": "change date"
							}}
						/>
					</Grid>
				</MuiPickersUtilsProvider>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<Grid container justify="space-around">
						<KeyboardDatePicker
							disableToolbar
							variant="inline"
							format="yyyy-MM-dd"
							margin="normal"
							id="date-picker-inline"
							label="Data Iki:"
							value={values.searchDateTo}
							onChange={handleDateChange("searchDateTo")}
							KeyboardButtonProps={{
								"aria-label": "change date"
							}}
						/>
					</Grid>
				</MuiPickersUtilsProvider>
				<br />

				<Button
					variant="contained"
					color="primary"
					onClick={this.continue}
				>
					Ieškoti
				</Button>
			</Paper>
		);
	}
}

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
