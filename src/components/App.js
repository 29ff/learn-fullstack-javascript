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
      if ((event.state || {}).currentContestId === null || !event.state) {
        this.fetchContestList();
        this.setState({
          currentContestId: null
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

  fetchNames = nameIds => {
    if (nameIds.length === 0) {
      return;
    }
    api.fetchNames(nameIds).then(names => {
      this.setState({
        names
      });
    });
  }

  lookupName = nameId => {
    if (!this.state.names || !this.state.names[nameId]) {
      return {
        name: '...'
      };
    }
    return this.state.names[nameId];
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
        fetchNames={this.fetchNames}
        lookupName={this.lookupName}
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
