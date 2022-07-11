import React from 'react';
import ProductCard from './ProductCard';

class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.state = {
      quantity: 1,
      quantity2: 0,
      products: [],
    };
  }

  componentDidMount() {
    const items = JSON.parse(localStorage.getItem('carrinho'));
    this.setState({ products: items });
  }

  async handleAddProductToCart (product) {
    const items = this.getCartItems();
    if (items) {
      const itemExist = items.some((item) => item.id === product.id);
      if (itemExist) {
        const index = items.map(object => object.id).indexOf(product.id);
        const prevQuantity = items[index].quantity
        items[index] = { ...items[index], quantity: prevQuantity +1 }
        localStorage.setItem('carrinho', JSON.stringify(items));
      } else {
        const newItemsList = [...items, product];
        localStorage.setItem('carrinho', JSON.stringify(newItemsList));
        this.setState((estadoAnterior) => ({
          quantity: estadoAnterior.quantity + 1,
          quantity2: 1,
        }) )
      }
    } else {
      localStorage.setItem('carrinho', JSON.stringify([product]));
      this.setState({ quantity2: 1 })
    }
  }

  getCartItems() {
    const items = JSON.parse(localStorage.getItem('carrinho'));
    return items;
  }

  removeProductCart = (id) => {
    const items = this.getCartItems();
    const productsRemoved = items.filter((product) => product.id !== id);
    localStorage.setItem('carrinho', JSON.stringify(productsRemoved));
    this.setState({ products: productsRemoved });
  }

  render() {
    const { products } = this.state;
    return (
      <div className="cart">
        {!products
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
          )))}
      </div>
    );
  }
}

export default ShoppingCart;
