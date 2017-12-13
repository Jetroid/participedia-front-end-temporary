import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Select from 'react-select'
import Multiselect from '../components/Multiselect';
import api from "../utils/api";

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class ExportCasesDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      	open: true,
		options: []
    };
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
  console.log(this.state.excluded);
    this.setState({open: false});
  };
  
  componentDidMount() {
  	let component = this;
	// retrieve the case fields
	api.fetchCaseFields().then(function(fields) {
		// isolate the fields
		var keys = Object.keys(fields);
		var options = [];
		// format the fields as options for the multi-select
		for(var i = 0; i < keys.length; i++) {
			options.push({label: keys[i], value: keys[i]});
		}
		// add the options to state
		var stateOptions = component.state.options.slice();
		Array.prototype.push.apply(stateOptions, options);
		component.setState({options: stateOptions});
	});
  }

  render() {
    const actions = [
      <FlatButton
        label="CLOSE"
        onClick={this.handleClose}
      />
    ];

    return (
      <div>
        <Dialog
          fullscreen
          title="Export Cases"
          actions={actions}
          modal={false}
          open={this.state.open}
        >
        <Multiselect 
		label="Excluded fields" 
		placeholder="Select fields to exclude"
		options={this.state.options}
	/>
        </Dialog>
      </div>
    );
  }
}

