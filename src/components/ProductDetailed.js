import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductInfo } from '../services/api';

class ProductDetailed extends React.Component {
  constructor() {
    super();
    this.state = {
      productDetails: {},
      inputEmail: '',
      inputTextArea: '',
      inputRadio: '1',
      productComments: [],
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.fetchProduct(id);
    this.getProductComments(id);
  }

  getProductComments = (id) => {
    const allComments = JSON.parse(localStorage.getItem('comments')) || [];
    const productComments = allComments
      .filter((comment) => comment.productId === id);
    this.setState({
      productComments,
    });
  }

  fetchProduct = async (id) => {
    const product = await getProductInfo(id);
    this.setState({
      productDetails: product,
    });
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });
  }

  handleSaveComment = (event) => {
    event.preventDefault();
    const { match: { params: { id } } } = this.props;
    const { inputEmail, inputTextArea, inputRadio } = this.state;
    const comment = {
      email: inputEmail,
      description: inputTextArea,
      avaliation: inputRadio,
      productId: id,
    };
    const prevComments = JSON.parse(localStorage.getItem('comments'));
    if (prevComments) {
      const newComments = [...prevComments, comment];
      localStorage.setItem('comments', JSON.stringify(newComments));
    } else localStorage.setItem('comments', JSON.stringify([comment]));
    this.getProductComments(id);
    this.setState({
      inputEmail: '',
      inputTextArea: '',
      inputRadio: '1',
    });
  }

  render() {
    const { productDetails, inputEmail, inputTextArea, productComments } = this.state;
    const arrStars = ['1', '2', '3', '4', '5'];
    return (
      <>
        <Link to="/shoppingcart">carrinho</Link>
        <div className="product-detailed">
          <span data-testid="product-detail-name">{ productDetails.title }</span>
          <img alt={ productDetails.title } src={ productDetails.thumbnail } />
          <span>{ productDetails.price }</span>
        </div>
        <form>
          <label htmlFor="inputEmail">
            email:
            <input
              value={ inputEmail }
              name="inputEmail"
              data-testid="product-detail-email"
              type="email"
              id="inputEmail"
              onChange={ this.handleChange }
            />
          </label>
          { arrStars
            .map((element, index) => (
              <label htmlFor={ `${element}-rating` } key={ index }>
                { element }
                <input
                  id={ `${element}-rating` }
                  type="radio"
                  data-testid={ `${element}-rating` }
                  name="inputRadio"
                  value={ element }
                  onChange={ this.handleChange }
                />
              </label>)) }
          <textarea
            data-testid="product-detail-evaluation"
            name="inputTextArea"
            onChange={ this.handleChange }
            value={ inputTextArea }
          />
          <button
            data-testid="submit-review-btn"
            type="submit"
            onClick={ this.handleSaveComment }
          >
            Adicionar
          </button>
        </form>
        <section>
          { productComments && productComments.map((comment, index) => (
            <div key={ index }>
              <span>{ comment.email }</span>
              <span>{ comment.avaliation }</span>
              <span>{ comment.description }</span>
            </div>
          )) }
        </section>
      </>
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
