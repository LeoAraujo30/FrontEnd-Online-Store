import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import ShoppingCart from './components/ShoppingCart';
import ProductDetailed from './components/ProductDetailed';

function App() {
  return (
    <BrowserRouter className="App">
      <Switch>
        <Route path="/" component={ Home } exact />
        <Route path="/shoppingcart" component={ ShoppingCart } />
        <Route path="/productdetailed/:id" component={ ProductDetailed } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
