import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Icon, Input, Form as Formulaire } from 'semantic-ui-react';

const Form = ({ isLogged,inputValue, onInputChange, onMsgSubmit }) => {
  const inputRef = useRef(null);
  // tableau de dépendances vide
  // appelé au chargement initial du composant
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="content">
      {/* <Formulaire onSubmit={onMsgSubmit}> */}
      <Formulaire onSubmit={(e) => {
        // on empeche le rechargement de la page
        e.preventDefault();
        // si quelque chose a été tapé, on envoie le message
        // trim vide espaces du début et de la fin
        if (inputValue.trim() !== '') {
          onMsgSubmit();
        }
      }}
      >
        <Input
          ref={inputRef}
          icon={(
            <Icon
              name="paper plane"
              link
              onClick={(e) => {
                e.preventDefault();
                if (inputValue.trim() !== '') {
                  onMsgSubmit();
                }
              }}
            />
          )}
          type="text"
          className="form"
          placeholder={isLogged ? 'Message' : 'Connectez vous pour discuter'}
          value={inputValue}
          disabled={!isLogged}
          onChange={(e) => onInputChange(e.target.value)}
        />
      </Formulaire>
    </div>
  );
};

Form.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  onMsgSubmit: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default Form;
