import React from 'react';

class Checkout extends React.Component {
  render() {
    return (
      <form>
        <label htmlFor="inputNome">
          Nome Completo:
          <input
            id="inputNome"
            data-testid="checkout-fullname"
            type="text"
          />
        </label>

        <label htmlFor="inputEmail">
          Email:
          <input
            id="inputEmail"
            data-testid="checkout-email"
            type="email"
          />
        </label>

        <label htmlFor="inputCPF">
          CPF:
          <input
            id="inputCPF"
            data-testid="checkout-cpf"
            type="text"
          />
        </label>

        <label htmlFor="inputPhone">
          Telefone:
          <input
            id="inputPhone"
            data-testid="checkout-phone"
            type="text"
          />
        </label>

        <label htmlFor="inputCEP">
          CEP:
          <input
            id="inputCEP"
            data-testid="checkout-cep"
            type="text"
          />
        </label>

        <label htmlFor="inputAddress">
          Endereço:
          <input
            id="inputAddress"
            data-testid="checkout-address"
            type="text"
          />
        </label>

      </form>
    );
  }
}

export default Checkout;
