import React, { Component } from 'react';

// Component
import {Header} from './components/Header.jsx'
import {Gallery } from './components/Gallery.jsx';


class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Gallery />
      </React.Fragment>
    );
  }
}

export default App;
