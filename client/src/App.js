import React from 'react';
import {Home, NotAvailable, Login, Register, Explorer, Spline} from './components/index';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/home" component={Home} ></Route>
        <Route  path="/:login" component={Spline} ></Route>
        {/* <Route  path="/login" component={Login} ></Route> */}
        <Route  path="/:register" component={Spline} ></Route>
        <Route  path="/not_available_yet" component={NotAvailable} ></Route>
        <Route  path="/" component={Explorer} ></Route>
      </Switch>
    </Router>

  );
}

export default App;
