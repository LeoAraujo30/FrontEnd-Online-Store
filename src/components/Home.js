import React from 'react';
import { Link } from 'react-router-dom';

import { getCategories, getProductsFromQuery } from '../services/api';
import ProductCard from './ProductCard';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      query: '',
      products: [],
      categorias: [],
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.handleCategories();
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

  getProductsByCategory = async (name) => {
    const array = await getProductsFromQuery(name);
    this.setState({
      products: array,
    });
  }

  render() {
    const { query, products, categorias } = this.state;
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
                onClick={ () => this.getProductsByCategory(name) }
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
          <Link data-testid="shopping-cart-button" to="/shoppingcart">carrinho</Link>
        </section>
        <section className="section__products">
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
          {(products) ? (
            products.map((product) => (
              <ProductCard key={ product.id } product={ product } />))
          ) : <p>Nenhum produto foi encontrado</p>}
        </section>
      </div>
    );
  }
}

export default Home;
