import React from "react";


import "./styles.css";
import {Desktop, Tablet, Mobile, Default} from "../../actions/checkScreenSize";

class Calculator extends React.Component {

  constructor(props) {
    super(props);

    this.state = {


    };

  }



  render() {

      return (
        <div  className="calculator">
          <h1>Checkout Calculator</h1>
          <Default>Not mobile (desktop or laptop or tablet)</Default>


          <Desktop>Desktop or laptop</Desktop>
          <Tablet>Tablet</Tablet>
          <Mobile>Mobile</Mobile>

        </div>
      )
    }



}

export default Calculator;
