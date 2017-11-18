import React from 'react';
import PropTypes from 'prop-types';
import * as api from '../api';
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
      contests: this.props.initialData,
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
    api.fetchContest(contestId).then(contest => {
      this.setState({
        currentContestId: contest.id,
        contests: {
          ...this.state.contests,
          [contest.id]: contest
        }
      });
    });
  }

  pageHeader() {
    if (this.state.currentContestId) {
      return this.currentContest().contestName;
    }

    return 'Naming Contest';
  }

  currentContest() {
    return this.state.contests[this.state.currentContestId];
  }

  currentContent = () => {
    if (this.state.currentContestId ) {
      return <Contest {...this.currentContest()}/>;
    }

    return <ContestList {...this.state.contests} onContestClick={this.fetchContest}/>;
  }

  render() {
    return (
      <div className="App container">
        <Header message={this.pageHeader()} />
        {
          this.currentContent()
        }
      </div>
    );
  }
}

App.propTypes = {
  initialData: PropTypes.object.isRequired
};
