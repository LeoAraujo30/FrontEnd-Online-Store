import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter className="App">
      <Switch>
        <Route path="/" render={ () => <Home /> } exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
