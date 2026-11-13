import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught an error:', error, info.componentStack);
  }

  reset = () => this.setState({ error: null });

  render() {
    if (this.state.error) {
      return (
        <div role="alert" className="section container container--narrow">
          <h1>Something went wrong</h1>
          <p>The page hit an unexpected problem. You can try again or reload the page.</p>
          <button type="button" className="btn btn--primary" onClick={this.reset}>
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Usage: <ErrorBoundary><App /></ErrorBoundary>
