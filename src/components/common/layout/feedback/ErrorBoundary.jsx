import './ErrorBoundary.css'

import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: '',
    };
  }

  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      errorMessage: error.message || 'Something went wrong!',
    });
    console.error(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <h1>Oops! Something went wrong!</h1>
          <p>{this.state.errorMessage}</p>
          <p>
            Don't worry, our team of tech-savvy gnomes is working hard to fix
            this issue. Please try again later.
          </p>
          <img
            src="https://i.imgur.com/v88FHs9.png"
            alt="Error Gnome"
            style={{ width: '200px' }}
          />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
