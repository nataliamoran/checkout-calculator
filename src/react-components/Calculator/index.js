import React from 'react';

import './styles.css';
import Select from 'react-select';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import { GiShoppingCart } from 'react-icons/gi';
import { uid } from 'react-uid';
import {
  Default, Desktop, Mobile, Tablet,
} from '../../actions/checkScreenSize';
import { CART, ITEMS } from '../../config';

class Calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: null,
      items: null,
      itemsInCart: [],
      chosenItem: null,
      chosenQuantity: null,
      discount: null,
    };
  }

  componentDidMount() {
    // this.getCart();
    this.getItems();
  }

  getCart() {
    fetch(CART)
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          cart: json,
        });
      })
      .catch(() => {
      });
  }

  getItems() {
    fetch(ITEMS)
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          items: json,
        });
        // console.group('Calculator State');
        // console.log(this.state);
        // console.groupEnd();
        this.forceUpdate();
      })
      .catch(() => {
      // console.error(error);
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
    const item = state.chosenItem;
    const items = state.itemsInCart;
    item.quantity = state.chosenQuantity;
    items.push(item);
    this.setState({
      chosenItem: item,
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
      discount: null,
    });
  }

  checkout(state) {
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
        });
      })
      .catch(() => {
      // console.error(error);
      });
  }

  render() {
    let yourCartIsEmpty;
    let checkoutButton;
    let cartItems;
    let summary;
    // eslint-disable-next-line react/destructuring-assignment
    // if (this.state.items == null) {
    //   return <div />;
    // }

    const {
      cart, items, chosenQuantity, discount, itemsInCart,
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

    if (cart && cart.summary.total !== 0) {
      summary = (
        <div>
          <p>
            {'Discount: '}
            {cart.summary.discount}
          </p>
          <p>
            {'Subtotal: '}
            {cart.summary.subtotal}
          </p>
          <p>
            {'Tax: '}
            {cart.summary.tax}
          </p>
          <p>
            {'Total: '}
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
                  {'  x  '}
                  {item.value}
                </span>
                <Button
                  variant="outlined"
                  color="primary"
                  className="remove-button"
                  onClick={() => this.removeItemFromCart(this.state, item)}
                >
                  Remove
                </Button>

              </div>
            </div>
          ),
        )
      );
    }
    return (
      <div className="calculator-app">
        <h1 className="calculator-title"> Checkout Calculator </h1>
        <div className="calculator">
          <div className="items-calculator">
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
            </div>
            {checkoutButton}
            {summary}
          </div>
          <div className="cart">
            <GiShoppingCart id="cart-icon" />
            {yourCartIsEmpty}
            {cartItems}
          </div>
          <Default> </Default>
          <Desktop> </Desktop>
          <Tablet> </Tablet>
          <Mobile> </Mobile>

        </div>
      </div>
    );
  }
}

export default Calculator;
