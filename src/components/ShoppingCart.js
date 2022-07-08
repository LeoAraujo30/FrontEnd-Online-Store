import React from 'react';
import ProductCard from './ProductCard';

class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    const items = JSON.parse(localStorage.getItem('carrinho'));
    this.setState({ products: items });
  }

  render() {
    const { products } = this.state;
    return (
      <div className="cart">
        {!products
          ? (<p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>)
          : (products.map((product) => (
            <ProductCard key={ product.id } product={ product } inHome={ false } />
          )))}
      </div>
    );
  }
}

export default ShoppingCart;
