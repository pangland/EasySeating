import React from 'react';
import SessionFormContainer from './session_form_container';
import NavbarContainer from './navbar_container';
import { Route } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <header>
        <SessionFormContainer />
      </header>
    </div>
  );
};

export default App;
