import React from 'react';
import PropTypes from 'prop-types';

export default class ContestPreview extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log(this.props.contestName);
  }

  render() {
    const { categoryName, contestName } = this.props;
    return (
      <div className="link ContestPreview" onClick={this.handleClick}>
        <div className="category-name">
          {categoryName}
        </div>
        <div className="contest-name">
          {contestName}
        </div>
      </div>
    );
  }
}

ContestPreview.propTypes = {
  categoryName: PropTypes.string.isRequired,
  contestName: PropTypes.string.isRequired
};