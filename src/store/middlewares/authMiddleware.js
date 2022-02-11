import axios from 'axios';

// on importe les actions auxquelles on souhaite réagir
// et les action creator pour les actions que l'on souhaite envoyer
import {
  SUBMIT_LOGIN,
  createLoginSuccessAction,
  createLoginErrorAction,
} from 'src/store/actions';

/*
  un middleware est une fonction que l'on va donner au store
  le store s'en servira pour traduire des actions vers des effets de bord
  (cest a dire autre chose qu'une modif simple de state. par exemple : parler a api, timers, )
  l'objet action va passer dans chaque middleware, puis finira par arriver dans le reducer
  si chaque middleware a NEXTÉ l'action
  constatons également que le middleware a accès a l'instance du store
  sur lequel il pourra tout a fait faire des store.dispach, store.getState
*/
const authMiddleware = (store) => (next) => (action) => {
  console.log('Je suis authMiddleware et je vois passer laction ', action);

  // dans un middleware, on peut faire des conditions
  // afin de réagir a différentes actions
  if (action.type === SUBMIT_LOGIN) {
    console.log('je suis authMiddleware et jai trouve une action qui minteresse : SUBMIT_LOGIN');

    const state = store.getState();

    // on prépare une requete AXIOS
    const config = {
      method: 'post',
      url: 'http://localhost:3000/login',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        // on "remplit" notre requete avec les infos du store
        email: state.modal.email,
        password: state.modal.password,
      },
    };

    // ca y est, on fait la requête
    axios(config)
      .then((response) => {
        console.log('la reponse de la requete : ', response.data);
        console.log('authMiddleware dispatche une NOUVELLE action : LOGIN_SUCCESS');
        // store.dispatch({ type: 'LOGIN_SUCCESS', nickname: response.data.pseudo });
        // version action creator
        store.dispatch(createLoginSuccessAction(response.data.pseudo));
      })
      .catch((error) => {
        console.log('il y a eu une erreur : ', error);
        // store.dispatch({ type: 'LOGIN_ERROR' });
        store.dispatch(createLoginErrorAction());
      });
  }
  else {
    // sinon, c'est une autre action, je la laisse passer
    next(action);
  }
};

export default authMiddleware;
