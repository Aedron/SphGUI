
import React, { Component } from 'react';
import { message } from 'antd';

import Nav from './component/Nav';
import Model from './component/Model';
import Args from './component/Args';
import Editor from './component/Editor';
import Conf from './component/Conf';
import About from './component/About';


import "./style/index.scss";


function App() {
  return (
    <div className="App">
      <Nav />
      <Model />
      <Args />
      <Editor />
      <Conf />
      <About />
    </div>
  );
}

message.config({
  top: 130,
  duration: 2,
  maxCount: 1,
});


export default App;
