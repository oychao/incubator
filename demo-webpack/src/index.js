import $ from 'jquery';
import printMe from './print.js';

const component = function() {
  const element = document.createElement('div');
  const btn = document.createElement('button');

  element.innerHTML = 'Hello World';
  
  $(btn).html('Click me and check the console!');
  btn.onclick = printMe;

  element.appendChild(btn);

  return element;
}

document.body.appendChild(component());

export default component;
