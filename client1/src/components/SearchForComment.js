import React, { Component } from "react";
import { Paper, TextField, Button, Grid, Typography } from "@material-ui/core";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker
} from "@material-ui/pickers";

export class SearchForComment extends Component {
	continue = e => {
		this.props.changeSearch();
	};

	render() {
		const { values, handleChange, handleDateChange, style } = this.props;
		return (
			<Paper style={style}>
				<Typography variant="h5" component="h2">
					Paieška
				</Typography>
				<TextField
					placeholder="Pagal tekstą"
					onChange={handleChange("searchText")}
					defaultValue={values.searchText}
				/>
				<br />

				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<Grid container justify="space-around">
						<KeyboardDatePicker
							disableToolbar
							variant="inline"
							format="yyyy-MM-dd"
							margin="normal"
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
