import React from 'react';
import {
  Route,
  BrowserRouter,
  Switch,
} from 'react-router-dom';
import Home from './pages/Home';
import '../assets/css/style.css';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      {/* <Route exact path="/meal/:id" component={Meal} /> */}
    </Switch>
  </BrowserRouter>
);

export default App;
