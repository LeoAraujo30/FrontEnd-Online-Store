import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductInfo } from '../services/api';

class ProductDetailed extends React.Component {
  constructor() {
    super();
    this.state = {
      productDetails: {},
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.fetchProduct(id);
  }

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

  fetchProduct = async (id) => {
    const product = await getProductInfo(id);
    this.setState({
      productDetails: product,
    });
    console.log(product);
  }

  render() {
    const { match: { params: { id } } } = this.props;
    const { productDetails } = this.state;
    const { price, thumbnail, title } = productDetails;

    return (
      <div>
        <Link to="/shoppingcart" data-testid="shopping-cart-button">carrinho</Link>
        <div className="product-detailed">
          <span data-testid="product-detail-name">{title}</span>
          <img alt={ title } src={ thumbnail } />
          <span>{productDetails.price}</span>
          <button
            data-testid="product-detail-add-to-cart"
            type="button"
            onClick={ () => this.handleAddProductToCart({ id, price, thumbnail, title }) }
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    );
  }
}

ProductDetailed.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default withRouter(ProductDetailed);
