import React from 'react';
import NavbarContainer from './navbar_container';
import AddRestaurantContainer from './restaurant/add_restaurant_container';
import HomeContainer from './restaurant/home_container';
import { Route } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <NavbarContainer />
      <Route exact path="/" component={HomeContainer} />
    </div>
  );
};

export default App;
