// == Import npm
import React from 'react';

// == Import
import './styles.scss';

// import Messages from 'src/components/Messages';
import Messages from 'src/containers/Messages';
// import Form from 'src/components/Form';
import Form from 'src/containers/Form';
import Modal from 'src/containers/Modal';

// == Composant
const App = () => (
  <>
    <Messages />
    <Form />
    <Modal />
  </>
);

// == Export
export default App;
