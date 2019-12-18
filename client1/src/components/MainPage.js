import React, { Component } from "react";
import CommentForm from "./CommentForm";
import Confirm from "./Confirm";
import SearchForComment from "./SearchForComment";
import SearchResults from "./SearchResults";

export class MainPage extends Component {
	state = {
		data: null,
		step: true,
		controlSearch: true,
		name: "",
		email: "",
		date: new Date(),
		comment: "",
		searchText: "",
		searchDateFrom: null,
		searchDateTo: null
	};

	//Controler for coment form and confirmation
	changeStep = () => {
		const { step } = this.state;
		step
			? this.setState({
					step: !step
			  })
			: this.setState({
					step: !step,
					name: "",
					email: "",
					date: "",
					comment: ""
			  });
	};
	//Controler for search form and search results
	changeSearch = () => {
		const { controlSearch } = this.state;
		controlSearch
			? this.setState({
					controlSearch: !controlSearch
			  })
			: this.setState({
					controlSearch: !controlSearch,
					searchText: "",
					searchDateFrom: null,
					searchDateTo: null,
					data:null
			  });
	};
	handleData = e => {
		this.setState({
			data: e
		});
	};
	//handle change
	handleChange = input => e => {
		this.setState({ [input]: e.target.value });
	};
	//different than handleChange because date picker event does not have target
	handleDateChange = input => e => {
		this.setState({ [input]: e });
	};

	render() {
		const {
			step,
			controlSearch,
			name,
			email,
			date,
			comment,
			searchText,
			searchDateFrom,
			searchDateTo,
			data
		} = this.state;
		const values = { name, email, date, comment };
		const SearchValues = { searchText, searchDateFrom, searchDateTo };

		return (
			<div style={{display:"flex",
			flexDirection:"column",alignItems:"center"}}>
				{step ? (
					<CommentForm
						style={styles.paper}
						changeStep={this.changeStep}
						handleChange={this.handleChange}
						handleDateChange={this.handleDateChange}
						values={values}
					/>
				) : (
					<Confirm
						style={styles.paper}
						changeStep={this.changeStep}
						handleChange={this.handleChange}
						values={values}
					/>
				)}
				{controlSearch ? (
					<SearchForComment
						style={styles.paper}
						changeSearch={this.changeSearch}
						handleChange={this.handleChange}
						handleDateChange={this.handleDateChange}
						values={SearchValues}
					/>
				) : (
					<SearchResults
						changeSearch={this.changeSearch}
						handleData={this.handleData}
						handleChange={this.handleChange}
						values={SearchValues}
						data={data}
					/>
				)}
			</div>
		);
	}
}

export default MainPage;

const styles = {
	paper: {
		margin: 15,
		display: "flex",
		flexDirection: "column",
		width: "250px"
	}
};

