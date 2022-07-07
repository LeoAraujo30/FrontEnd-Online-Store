import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProductCard extends Component {
  render() {
    const { product } = this.props;
    const { price, thumbnail, title } = product;
    return (
      <div className="product-card" data-testid="product">
        <img src={ thumbnail } alt={ title } />
        <h3>{ title }</h3>
        <p>{ price }</p>
      </div>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
