import React from 'react';
import PropTypes from 'prop-types';

export default class Contest extends React.Component {
  render() {
    return (
      <div className="Contest">
        <div className="contest-description">
          {this.props.description}
        </div>
        <div onClick={this.props.fetchContestList} className="home-link link">
          Return to contest list
        </div>
      </div>
    );
  }
}

Contest.propTypes = {
  fetchContestList: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired
};
