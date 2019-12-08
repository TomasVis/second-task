import React, { Component } from 'react'
import CommentForm from './CommentForm'
import Confirm from './Confirm'
/*import FormUserDetails from './FormUserDetails'
import FormPersonalDetails from './FormPersonalDetails'
import Confirm from './Confirm'
import Success from './Success'*/

export class MainPage extends Component {
	state = {
		step:true,
		firstName:"",
		lastName:"",
		email:"",
		ocupation:"",
		city:"",
		bio:"",
	}




		//Go back to previous step
	changeStep = () => {
		const {step} =this.state;
		step ? 
		this.setState({
			step:!step
		})
		:
		this.setState({
			step:!step,
			firstName:"",
			lastName:"",
			email:"",
			ocupation:"",
			city:"",
			bio:""
		})

	}

	//handle change
	handleChange = input => e => {
		this.setState({[input]:e.target.value})
	}

	render(){
		console.log(this.state.step)
		const {step} = this.state;
		const {firstName,lastName,email,ocupation,city,bio} =this.state;
		const values = {firstName,lastName,email,ocupation,city,bio}
		return(
			<div>
			{
				step ?
				<CommentForm
					changeStep={this.changeStep}

						handleChange={this.handleChange}
						values={values}
				/> 
				:
				<Confirm
					changeStep={this.changeStep}

						handleChange={this.handleChange}
						values={values}
				/>
			}
			</div>
		)

	}

}

export default MainPage

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