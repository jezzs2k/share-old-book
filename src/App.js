import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import AuthState from './context/Auth/authState';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navbar from './components/layouts/Navbar';

const App = () => {
  return (
    <AuthState>
      <Router>
        <div className='App'>
          <div className='header'>
            <Navbar />
          </div>
          <div className='content'>
            <Switch>
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
            </Switch>
          </div>
        </div>
      </Router>
    </AuthState>
  );
};

export default App;
