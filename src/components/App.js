import React from 'react';
import Header from './Header';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App container">
        <Header message="Naming Contests" />
        <div>
          ...
        </div>
      </div>
    );
  }
}
