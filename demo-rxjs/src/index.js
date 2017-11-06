// import { Observable } from 'rxjs';
import { Observable } from './Observable';

const btn = document.createElement('button');
btn.textContent = 'Click me and check the console!';
document.body.appendChild(btn);


Observable.fromEvent(btn, 'click')
  .subscribe(e => {
    console.log('hello world')
  });

console.log('test');