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

  fetchProduct = async (id) => {
    const product = await getProductInfo(id);
    this.setState({
      productDetails: product,
    });
  }

  render() {
    const { productDetails } = this.state;
    return (
      <div>
        <Link to="/shoppingcart">carrinho</Link>
        <div className="product-detailed">
          <span data-testid="product-detail-name">{ productDetails.title }</span>
          <img alt={ productDetails.title } src={ productDetails.thumbnail } />
          <span>{ productDetails.price }</span>
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
