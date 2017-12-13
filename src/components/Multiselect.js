import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';
import RaisedButton from 'material-ui/RaisedButton';
import 'react-select/dist/react-select.css';
import api from "../utils/api";


var MultiSelectField = createClass({
	displayName: 'MultiSelectField',
	propTypes: {
		label: PropTypes.string,
		placeholder: PropTypes.string,
	},
	getInitialState () {
		return {
			removeSelected: true,
			stayOpen: false,
			value: [],
		};
	},
	handleSelectChange (value) {
		this.setState({ value });
	},

	convertValueToFilterArray(value) {
		// no filtering when nothing selected
		if(value === null || value.length < 1) {
			return "";
		}
		// selected fields are converted into null objects to be passed as a GET parameter
		var values = value.split(',');
		var filter = "{";
		for(var i = 0; i < values.length; i++) {
			filter += "%22" + values[i] + "%22%3A" + "null";
			// wrap up if its the last field
			if((i + 1) == values.length) {
				filter += "}";
				break;
			}
			// else add a comma to precede the next field
			else {
				filter += "%2C";	
			}
		}
		return filter;
	},

	exportCSV () {
		console.log(this.state.value);
	},

	exportXML () {
		console.log(this.state.value);
	},

	exportJSON () {
		//console.log(this.state.value);
		var filter = this.convertValueToFilterArray(this.state.value);
		//console.log(filter);
		api.fetchAllCasesJSON(filter).then(function(fields) {
			console.log(fields);
		});
	},

	render () {
		const buttonStyle = {
				margin: 12,
			};
		const { value } = this.state;
		return (
			<div>
				<div className="section" style={{minHeight: '380px'}}>
					<h3 className="section-heading">{this.props.label}</h3>
					<Select
						closeOnSelect={false}
						multi
						onChange={this.handleSelectChange}
						options={this.props.options}
						placeholder={this.props.placeholder}
		      			removeSelected={this.state.removeSelected}
						simpleValue
						value={value}
					/>
				</div>

					<RaisedButton
						label="Export CSV"
						style={buttonStyle}
						onClick={this.exportCSV}
				  	/>
				 	<RaisedButton
						label="Export XML"
						style={buttonStyle}
						onClick={this.exportXML}
				  	/>
					<RaisedButton
						label="Export JSON"
						style={buttonStyle}
						onClick={this.exportJSON}
				  	/>
	
			</div>
		);
	}
});

export default MultiSelectField;

