import React from 'react';
import ReactDOM from 'react-dom';
import Template from './components';

document.cookie = 'cross-site-cookie=bar; SameSite=Strict';

ReactDOM.render(<Template />, document.querySelector('#root'));
