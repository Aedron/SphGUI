
import React, { Component } from 'react';

import Nav from './component/Nav';
import Model from './component/Model';
import Args from './component/Args';
import Trans from './component/Trans';
import Conf from './component/Conf';
import About from './component/About';


import "./style/index.scss";


class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <Model />
        <Args />
        <Trans />
        <Conf />
        <About />
      </div>
    );
  }
}


export default App;
