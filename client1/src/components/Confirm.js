import React, { Component } from "react";
import { List, ListItem, Paper, Button, ListItemText  } from "@material-ui/core";


export class Confirm extends Component {
	restart = e => {
		e.preventDefault();
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
			values: { name, email, date, comment }
		} = this.props;
		return (
			<Paper style={this.props.style}>
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

export default Confirm;
