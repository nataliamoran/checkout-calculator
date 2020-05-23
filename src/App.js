import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Calculator from './react-components/Calculator';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Calculator state={this.state} />}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
