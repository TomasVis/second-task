import React, { Component } from "react";

import { List, ListItem, ListItemText, Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";

export class FormUserDetails extends Component {

	restart = e => {
		e.preventDefault();
		this.props.changeStep();
	};

	componentDidMount() {

		this.callBackendAPI()
			.then(res => this.props.handleData(res.body))
			.catch(err => console.log(err));
	}

	callBackendAPI = async () => {

		const response = await fetch("/feedbacks?" + this.constructQuery());
		const body = await response.json();

		if (response.status !== 200) {
			throw Error(body.message);
		}
		return body;
	};

	// constructs query string from fields entered to Form
	constructQuery = e => {
		let params = this.props.values;
		let esc = encodeURIComponent;
		let query = Object.keys(params)
			.map(k => esc(k) + "=" + esc(params[k]))
			.join("&");

		return query;
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


		return (
			<div>
				<div
					style={{
						display: "flex",
						flexWrap: "wrap"
					}}
				>
					{this.props.data !== null
						? this.props.data.map(el => (
								<Card
									style={{ width: "250px", margin: "10px" }}
									key={el.date}
								>
									<List>
										<ListItem>
											<ListItemText primary={el.name} />
										</ListItem>
										<ListItem>
											<ListItemText
												secondary={el.email}
											/>
										</ListItem>
										<ListItem>
											<ListItemText
												secondary={this.format(
													new Date(el.date)
												)}
											/>
										</ListItem>
										<ListItem>
											<ListItemText
												primary={el.comment}
											/>
										</ListItem>
									</List>
								</Card>
						  ))
						: null}
				</div>
				<Button
					variant="contained"
					color="primary"
					onClick={this.props.changeSearch}
				>
					Ieškoti iš naujo
				</Button>
			</div>
		);
	}
}


export default FormUserDetails;
