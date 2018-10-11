import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-dom";
import Input from './components/input';

class App extends Component {
  render() {
    return (

      <Router >
        <div className="App">
          <header className="App-header">

          </header>

          <Input />
        </div>
      </Router >

    );
  }
}

export default App;
