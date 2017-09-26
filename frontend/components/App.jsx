import React from 'react';
import NavbarContainer from './navbar_container';
import AddRestaurantContainer from './restaurant/add_restaurant_container';
import HomeContainer from './restaurant/home_container';
import { Route } from 'react-router-dom';
import RestaurantContainer from './restaurant/restaurant_container';
import RestaurantIndexContainer from './restaurant/restaurant_index_container';
import ProfileContainer from './user/profile_container';

const App = () => {
  return (
    <div>
      <NavbarContainer />
      <Route exact path="/" component={HomeContainer} />
      <Route exact path="/restaurants" component={RestaurantIndexContainer} />
      <Route path="/restaurant/:restaurantId"
        component={RestaurantContainer} />
      <Route exact path="/my" component={ProfileContainer} />
    </div>
  );
};

export default App;
