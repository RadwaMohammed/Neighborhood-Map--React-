//Handling Errors with Error Boundary
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    error: null,
    info: null
  };

 componentDidCatch(error, info) {
    this.setState({
    	hasError: true,
    	error: error,
    	info:info
    });
  }

  render() {
    if (this.state.hasError) {
    	console.log(`Error is :  ${this.state.error} - Info : ${this.state.info}`);
      return <h1>Sorry, something went wrong.</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
