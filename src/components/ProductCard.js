import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductCard extends Component {
  async handleAddProductCart(product) {
    const items = this.getCartItems();
    if (items) {
      const itemExist = items.some((item) => item.id === product.id);
      if (itemExist) {
        const index = items.map((object) => object.id).indexOf(product.id);
        const prevQuantity = items[index].quantity;
        items[index] = { ...items[index], quantity: prevQuantity + 1 };
        localStorage.setItem('carrinho', JSON.stringify(items));
      } else {
        const newItemsList = [...items, product];
        localStorage.setItem('carrinho', JSON.stringify(newItemsList));
      }
    } else {
      localStorage.setItem('carrinho', JSON.stringify([product]));
    }
  }

  getCartItems() {
    const items = JSON.parse(localStorage.getItem('carrinho'));
    return items;
  }

  render() {
    const { product, inHome = false, shipping } = this.props;
    const {
      id,
      price,
      thumbnail,
      title,
      available_quantity: inventory,
      quantity = null } = product;
    return (
      <div className="product-card" data-testid="product">
        <Link
          to={ `/productdetailed/${product.id}` }
          key={ product.id }
          data-testid="product-detail-link"
        >
          <img src={ thumbnail } alt={ title } />
          <h3 data-testid="shopping-cart-product-name">{ title }</h3>
          <p>{ price }</p>
          { shipping && <p data-testid="free-shipping">Frete Grátis</p> }
          <p data-testid="shopping-cart-product-quantity">{ quantity }</p>
        </Link>
        { inHome && (
          <button
            data-testid="product-add-to-cart"
            type="button"
            onClick={ () => this.handleAddProductCart(
              { id, price, thumbnail, title, inventory, quantity: 1 },
            ) }
          >
            Adicionar ao carrinho
          </button>
        ) }
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
    available_quantity: PropTypes.number.isRequired,
    quantity: PropTypes.number,
  }).isRequired,
  shipping: PropTypes.bool.isRequired,
  inHome: PropTypes.bool.isRequired,
};

export default ProductCard;
