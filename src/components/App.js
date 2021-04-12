import React from 'react';
import {
  Route,
  BrowserRouter,
  Switch,
} from 'react-router-dom';
import '../assets/css/style.css';
import key from 'uniqid';
import Home from './pages/Home';
import publicRoutes from '../routes/Public';
import { modelRoutes } from '../routes/Private';

const App = props => (
  <BrowserRouter>
    <Switch>
      {publicRoutes.map(prop => (
        <Route
          exact
          path={prop.path}
          key={key()}
          component={prop.component}
        />
      ))}
      {modelRoutes(props).map((prop, key) => (
        <Route exact path={prop.path} key={key()} component={Home} />
      ))}
    </Switch>
  </BrowserRouter>
  // <div className="app_container">
  //   <div className="d-flex flex-column">
  //     <Header />
  //     <BrowserRouter>
  //       <Switch>
  //         <Route exact path="/" component={Home} />
  //         {/* <Route exact path="/meal/:id" component={Meal} /> */}
  //       </Switch>
  //     </BrowserRouter>
  //   </div>
  //   <Menu />
  // </div>
);

export default App;
