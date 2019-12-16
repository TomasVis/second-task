import React, { Component } from "react";
import CommentForm from "./CommentForm";
import Confirm from "./Confirm";
import SearchForComment from "./SearchForComment";
import SearchResults from "./SearchResults";
import MaterialUIPickers from "./MaterialUIPickers.js";
/*import FormUserDetails from './FormUserDetails'
import FormPersonalDetails from './FormPersonalDetails'
import Confirm from './Confirm'
import Success from './Success'*/

export class MainPage extends Component {
	state = {
		data: null,
		step: true,
		controlSearch: true,
		name: "",
		email: "",
		date: new Date(
			new Date().getFullYear(),
			new Date().getMonth(),
			new Date().getDate()
		),
		comment: "",
		searchText: "",
		searchDate: ""
	};
	/*	  componentDidMount() {

      // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.body }))
      .catch(err => console.log(err));
  }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/feedbacks');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

*/

	//Go back to previous step
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
	changeSearch = () => {
		const { controlSearch } = this.state;
		controlSearch
			? this.setState({
					controlSearch: !controlSearch
			  })
			: this.setState({
					controlSearch: !controlSearch,
					searchText: "",
					searchDate: ""
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

	render() {
		//console.log(this.state.data)
		const { step, controlSearch } = this.state;
		const {
			name,
			email,
			date,
			comment,
			searchText,
			searchDate,
			data
		} = this.state;
		const values = { name, email, date, comment };
		const SearchValues = { searchText, searchDate };
		const searchData = data;
		console.log(this.props)
		return (
			<div>
				{/*			<p className="App-intro">{this.state.data !== null ? this.state.data.map(el => el.values.name):null}</p>*/}
				<MaterialUIPickers />
				{step ? (
					<CommentForm
						changeStep={this.changeStep}
						handleChange={this.handleChange}
						values={values}
					/>
				) : (
					<Confirm
						changeStep={this.changeStep}
						handleChange={this.handleChange}
						values={values}
					/>
				)}
				{controlSearch ? (
					<SearchForComment
						changeSearch={this.changeSearch}
						handleChange={this.handleChange}
						values={SearchValues}
					/>
				) : (
					<SearchResults
						changeSearch={this.changeSearch}
						handleData={this.handleData}
						handleChange={this.handleChange}
						values={SearchValues}
						data={searchData}
					/>
				)}
			</div>
		);
	}
}

export default MainPage;

/*
		switch(step){
			case 1 :
				return(
					<FormUserDetails
						nextStep={this.nextStep}
						handleChange={this.handleChange}
						values={values}
					/>
				)
			case 2 :
				return(
					<FormPersonalDetails
						nextStep={this.nextStep}
						prevStep={this.previousStep}
						handleChange={this.handleChange}
						values={values}
					/>
				)
			case 3 :
				return(
					<Confirm
						nextStep={this.nextStep}
						prevStep={this.previousStep}
						values={values}
					/>
				)
			case 4 :
				return <Success/>





		}
*/
