import React from 'react';

import './styles.css';
import Select from 'react-select';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import { GiShoppingCart } from 'react-icons/gi';
import { uid } from 'react-uid';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { CART, ITEMS } from '../../config';

class Calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: null,
      items: null,
      itemsInCart: [],
      chosenItem: ' ',
      chosenQuantity: 0,
      discount: 0,
      checkoutMode: false,
    };
  }

  componentDidMount() {
    this.getItems();
  }

  getItems() {
    fetch(ITEMS)
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          items: json,
        });
        this.forceUpdate();
      })
      .catch(() => {
      });
  }

  handleItemInput(parameter, value) {
    this.setState({
      [parameter]: value,
    });
  }

  handleChange(name, value) {
    this.setState({
      [name]: value,
    });
  }

  addItemToCart(state) {
    if (!state.chosenItem || !state.chosenQuantity) {
      NotificationManager.error('Please choose an item and its quantity');
      return;
    }
    if (state.chosenQuantity <= 0) {
      NotificationManager.error('Please choose a positive quantity');
      return;
    }
    const itemAlreadyInCart = state.itemsInCart.filter(
      (item) => item.label === state.chosenItem.label,
    );
    if (itemAlreadyInCart.length !== 0) {
      NotificationManager.error('This item is already in the cart');
      return;
    }
    const item = state.chosenItem;
    const items = state.itemsInCart;
    item.quantity = state.chosenQuantity;
    items.push(item);
    this.setState({
      itemsInCart: items,
    });
  }


  removeItemFromCart(state, item) {
    const items = state.itemsInCart;
    const updatedItems = items.filter(
      (i) => i !== item,
    );
    this.setState({
      itemsInCart: updatedItems,
    });
  }

  startNewCart() {
    this.setState({
      cart: null,
      itemsInCart: [],
      chosenItem: null,
      chosenQuantity: null,
      discount: 0,
      checkoutMode: false,
    });
  }

  checkout(state) {
    if (state.discount < 0) {
      NotificationManager.error('Please enter a positive value for the discount');
      return;
    }
    if (state.discount >= 1) {
      NotificationManager.error('Please enter a value smaller than 1 for the discount');
      return;
    }
    const data = {
      items: state.itemsInCart,
      discountRate: state.discount,
    };
    const request = new Request(CART, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    });
    fetch(request)
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          cart: json,
          checkoutMode: true,
        });
      })
      .catch(() => {
      });
  }

  render() {
    let yourCartIsEmpty;
    let checkoutButton;
    let cartItems;
    let summary;
    let addItemFields;

    const {
      cart, items, chosenQuantity, discount, itemsInCart, checkoutMode,
    } = this.state;

    if (itemsInCart.length !== 0 && (cart == null || cart.summary.total === 0)) {
      checkoutButton = (
        <div className="calculate-button">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => this.checkout(this.state)}
          >
            Checkout
          </Button>
        </div>
      );
    }

    if (!checkoutMode) {
      addItemFields = (
        <div>
          <div className="items">
            <h4>Which item?</h4>
            <Select
              options={items}
              onChange={(opt) => this.handleItemInput('chosenItem', opt)}
            />
          </div>
          <div className="chosen-quantity">
            <h4>How many?</h4>
            <TextField
              name="chosenQuantity"
              value={chosenQuantity}
              onChange={(e) => this.handleChange(e.target.name, e.target.value)}
              className="quantity-input"
              type="number"
              variant="outlined"
            />

            <Button
              variant="outlined"
              color="primary"
              className="add-button"
              onClick={() => this.addItemToCart(this.state)}
            >
              Add
            </Button>

          </div>
          <div className="discount">
            <h4>Discount</h4>
            <TextField
              name="discount"
              value={discount}
              onChange={(e) => this.handleChange(e.target.name, e.target.value)}
              className="discount-input"
              type="number"
              variant="outlined"
            />
            <p> Discount example: 0.5</p>
          </div>
        </div>
      );
    }

    if (checkoutMode) {
      summary = (
        <div>
          <h2>Payment Due:</h2>
          <p>
            Subtotal: $
            {cart.summary.subtotal}
          </p>
          <p>
            Discount: $
            {cart.summary.discount}
          </p>
          <p>
            Tax: $
            {cart.summary.tax}
          </p>
          <p>
            Total: $
            {cart.summary.total}
          </p>
          <Button
            variant="outlined"
            color="primary"
            className="restart-button"
            onClick={() => this.startNewCart()}
          >
            Start new cart
          </Button>
        </div>

      );
    }

    if (itemsInCart.length === 0) {
      yourCartIsEmpty = (<h3>Your cart is empty</h3>);
    } else {
      cartItems = (
        itemsInCart.map(
          (item) => (
            <div key={uid(item)}>
              <div className="cart-item">
                <span className="cart-item-label">
                  {item.label}
                  {'  :  '}
                  {item.quantity}
                  {'  x  $'}
                  {item.value}
                </span>
                {checkoutMode
                  ? null
                  : (
                    <Button
                      variant="outlined"
                      color="primary"
                      className="remove-button"
                      onClick={() => this.removeItemFromCart(this.state, item)}
                    >
                      Remove
                    </Button>
                  )}
              </div>
            </div>
          ),
        )
      );
    }
    return (
      <div className="calculator-app">
        <h1 className="calculator-title"> Checkout Calculator </h1>
        <div className="notification">
          <NotificationContainer />
        </div>
        <div className="calculator">
          <div className="items-calculator">
            {addItemFields}
            {checkoutButton}
            {summary}
          </div>
          <div className="cart">
            <GiShoppingCart id="cart-icon" />
            {yourCartIsEmpty}
            {cartItems}
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
