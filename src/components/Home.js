import React from 'react';
import { getCategories } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      categorias: [],
    };
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

  render() {
    const { categorias } = this.state;
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
              >
                { name }
              </button>
            );
          }) }
        </div>
        <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </div>
    );
  }
}

export default Home;
