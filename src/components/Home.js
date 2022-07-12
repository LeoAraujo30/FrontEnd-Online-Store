import React from 'react';
import { Link } from 'react-router-dom';

import {
  getCategories,
  getProductsFromQuery,
  getProductsFromCategoty,
} from '../services/api';
import Notification from './Notification';
import ProductCard from './ProductCard';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      query: '',
      products: [],
      categorias: [],
      quantityCart: 0,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.handleCategories();
    this.getQuantityCart();
  }

  handleCategories = async () => {
    const arrayCategorias = await getCategories();
    this.setState({
      categorias: arrayCategorias,
    });
  }

  handleInputChange({ target: { value } }) {
    this.setState({ query: value });
  }

  async handleSearch() {
    const { query } = this.state;
    const products = await getProductsFromQuery(query);
    this.setState({ products });
  }

  getProductsByCategory = async (id) => {
    const array = await getProductsFromCategoty(id);
    this.setState({
      products: array,
    });
  }

  getQuantityCart = () => {
    const products = JSON.parse(localStorage.getItem('carrinho'));
    if (products) {
      const quantityCart = products.reduce((acc, current) => current.quantity + acc, 0);
      this.setState({ quantityCart });
    }
  }

  render() {
    const { query, products, categorias, quantityCart } = this.state;
    return (
      <div className="home">
        <div className="categorias">
          { categorias.map((categoria) => {
            const { name, id } = categoria;
            return (
              <button
                key={ id }
                data-testid="category"
                type="button"
                onClick={ () => this.getProductsByCategory(id) }
              >
                { name }
              </button>
            );
          }) }
        </div>
        <section className="section__search">
          <input
            placeholder="Pesquisa"
            type="text"
            data-testid="query-input"
            onChange={ this.handleInputChange }
            value={ query }
          />
          <button type="button" data-testid="query-button" onClick={ this.handleSearch }>
            Pesquisar
          </button>
          <Link
            data-testid="shopping-cart-button"
            to="/shoppingcart"
          >
            carrinho
            <Notification quantityCart={ quantityCart } />
          </Link>
        </section>
        <section className="section__products">
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
          { (products) ? (
            products.map((product) => (
              <ProductCard
                key={ product.id }
                product={ product }
                inHome
                shipping={ product.shipping.free_shipping }
                getQuantityCart={ this.getQuantityCart }
              />
            ))
          ) : <p>Nenhum produto foi encontrado</p> }
        </section>
      </div>
    );
  }
}

export default Home;
