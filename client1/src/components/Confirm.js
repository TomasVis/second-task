import React, { Component } from "react";

import {
	Paper,
	Typography,
	TextField,
	Button,
	FormHelperText,
	ListItemText
} from "@material-ui/core";

import { List, ListItem } from "@material-ui/core";
import Card from "@material-ui/core/Card";

import AppBar from "@material-ui/core/AppBar";

export class FormUserDetails extends Component {
	restart = e => {
		e.preventDefault();
		//PROCESS FORM //
		this.props.changeStep();
	};
	//Formats Date object to YYYY-MM-DD format
	format = date => {
		var d = date.getDate();
		var m = date.getMonth() + 1;
		var y = date.getFullYear();
		return (
			"" + y + "-" + (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d)
		);
	};

	render() {
		const {
			values: { name, email, date, comment, style }
		} = this.props;
		return (
			<Paper style={style}>
				<AppBar title="Komentaras išsaugotas" />
				<List>
					<ListItem>
						<ListItemText primary={name} />
					</ListItem>
					<ListItem>
						<ListItemText secondary={email} />
					</ListItem>
					<ListItem>
						<ListItemText secondary={this.format(date)} />
					</ListItem>
					<ListItem>
						<ListItemText primary={comment} />
					</ListItem>
				</List>
				<br />
				<Button
					variant="contained"
					color="primary"
					onClick={this.restart}
				>
					Rašyti naują komentarą
				</Button>
			</Paper>
		);
	}
}
const styles = {
	button: {
		margin: 15
	}
};

export default FormUserDetails;
