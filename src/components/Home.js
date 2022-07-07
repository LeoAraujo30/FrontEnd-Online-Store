import React from 'react';

import { getProductsFromQuery } from '../services/api';
import ProductCard from './ProductCard';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      query: '',
      products: [],
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleInputChange({ target: { value } }) {
    this.setState({ query: value });
  }

  async handleSearch() {
    const { query } = this.state;
    const products = await getProductsFromQuery(query);
    this.setState({ products });
  }

  render() {
    const { query, products } = this.state;
    return (
      <div>
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
        </section>
        <section className="section__products">
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
          {(products && query) ? (
            products.map((product) => (
              <ProductCard key={ product.id } product={ product } />))
          ) : <p>Nenhum produto foi encontrado</p>}
        </section>
      </div>
    );
  }
}

export default Home;
