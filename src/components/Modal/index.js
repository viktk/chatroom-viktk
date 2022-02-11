import React from 'react';
import PropTypes from 'prop-types';

import './modal.scss';

const Modal = ({
  isLogged,
  isError,
  isSettingsOpen,
  onToggleSettings,
  emailValue,
  passwordValue,
  onEmailChange,
  onPasswordChange,
  onSettingsSubmit,
}) => (
  <div className={isSettingsOpen ? 'settings settings--open' : 'settings'}>
    <button
      type="button"
      className="settings__toggle"
      onClick={onToggleSettings}
    >
      +
    </button>
    {!isLogged ? (
      <form
        className="settings__form contains_form"
        onSubmit={onSettingsSubmit}
      >
        <input
          className="settings__input"
          value={emailValue}
          onChange={onEmailChange}
          placeholder="Email"
        />
        <input
          className="settings__input"
          value={passwordValue}
          onChange={onPasswordChange}
          type="password"
          placeholder="Password"
        />
        {isError && <p className="settings__error">Erreur de connexion</p>}
        <button
          className="settings__send"
          type="submit"
        >
          Envoyer
        </button>
      </form>
    ) : (
      <form
        className="settings__form contains_form"
        onSubmit={onSettingsSubmit}
      >
        <p className="settings__logged">Vous êtes connecté</p>
        <button
          className="settings__send"
          type="submit"
        >
          Se déconnecter
        </button>
      </form>
    )}
  </div>
);

Modal.propTypes = {
  isError: PropTypes.bool.isRequired,
  isLogged: PropTypes.bool.isRequired,
  isSettingsOpen: PropTypes.bool.isRequired,
  emailValue: PropTypes.string.isRequired,
  passwordValue: PropTypes.string.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onSettingsSubmit: PropTypes.func.isRequired,
  onToggleSettings: PropTypes.func.isRequired,
};

export default Modal;
