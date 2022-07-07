import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter className='App'>
      <Route path="/" component={Home} exact />
    </BrowserRouter>
  );
}

export default App;
