import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProductCard extends Component {
  handleAddProductToCart(product) {
    const items = this.getCartItems();
    if (items) {
      const newItemsList = [...items, product];
      localStorage.setItem('carrinho', JSON.stringify(newItemsList));
    } else {
      localStorage.setItem('carrinho', JSON.stringify([product]));
    }
  }

  getCartItems() {
    const items = JSON.parse(localStorage.getItem('carrinho'));
    return items;
  }

  render() {
    const { product, inHome = false } = this.props;
    const { id, price, thumbnail, title } = product;
    return (
      <div className="product-card" data-testid="product">
        <img src={ thumbnail } alt={ title } />
        <h3>{ title }</h3>
        <p>{ price }</p>
        {inHome && (
          <button
            data-testid="product-add-to-cart"
            type="button"
            onClick={ () => this.handleAddProductToCart({ id, price, thumbnail, title }) }
          >
            Adicionar ao carrinho
          </button>
        )}
      </div>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  inHome: PropTypes.bool.isRequired,
};

export default ProductCard;
