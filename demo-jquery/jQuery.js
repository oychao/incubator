(function(freeSelf) {

  /*entrance*/

  const $ = jQuery = freeSelf.$ = freeSelf.jQuery = function(selector, context) {
    return new $.fn.init(selector, context);
  };
  
  $.fn = $.prototype;
  
  $.fn.init = function(selector, context) {
    context = context || document;
    const self = this;
    try {
      let domArr;
      if ($.isArray(selector)) {
        domArr = selector;
      } else if ($.isString(selector)) {
        const nodeList = context.querySelectorAll(selector);
        domArr = Array.prototype.slice.apply(nodeList);
      } else if ($.isHTMLElement(selector)) {
        self[0] = selector;
        self.length = 1;
      } else if ($.isFunction(selector)) {

      }
      if (domArr) {
        domArr.forEach(function(elem, idx) {
          self[idx] = elem;
        });
        self.length = domArr.length;
      }
    } catch (e) {
      self[0] = createElement(selector);
      self.length = 1;        
    }
  };

  $.fn.init.prototype = $.fn;
  
  $.extend = $.fn.extend = function() {
    const args = Array.prototype.slice.apply(arguments);
    source = args[1] || args[0];
    target = source === args[0] ? this : args[0];
    for (let prop in source) {
      if (source.hasOwnProperty(prop)) {
        target[prop] = source[prop];
      }
    }
    return target;
  };

  /*tool functions*/

  function handleClass(jQueryObj, className, strategy) {
    if ($.isFunction(className)) {
      jQueryObj.each(function(idx, elem) {
        elem.classList[strategy](className(idx));
      });
    } else if ($.isString(className)) {
      const newClasses = className.split(/\s/);
      jQueryObj.each(function(_, elem) {
        newClasses.forEach(function(cls) {
          elem.classList[strategy](cls);
        });
      });
    }
    return jQueryObj;
  }
  
  function createElement(str) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = str;
    return wrapper.firstChild;
  }

  /*jQuery and proto each*/

  $.extend({
    each(arr, func) {
      for (let i = 0; i < arr.length; i++) {
        func(i, arr[i]);
      }
    }
  });
  $.fn.extend({
    each(func) {
      if (func && $.isFunction(func)) {
        for (let i = 0; i < this.length; i++) {
          func.call(this[i], i, this[i]);
        }
      }
      return this;
    }
  });

  /*proto functions*/
  
  /*dom selectors*/
  
  $.fn.extend({
    constructor: $,
    pushStack(elems) {
      let ret = this.constructor();
      for (let i = 0; i < elems.length; i++) {
        ret[i] = elems[i];
      }
      ret.length = elems.length;
      ret.prevObject = this;
      return ret;
    },
    find(selector) {
      if (!$.isString(selector)) {
        throw new Error('A selector string needed.');
      }
      let ret = [];
      this.each(function(_, elem) {
        ret = ret.concat(Array.prototype.slice.apply(elem.querySelectorAll(selector)));
      });
      return this.pushStack(ret);
    },
    first() {
      return this.eq(0);
    },
    last() {
      return this.eq(-1);
    },
    eq(i) {
      const j = +i + (i < 0 ? this.length : 0);
      return this.pushStack(j >= 0 && j < this.length ? [this[j]] : []);
    },
    end() {
      return this.prevObject || this.constructor();
    },
    filter(selector) {
      let domArr = Array.prototype.slice.apply(this);
      domArr = domArr.filter(function(elem) {
        return Array.prototype.slice.apply(elem.parentNode.querySelectorAll(selector)).indexOf(elem) !== -1;
      });
      return this.pushStack(domArr);
    },
    has(selector) {
      const domArr = [];
      this.each(function(_, elem) {
        if ($(selector, elem).length) {
          domArr.push(elem);
        }
      });
      return this.pushStack(domArr);
    },
    index(elem) {
      let idx = -1;
      this.each(function(_idx, _elem) {
        if (elem === _elem && idx === -1) {
          idx = _idx;
        }
      });
      return idx;
    },
    slice() {
      return this.pushStack(Array.prototype.slice.apply(this, arguments));
    },
    not(selector) {
      let domArr = Array.prototype.slice.apply(this);
      domArr = domArr.filter(function(elem) {
        return Array.prototype.slice.apply(elem.parentNode.querySelectorAll(selector)).indexOf(elem) === -1;
      });
      return this.pushStack(domArr);
    },
    parent() {
      let domArr = [];
      this.each(function(_, elem) {
        if (domArr.indexOf(elem.parentNode) === -1) {
          domArr.push(elem.parentNode);
        }
      });
      return this.pushStack(domArr);
    },
    parents() {
      return this.parentsUntil();
    },
    parentsUntil(selector) {
      selector = selector || document;
      let domArr = [];
      this.each(function(_, elem) {
        while(true) {
          elem = elem.parentNode;
          let curLevel = $(elem);
          if (!elem || curLevel.is(selector)) {
            break;
          }
          if (domArr.indexOf(elem) === -1 && elem !== document) {
            domArr.push(elem);
          }
        }
      });
      return this.pushStack(domArr);
    },
    add(selector) {
      const thisElems = Array.prototype.slice.apply(this);
      const elems = Array.prototype.slice.apply(this.constructor(selector)).concat(thisElems);
      return this.pushStack(elems);
    },
    detach(selector) {
      const thisElems = Array.prototype.slice.apply(this);
      elems = thisElems.filter(function(elem) {
        return !$(elem).is(selector);
      });
      return this.pushStack(elems);
    },
    is(selector) {
      let ret = false;
      if ($.isHTMLElement(selector) || selector === document) {
        ret = Array.prototype.indexOf.call(this, selector) !== -1;
      } else if ($.isString(selector)) {
        this.each(function(_, elem) {
          if (elem.matches(selector)) {
            ret = true;
          }
        });
      }
      return ret;
    },
    get(index) {
      if (index === undefined) {
        return Array.prototype.slice.call(this);
      }
      return index < 0 ? this[index + this.length] : this[index];
    }
  });

  /*dom handling functions*/

  $.fn.extend({
    clone() {
      const newObjs = [];
      this.each(function(_, elem) {
        newObjs.push(createElement(elem.outerHTML));
      });
      return new $.fn.init(newObjs);
    },
    append(child) {
      child = child[0] || child;
      if (!child || !$.isHTMLElement(child)) {
        throw new Error('Not a valid element!');
      }
      this[0].appendChild(child);
      return this[0];
    },
    appendTo(target) {
      const self = this;
      if ($.isString(target)) {
        $(target).each(function(_, parent) {
          self.each(function(_, child) {
            parent.appendChild(child);
          });
        });
      }
      return this;
    },
    prepend(child) {
      child = child[0] || child;
      const firstChild = this[0].children[0];
      this[0].insertBefore(child[0], this[0].children[0]);
    },
    prependTo() {
      const self = this;
      if ($.isString(target)) {
        $(target).each(function(_, parent) {
          self.each(function(_, child) {
            $(parent).prepend(child);
          });
        });
      }
    },
    remove() {
      this.each(function(_, elem) {
        elem.parentNode.removeChild(elem);
      });
      return this;
    },
    replaceWith(newContent) {
      this.each(function(_, elem) {
        elem.parentNode.replaceChild($(newContent)[0], elem);
      });
      return this;
    },
    replaceAll(target) {
      const self = this;
      $(target).each(function(idx, elem) {
        elem.parentNode.replaceChild(self.clone()[0], elem);
      });
      return this;
    },
    before(content) {
      if ($.isString(content)) {
        this.each(function(_, elem) {
          elem.parentNode.insertBefore(createElement(content), elem);
        });
      }
      if ($.isFunction(content)) {
        this.each(function(idx, elem) {
          elem.parentNode.insertBefore(createElement(content(idx)), elem);
        });
      }
      return this;
    },
    after(content) {
      if ($.isString(content)) {
        this.each(function(_, elem) {
          elem.parentNode.insertBefore(createElement(content), elem.nextSibling);
        });
      }
      if ($.isFunction(content)) {
        this.each(function(idx, elem) {
          elem.parentNode.insertBefore(createElement(content(idx)), elem.nextSibling);
        });
      }
      return this;
    }
  });

  /*general attributes*/

  $.fn.extend({
    attr(attributeName) {
      return this[0].attributes[attributeName].value;
    },
    val(value) {
      if (value && $.isFunction(value)) {
        this.each(function(idx, elem) {
          elem.value = value(idx, elem);
        });
        return this;
      } else if (value && $.isString(value)) {
        this.each(function(_, elem) {
          elem.value = value;
        });
        return this;
      }
      return this[0].value;
    },
    html(htmlStr) {
      if (!htmlStr) {
        return this[0].innerHTML;
      }
      return this.each(function(idx, elem) {
        if ($.isFunction(htmlStr)) {
          elem.innerHTML = htmlStr(idx, elem.innerHTML);
        } else if ($.isString(htmlStr)) {
          elem.innerHTML = htmlStr;
        }
      });
    },
    text(value) {
      if (!value) {
        return this[0].innerHTML;
      }
      return this.each(function(_, elem) {
        elem.innerHTML = value;
      });
    },
    empty() {
      this.each(function(_, elem) {
        elem.innerHTML = '';
      });
    }
  });

  /*event functions*/

  $.fn.extend({
    on(event, selector, callback) {
      if (selector && callback) {
        this.each(function(_, elem) {
          elem.addEventListener(event, function(e) {
            if ($(e.target).is(selector)) {
              callback.call(e.target, e);
            }
          }, false);
        });
      } else {
        callback = selector;
        this.each(function(_, elem) {
          elem.addEventListener(event, callback, false);
        });
      }
      this.each(function(_, elem) {
        elem.jQuery = elem.jQuery || {};
        elem.jQuery.callbacks = elem.jQuery.callbacks || {};
        elem.jQuery.callbacks[event] = elem.jQuery.callbacks[event] || [];
        elem.jQuery.callbacks[event].push(callback); 
      });
      return this;
    },
    one(event, selector, callback) {
      this.each(function(_, elem) {
        const f = function(e) {
          callback.call(elem, e);
          elem.removeEventListener(event, f);
        };
        elem.addEventListener(event, f, false);
      });
      this.each(function(_, elem) {
        elem.jQuery = elem.jQuery || {};
        elem.jQuery.callbacks = elem.jQuery.callbacks || {};
        elem.jQuery.callbacks[event] = elem.jQuery.callbacks[event] || [];
        elem.jQuery.callbacks[event].push(callback); 
      });
      return this;
    },
    off(event) {
      return this.each(function(_, elem) {
        if (elem.jQuery && elem.jQuery.callbacks && elem.jQuery.callbacks[event]) {
          $.each(elem.jQuery.callbacks[event], function(_, handler) {
            elem.removeEventListener(event, handler);
            elem.jQuery.callbacks[event] = [];
          });
        }
      });
    },
    trigger(event) {
      return this.each(function(_, elem) {
        elem.dispatchEvent(new Event(event));
      });
    }
  });
  $.each('blur focus click change dblclick contextmenu'.split(' '), function(idx, event) {
    $.fn[event] = function(handler) {
      if (handler) {
        this.each(function(_, elem) {
          $(elem).on(event, handler);
        });
      } else {
        this.trigger(event);
      }
      return this;
    };
  });

  /*style functions*/

  $.fn.extend({
    css(propRaw, value) {
      if ($.isString(propRaw)) {
        this.each(function(_, elem) {
          elem.style[propRaw] = value;
        });
      } else if ($.isObject(propRaw)) {
        this.each(function(_, elem) {
          for (let prop in propRaw) {
            elem.style[prop] = propRaw[prop];
          }
        });
      }
      return this;
    },
    hasClass(className) {
      this.each(function(_, elem) {
        if (elem.classList.contains(className)) {
          return true;
        }
      });
      return false;
    },
    addClass(className) {
      return handleClass(this, className, 'add');
    },
    removeClass(className) {
      return handleClass(this, className, 'remove');
    },
    toggleClass(className) {
      return handleClass(this, className, 'toggle');
    }
  });
  $.each('width height'.split(' '), function(idx, prop) {
    $.fn[prop] = function() {
      const style = getComputedStyle(this[0]);
      return +style[prop].slice(0, -2);
    };
  });

  /*jQuery animations*/
  // To Be Improved, jQuery.Deferred needed
  $.fn.extend({
    fadeIn() {
      this.each(function(idx, elem) {
        elem.style.opacity = 0;
        // elem.style.display = "block";
        (function fade() {
          if (elem.style.opacity < 1) {
            elem.style.opacity = +elem.style.opacity + .025;
            requestAnimationFrame(fade);
          }
        })();
      });
      return this;
    }
  });

  /*jQuery functions*/

  $.extend({
    isObject(elem) {
      return Object.prototype.toString.call(elem) === '[object Object]';
    },
    isString(elem) {
      return Object.prototype.toString.call(elem) === '[object String]';
    },
    isFunction(elem) {
      return Object.prototype.toString.call(elem) === '[object Function]';
    },
    isArray: Array.isArray,
    isHTMLElement(elem) {
      return elem instanceof HTMLElement;
    },
    inArray(elem, list, fromIndex) {
      return !list ? -1 : Array.prototype.indexOf.call(list, elem, fromIndex);
    }
  });

  $.extend({
    createDOM(contentType, innerHTML) {
      const domObj = document.createElement(contentType);
      domObj.innerHTML = innerHTML;
      return domObj;
    }
  });

  $.Callbacks = function(options) {
    options = $.isString(options) ? 
    { [options]: true } :
    $.extend({}, options);

    // store functions
    let list = [];
    // record fired functions
    let queue = [];
    // record last fired value
    let memory;
    return {
      add(fn) {
        const self = this;
        (function add(args) {
          Array.prototype.forEach.call(args, function(arg) {
            if ($.isFunction(arg)) {
              if (!self.has(arg)) {
                list.push(arg);
                if (options.memory) {
                  queue.push(arg);
                }
              }
            } else if (arg && arg.length) {
              add(arg);
            }
          });
        })(arguments);
        if (options.memory && memory) {
          this.fire();
        }
        return this;
      },
      fire() {
        memory = arguments.length ? Array.prototype.slice.apply(arguments) : memory;
        const self = this;
        if (!queue.length) {
          queue = list.slice();
        }
        queue.forEach(function(fn) {
          fn.apply(null, memory);
        });
        if (options.once) {
          list = [];
        }
        queue = [];
        return this;
      },
      has(fn) {
        return $.inArray(fn, list) !== -1;
      },
      remove(fn) {
        list.splice($.inArray(fn, list), 1);
        queue.splice($.inArray(fn, list), 1);
        return this;
      },
      eject() {
        return list;
      }
    };
  };
})(self || this);
