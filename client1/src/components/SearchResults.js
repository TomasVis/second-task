import React, { Component } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";

import { List, ListItem, ListItemText, Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";

import AppBar from "@material-ui/core/AppBar";
import TextField from "@material-ui/core/TextField";
import RaisedButton from "@material-ui/core/Button";

export class FormUserDetails extends Component {
	restart = e => {
		e.preventDefault();
		//PROCESS FORM //
		this.props.changeStep();
	};

	componentDidMount() {
		this.callBackendAPI()
			//.then(res => console.log(res.body ))
			.then(res => this.props.handleData(res.body))
			.catch(err => console.log(err));
	}
	callBackendAPI = async () => {
		console.log(this.constructQuery());
		const response = await fetch("/feedbacks?" + this.constructQuery());
		const body = await response.json();

		if (response.status !== 200) {
			throw Error(body.message);
		}
		//console.log(body)
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
			values: { firstName, lastName, email, ocupation, city, bio }
		} = this.props;
		console.log(this.props);
		return (
			<div style={{display:"flex",flexWrap:"wrap",backgroundColor:"red"}}>
{/*				<p className="App-intro">
					{this.props.data !== null
						? this.props.data.map(el => el.values.name)
						: null}
				</p>*/}


				{this.props.data !== null
					? this.props.data.map(el => (
							<Card
								style={{ width: "250px",margin:"10px" }}
								key={el.date}
							>
								<List>
									<ListItem>
										<ListItemText
											primary={el.name}
										/>
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

				<br />
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
const styles = {
	button: {
		margin: 15
	}
};

export default FormUserDetails;
