import React, { Component } from "react";

/*import { Paper, Typography, TextField, Button } from "@material-ui/core";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";*/
import { withStyles } from "@material-ui/core/styles";
import MainPage from './components/MainPage'

const styles = theme => console.log(theme) || ({ 

  root: { margin: 20, padding: 20, maxWidth: 400 },
form: {    display: 'flex',    alignItems: 'baseline',    justifyContent: 'space-evenly'  }
})
export default withStyles(styles)(
  class App extends Component {



    render() {

      const { classes } = this.props;

      return (

        <MainPage 
        className={classes.root}
        classes
        />


      );
    }
  }
);

/*

      return (
        <Paper className={classes.root}>
        <MainPage/>
          <form className={classes.form} onSubmit={this.handleCreate}>
            <TextField
              name="title"
              label="Exercise"
              value={title}
              onChange={this.handleChange}
              margin="normal"
            />
            <Button type="submit" color="primary" variant="contained">
              {" "}
              Create{" "}
            </Button>{" "}
          </form>{" "}
          <List>
            {" "}
            {exercises.map(({ id, title }) => (
              <ListItem key={id}>
                <ListItemText primary={title} />
                <ListItemSecondaryAction>
                  <IconButton
                    color="primary"
                    onClick={() => this.handleDelete(id)}
                  >
                    {" "}
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      );
*/