import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import AuthState from './context/Auth/authState';
import BookState from './context/Book/bookState';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navbar from './components/layouts/Navbar';
import Home from './components/pages/Home';
import PostBook from './components/Book/PostBook';

const App = () => {
  return (
    <AuthState>
      <BookState>
        <Router>
          <div className='App'>
            <div className='header'>
              <Navbar />
            </div>
            <div className='content'>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/create/book' component={PostBook} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
              </Switch>
            </div>
          </div>
        </Router>
      </BookState>
    </AuthState>
  );
};

export default App;
