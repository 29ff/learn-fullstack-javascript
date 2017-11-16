import React from 'react';

export default class ContestPreview extends React.Component {
  render() {
    const contest = this.props;
    return (
      <div className="ContestPreview">
        <div className="category-name">
          {contest.categoryName}
        </div>
        <div className="contest-name">
          {contest.contestName}
        </div>
      </div>
    );
  }
}
