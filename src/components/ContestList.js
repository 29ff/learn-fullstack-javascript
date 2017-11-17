import React from 'react';
import PropTypes from 'prop-types';
import ContestPreview from './ContestPreview';

const ContentList = (props) => {
  const { contests, onContestClick } = props;
  return (
    <div>
      {
        Object.keys(contests).map(contestId => <ContestPreview key={contestId} {...contests[contestId]} onClick={onContestClick}/>)
      }
    </div>
  );
};

ContentList.propTypes = {
  contests: PropTypes.object.isRequired,
  onContestClick: PropTypes.func.isRequired
};

export default ContentList;
