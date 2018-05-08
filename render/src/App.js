
import React, { Component } from 'react';
import { message } from 'antd';

import Nav from './component/Nav';
import Model from './component/Model';
import Args from './component/Args';
import Trans from './component/Trans';
import Conf from './component/Conf';
import About from './component/About';


import "./style/index.scss";


function App() {
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

message.config({
  top: 130,
  duration: 2,
  maxCount: 3,
});


export default App;
