import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import ContestPreview from './ContestPreview';

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
        <div>
          {
            this.state.contests.map(contest => <ContestPreview key={contest.id} {...contest}/>)
          }
        </div>
      </div>
    );
  }
}

App.propTypes = {
  initialContests: PropTypes.array.isRequired
};
