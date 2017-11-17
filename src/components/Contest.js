import React from 'react';
import PropTypes from 'prop-types';

export default class Contest extends React.Component {
  render() {
    return (
      <div className="Contest">
        {this.props.description}
      </div>
    );
  }
}

Contest.propTypes = {
  description: PropTypes.string.isRequired
};
