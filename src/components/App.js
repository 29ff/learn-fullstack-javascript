import React from 'react';
import PropTypes from 'prop-types';
import * as api from '../api';
import Header from './Header';
import Contest from './Contest';
import ContestList from './ContestList';

const onPushState = (obj, url) => {
  window.history.pushState(obj, '', url);
};

const onPopState = handler => {
  window.onpopstate = handler;
};

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.props.initialData;

    this.fetchContest = this.fetchContest.bind(this);
  }

  componentDidMount() {
    onPopState((event) => {
      if ((event.state || {}).currentContestId === null) {
        this.fetchContestList();
        this.setState({
          currentContestId: (event.state || {}).currentContestId
        });
      }
    });
  }

  fetchContest = (contestId) => {
    onPushState(
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

  fetchContestList = () => {
    onPushState(
      { currentContestId: null },
      '/'
    );
    api.fetchContestList().then(contests => {
      this.setState({
        currentContestId: null,
        contests
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
    if (this.state.currentContestId) {
      return <Contest 
        fetchContestList={this.fetchContestList} 
        {...this.currentContest()}/>;
    }

    return <ContestList contests={{...this.state.contests}} onContestClick={this.fetchContest}/>;
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
