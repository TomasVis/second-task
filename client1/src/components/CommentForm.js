import React, { Component } from "react";
//import { MuiThemeProvider } from '@material-ui/core/styles';
import {
	Paper,
	Typography,
	TextField,
	Button,
	FormHelperText
} from "@material-ui/core";
//------------------------------------------
import "date-fns";

import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker
} from "@material-ui/pickers";

//import AppBar from "@material-ui/core/AppBar";

//import RaisedButton from "@material-ui/core/Button";

export class CommentForm extends Component {
	//Formats Date object to YYYY-MM-DD format
/*	format = date => {
		var d = date.getDate();
		var m = date.getMonth() + 1;
		var y = date.getFullYear();
		return (
			"" + y + "-" + (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d)
		);
	};*/

	continue = e => {
		e.preventDefault();
		fetch("/feedbacks", {
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify(this.props.values)
		}).then(response => response.json());

		//PROCESS FORM //
		this.props.changeStep();
	};
	//name,email,date,comment
	render() {
		console.log(this.props);
		const { values, handleChange, style, handleDateChange } = this.props;
		return (
			<Paper style={style}>
				<FormHelperText>Vardas</FormHelperText>
				<TextField
					placeholder="parašyk savo vardą"
					onChange={handleChange("name")}
					defaultValue={values.name}
				/>
				<br />
				<FormHelperText>El-paštas</FormHelperText>
				<TextField
					placeholder="parašyk savo elektroninį paštą"
					onChange={handleChange("email")}
					defaultValue={values.email}
				/>
				<br />
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<Grid container justify="space-around">
						<KeyboardDatePicker
						disabled
							disableToolbar
							variant="inline"
							format="yyyy-MM-dd"
							margin="normal"
							id="date-picker-inline"
							label="Šiandienos data"
							value={new Date()}
							onChange={handleDateChange("date")}
							KeyboardButtonProps={{
								"aria-label": "change date"
							}}
						/>
					</Grid>
				</MuiPickersUtilsProvider>
{/*				<TextField
					placeholder=""
					onChange={handleChange("date")}
					defaultValue={this.format(values.date)}
					disabled={true}
				/>*/}
				<br />
				<FormHelperText>Komentaras</FormHelperText>
				<TextField
					placeholder="parašyk komentarą"
					onChange={handleChange("comment")}
					defaultValue={values.comment}
					multiline={true}
					rows={6}
				/>
				<br />

				<Button
					variant="contained"
					color="primary"
					onClick={this.continue}
				>
					Siųsti
				</Button>
			</Paper>
		);
	}
}

export default CommentForm;
