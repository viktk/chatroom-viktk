import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ author, content }) => (
  <div className="contains">
    <p className="contains__pseudo">{author}</p>
    <p className="contains__square" />
    <div className="contains__bubble">
      <div className="contains__bubble__msg">
        {content}
      </div>
    </div>
  </div>
);

Message.propTypes = {
  author: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default Message;
