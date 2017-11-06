const Observable = {};

const fromEventObservable = function(target, event) {
  this.target = target;
  this.event = event;
};

fromEventObservable.prototype.subscribe = function(fn) {
  this.target.addEventListener(this.event, function(e) {
    fn.call(this);
  });
};

Observable.fromEvent = function(target, event) {
  return new fromEventObservable(target, event);
};

export { Observable };