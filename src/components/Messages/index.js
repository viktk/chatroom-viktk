import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Message from 'src/components/Message';

const Messages = ({ leMessage }) => {
  const messagesRef = useRef(null);

  // on veut scroller nos messages vers le bas
  // effet appelé lorsque le tableau de messages a changé
  useEffect(() => {
    // on scroll de toute la hauteur de scroll disponible
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [leMessage]);

  return (
    <div className="content">
      <div className="content__frame" ref={messagesRef}>
        {leMessage.map((msg) => (
          <Message
            key={msg.id}
            author={msg.author}
            content={msg.content}
          />
        ))}
      </div>
    </div>
  );
};

Messages.propTypes = {
  leMessage: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      author: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default Messages;
