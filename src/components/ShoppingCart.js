import React from 'react';
import { Link } from 'react-router-dom';
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

  async handleAddProductToCart(product) {
    const items = this.getCartItems();
    if (items) {
      const itemExist = items.some((item) => item.id === product.id);
      if (itemExist) {
        const index = items.map((object) => object.id).indexOf(product.id);
        const prevQuantity = items[index].quantity;
        const inventoryLimit = items[index].inventory;
        if (prevQuantity >= inventoryLimit) {
          localStorage.setItem('carrinho', JSON.stringify(items));
        } else {
          items[index] = { ...items[index], quantity: prevQuantity + 1 };
          localStorage.setItem('carrinho', JSON.stringify(items));
        }
      } else {
        const newItemsList = [...items, product];
        localStorage.setItem('carrinho', JSON.stringify(newItemsList));
      }
    } else {
      localStorage.setItem('carrinho', JSON.stringify([product]));
    }
    const newItems = this.getCartItems();
    this.setState({ products: newItems });
  }

  getCartItems() {
    const items = JSON.parse(localStorage.getItem('carrinho'));
    return items;
  }

  removeProductCart = (id) => {
    const items = this.getCartItems();
    const index = items.map((object) => object.id).indexOf(id);
    const prevQuantity = items[index].quantity;
    if (prevQuantity === 1) {
      items[index] = { ...items[index], quantity: 1 };
    } else {
      items[index] = { ...items[index], quantity: prevQuantity - 1 };
    }
    localStorage.setItem('carrinho', JSON.stringify(items));
    this.setState({ products: items });
  }

  render() {
    const { products } = this.state;
    return (
      <div className="cart">
        { !products
          ? (<p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>)
          : (products.map((product) => (
            <div key={ product.id }>
              <ProductCard product={ product } inHome={ false } />
              <button
                type="button"
                data-testid="product-decrease-quantity"
                onClick={ () => this.removeProductCart(product.id) }
              >
                -
              </button>
              <button
                type="button"
                data-testid="product-increase-quantity"
                onClick={ () => this.handleAddProductToCart(product) }
              >
                +
              </button>
            </div>
          ))) }
        <Link to="/checkout" data-testid="checkout-products">Checkout</Link>
      </div>
    );
  }
}

export default ShoppingCart;
