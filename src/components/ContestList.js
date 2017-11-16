import React from 'react';
import PropTypes from 'prop-types';
import ContestPreview from './ContestPreview';

const ContentList = (props) => {
  const { contests } = props;
  return (
    <div>
      {
        contests.map(contest => <ContestPreview key={contest.id} {...contest}/>)
      }
    </div>
  );
};

ContentList.propTypes = {
  contests: PropTypes.array.isRequired
};

export default ContentList;
