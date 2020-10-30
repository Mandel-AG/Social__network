import React from 'react';
import {Home, NotAvailable, Login, Register, Explorer} from './components/index';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/home" component={Home} ></Route>
        <Route exact path="/login" component={Login} ></Route>
        <Route exact path="/register" component={Register} ></Route>
        <Route exact path="/not_available_yet" component={NotAvailable} ></Route>
        <Route exact path="/" component={Explorer} ></Route>
      </Switch>
    </Router>

  );
}

export default App;
