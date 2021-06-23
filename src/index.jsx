import React from 'react';
import ReactDOM from 'react-dom';
import Template from './components';

window.onload = () => {
  ReactDOM.render(<Template />, document.querySelector('#root'));
};
