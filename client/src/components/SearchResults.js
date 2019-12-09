import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';


export class FormUserDetails extends Component {

restart =  e => {
		e.preventDefault();
		//PROCESS FORM //
		this.props.changeStep();

	}





	render(){
		const {values:{firstName,lastName,email,
			ocupation, city, bio} }  = this.props;
		return(
			<MuiThemeProvider>
				<React.Fragment>
					<AppBar title="Komentaras išsaugotas" />
					<List>
						<ListItem
							primaryText="First Name"
							secondaryText = {firstName}
						/>
						<ListItem
							primaryText="Last Name"
							secondaryText = {lastName}
						/>
						<ListItem
							primaryText="Email"
							secondaryText = {email}
						/>
						<ListItem
							primaryText="Ocupation"
							secondaryText = {ocupation}
						/>
						<ListItem
							primaryText="City"
							secondaryText = {city}
						/>
						<ListItem
							primaryText="Bio"
							secondaryText = {bio}
						/>
					</List>
					<br/>

					<RaisedButton
						label="Confirm & Continue"
						primary={true}
						style={styles.button}
						onClick={this.restart}
					/>

				</React.Fragment>
			</MuiThemeProvider>


		)
	}
}
const styles = {
	button:{
		margin:15
	}
}

export default FormUserDetails