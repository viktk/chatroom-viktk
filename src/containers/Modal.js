import { connect } from 'react-redux';
import Modal from 'src/components/Modal';
import { isUserLogged } from 'src/store/selectors';
import {
  createSubmitLoginAction,
  createToggleSettingsAction,
  createSetSettingsFieldValueAction,
} from 'src/store/actions';

const mapStateToProps = (state) => ({
  emailValue: state.modal.email,
  passwordValue: state.modal.password,
  isSettingsOpen: state.modal.isOpen,
  isLogged: isUserLogged(state),
  isError: state.modal.isError,
});

const mapDispatchToProps = (dispatch) => ({
  onEmailChange: (e) => {
    // dispatch({
    //   type: 'SET_SETTINGS_FIELD_VALUE',
    //   newValue: e.target.value,
    //   fieldKey: 'email',
    // });
    // version action creator
    dispatch(createSetSettingsFieldValueAction(e.target.value, 'email'));
  },
  onPasswordChange: (e) => {
    // dispatch({
    //   type: 'SET_SETTINGS_FIELD_VALUE',
    //   newValue: e.target.value,
    //   fieldKey: 'password',
    // });
    dispatch(createSetSettingsFieldValueAction(e.target.value, 'password'));
  },
  onSettingsSubmit: (e) => {
    e.preventDefault();
    console.log('envoi du formulaire');
    // dispatch({ type: 'SUBMIT_LOGIN' });
    dispatch(createSubmitLoginAction());
  },
  onToggleSettings: () => {
    // dispatch({ type: 'TOGGLE_SETTINGS' });
    dispatch(createToggleSettingsAction());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
