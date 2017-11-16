import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import ContestList from './ContestList';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contests: this.props.initialContests
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="App container">
        <Header message="Naming Contests" />
        <ContestList contests={this.state.contests}/>
      </div>
    );
  }
}

App.propTypes = {
  initialContests: PropTypes.array.isRequired
};
