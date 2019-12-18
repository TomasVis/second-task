import React, { Component } from "react";
import {
	Paper,
	TextField,
	Button,
	FormHelperText,
	Grid
} from "@material-ui/core";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker
} from "@material-ui/pickers";

export class CommentForm extends Component {
	continue = e => {
		e.preventDefault();
		fetch("/feedbacks", {
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify(this.props.values)
		}).then(response => response.json());

		this.props.changeStep();
	};

	render() {
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
