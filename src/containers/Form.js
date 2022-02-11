import { connect } from 'react-redux';
import Form from 'src/components/Form';
import { isUserLogged } from 'src/store/selectors';
import { createAddMessageAction, createSetInputValueAction } from 'src/store/actions';

// transforme le state en props
const mapStateToProps = (state) => ({
  inputValue: state.inputValue,
  isLogged: isUserLogged(state),
});

// transforme la fonction dispatch en props
const mapDispatchToProps = (dispatch) => ({
  onMsgSubmit: () => {
    // dispatch({ type: 'ADD_MESSAGE' });
    dispatch(createAddMessageAction());
  },

  onInputChange: (newValue) => {
    // dispatch({ type: 'SET_INPUT_VALUE', value: newValue });
    dispatch(createSetInputValueAction(newValue));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
