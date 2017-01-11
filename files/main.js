global.React = require('react');
global.ReactDOM = require('react-dom');
const Root = require('./parkingLot');
const dom = document.getElementById('container');
ReactDOM.render(React.createElement(Root,{size:10}), dom);
