import { getHighestId } from './selectors';
import {
  ADD_MESSAGE,
  SET_INPUT_VALUE,
  TOGGLE_SETTINGS,
  SET_SETTINGS_FIELD_VALUE,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from './actions';

const initialState = {
  messages: [
    {
      id: 1,
      author: 'Moi',
      content: 'Salut Salut !',
    },
    {
      id: 2,
      author: 'User',
      content: 'Hey salut !',
    },
  ],
  nickname: null,
  inputValue: '',
  modal: {
    // email: 'admin@viktk.io',
    // password: 'WelcomeAdmin',
    email: '',
    password: '',
    isOpen: true,
    isError: false,
  },
};

const reducer = (oldState = initialState, action) => {
  switch (action.type) {
    case SET_INPUT_VALUE:
      return {
        ...oldState,
        inputValue: action.value,
      };
    case ADD_MESSAGE: {
      // on veut fabriquer un nouveau message
      // il faudra s'occuper aussi de générer un nouvel id
      // ensuite, on renverra un nouveau state, on recopiera oldState
      // et on recopiera aussi le contenu du tableau messages
      // au bout duquel on ajoutera le nouveau message créé
      // et pour finir, on remettra inputValue a null

      // on emploi un selecteur
      const maxId = getHighestId(oldState);

      const newMessage = {
        // si on a un max, on ajoute 1
        // sinon, si c'est le premier message, on donne l'id 1
        id: maxId ? maxId + 1 : 1,
        author: oldState.nickname,
        content: oldState.inputValue,
      };

      // on renvoie un nouveau state
      return {
        // on reverse tout
        ...oldState,
        // on change les messages
        messages: [
          // on recopie les anciens messages
          ...oldState.messages,
          // on ajoute notre nouveau message à la fin
          newMessage,
        ],
        // on finit par vider l'input
        inputValue: '',
      };
    }
    case LOGIN_SUCCESS:
      console.log('le reducer reagit a login success');
      return {
        ...oldState,
        nickname: action.nickname,
        modal: {
          ...oldState.modal,
          // on vide les champs
          email: '',
          password: '',
          // on ferme le panneau settings
          isOpen: false,
          // on précise que y'a pas d'erreur
          isError: false,
        },
      };
    case LOGIN_ERROR:
      return {
        ...oldState,
        modal: {
          ...oldState.modal,
          // on met isError a true pour que l'interface puisse afficher l'erreur
          isError: true,
        },
      };
    case SET_SETTINGS_FIELD_VALUE:
      return {
        // on recopie l'ancien state
        ...oldState,
        modal: {
          ...oldState.modal,
          // utilisation d'une clé dynamique
          // [action.fieldKey] sera remplacé par la valeur dans action.fieldKey
          // dans notre cas : email ou password
          // se référer au container de Settings
          [action.fieldKey]: action.newValue,
        },
      };
    case TOGGLE_SETTINGS:
      return {
        ...oldState,
        modal: {
          ...oldState.modal,
          isOpen: !oldState.modal.isOpen,
        },
      };
    default:
      // par défaut, on renvoie l'ancien state tel quel
      // pas besoin de le recopier avec spread si il ne change pas
      return oldState;
  }
};

export default reducer;
