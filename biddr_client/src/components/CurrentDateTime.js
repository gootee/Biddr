import React from 'react';

class CurrentDateTime extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dateTime: new Date()
		};
	}
	componentDidMount() {
		// console.log('componentDidMount');

		// This method is called whenever the component is rendered
		// in the DOM
		// There many different ways we might want to use this method, such as:
		// - Fetching data
		// - adding event listeners
		// - starting timers
		// - etc

		// To share values between methods, we need to add instance properties
		// to the 'this' object
		// Here we are storing the id of the interval that was started within the
		// componentDidMount method
		// So that we can use that id to clear the interval when the component
		// unmounts when componentWillUnmount is called

		this.intervalId = setInterval(() => {
			this.setState({
				dateTime: new Date()
			});
		}, 1000);
	}

	componentDidUpdate() {
		// console.log('componentDidUpdate');
	}

	componentWillUnmount() {
		// console.log('componentWillUnmount');
		// This method is called before the component is removed from
		// the DOM. Use it to clean up setIntervals, setTimeouts, even listeners, etc

		// 'clearInterval' is a method built in browser API
		// that allows to stop the interval with the given intervalID
		clearInterval(this.intervalId);
	}
	render() {
		return (
			<div className="ui orange inverted center aligned segment CurrentDateTime">
				{this.state.dateTime.toLocaleString()}
			</div>
		);
	}
}
export default CurrentDateTime;