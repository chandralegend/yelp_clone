import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import {RestaurantContextProvider} from './context/RestaurantsContext'

import HomePage from './routes/HomePage';
import RestaurantPage from './routes/RestaurantPage';
import UpdatePage from './routes/UpdatePage';

function App() {
  return (
    <RestaurantContextProvider>
      <div className="container">
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/restaurants/:id/update" component={UpdatePage} />
            <Route exact path="/restaurants/:id" component={RestaurantPage} />
          </Switch>
        </Router>
      </div>
    </RestaurantContextProvider>
  );
}

export default App;
