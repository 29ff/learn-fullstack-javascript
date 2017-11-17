import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Contest from './Contest';
import ContestList from './ContestList';

const pushState = (obj, url) => {
  window.history.pushState(obj, '', url);
};

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contests: this.props.initialContests,
      pageHeader: 'Naming Contests'
    };

    this.fetchContest = this.fetchContest.bind(this);
  }

  componentDidMount() {

  }

  fetchContest = (contestId) => {
    pushState(
      { currentContestId: contestId },
      `/contest/${contestId}`
    );
    this.setState({
      pageHeader: this.state.contests[contestId].contestName,
      currentContestId: contestId
    });
  }

  currentContent = () => {
    if (this.state.currentContestId ) {
      const { currentContestId } = this.state;
      return <Contest {...this.state.contests[currentContestId]}/>;
    }

    return <ContestList contests={this.state.contests} onContestClick={this.fetchContest}/>;
  }

  render() {
    return (
      <div className="App container">
        <Header message={this.state.pageHeader} />
        {
          this.currentContent()
        }
      </div>
    );
  }
}

App.propTypes = {
  initialContests: PropTypes.object.isRequired
};
