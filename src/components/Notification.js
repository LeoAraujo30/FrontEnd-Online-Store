import React from 'react';
import PropTypes from 'prop-types';

class Notification extends React.Component {
  render() {
    const { quantityCart } = this.props;
    return (
      <div data-testid="shopping-cart-size">
        { quantityCart > 0 && `${quantityCart}` }
      </div>
    );
  }
}

Notification.propTypes = {
  quantityCart: PropTypes.number.isRequired,
};

export default Notification;
