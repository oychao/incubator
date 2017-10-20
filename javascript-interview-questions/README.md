# 28道JavaScript必备面试题

**参考：[25 Essential JavaScript Interview Questions](https://www.toptal.com/javascript/interview-questions)**

**注：主要题源来自上面的链接，至于具体内容，绝大多数题目基本都是按照笔者的思路都重写了一遍，也有几道题一开始没理解好的，根据原文大意重写的。**

**笔者会后续更新补充更多的面试题目，建议有兴趣的同学将原文和本文都阅读一遍，收获更多。**

---

### 1.typeof bar === 'object'会有什么潜在问题？如何避免这个潜在问题？

如果```bar```确实是一个普通的对象类型，那```typeof bar === 'object'```会返回```true```，然而JavaScript中，但如果上面的```bar```是数组或者```null```，那上面的等式也是成立的。一种可行的做法是```Object.prototype.toString.apply(bar) === '[object Object]'```。

```javascript
const foo = {};
const bar = [];
const baz = null;

console.log(Object.prototype.toString.apply(foo)); // [object Object]
console.log(Object.prototype.toString.apply(bar)); // [object Array]
console.log(Object.prototype.toString.apply(baz)); // [object Null]
```

>注意这里不能直接调用```bar.toString()```，而是转换一下，使用上面的方式，因为如果当```bar```是```null```的时候将会报错误。

### 2.下面的代码将会输出什么？为什么？

```javascript
(function(){
  var a = b = 3;
})();

console.log("a defined? " + (typeof a !== 'undefined'));
console.log("b defined? " + (typeof b !== 'undefined'));
```

这道题考察的是**hoisting（变量提升）**，熟悉```var```的同学应该知道，使用```var```定义的变量将会被提升到作用域的最前面。上述代码等同于：

```javascript
(function(){
  b = 3;
  var a;
  a = b;
})();

// ...
```

这里的```b```实际上是一个全局变量，所以b的作用范围明显能在任何地方被访问到（如果没有被子作用域覆盖掉的话）。所以输出的结果，第一行是```false```，第二行是```true```。

>注意，实际编码过程中不要这样声明变量，应该一次声明占一行，此外不推荐使用全局变量，比如上述代码，如果在严格模式下是会报错的。熟悉ES6的同学也应该尽量使用```let```和```const```来声明变量或者常量（不存在变量提升）。

### 3.下面的代码将会输出什么？为什么？

```javascript
var myObject = {
  foo: "bar",
  func: function() {
    var self = this;
    console.log("outer func:  this.foo = " + this.foo);
    console.log("outer func:  self.foo = " + self.foo);
    (function() {
      console.log("inner func:  this.foo = " + this.foo);
      console.log("inner func:  self.foo = " + self.foo);
    }());
  }
};
myObject.func();
```

这道题考察的是对JavaScript中```this```的理解。```this```有很多种情况，但一般情况下，它指向当前对象，比如上述代码中，调用```func```的是```myObject```，所以这里的```this```就是```myObject```，```this.foo```就是```"bar"```了。```self```在被传入IIFE（立即调用函数表达式）中之前，就已经被赋值为外面的```this```了，因此```self.foo```也是```"bar"```。**而所有IIFE中的```this```，不是```undefined```（严格模式下），就是```global```或者```window```（非严格模式下）**，因此这里的它指向```global```，而```global.foo```是```undefined```。

输出结果如下。

```javascript
// outer func:  this.foo = bar
// outer func:  self.foo = bar
// inner func:  this.foo = undefined
// inner func:  self.foo = bar
```

### 4.将一整个JavaScript代码段包进一个函数块中有什么原因或者意义？

这里又是问的关于IIFE的问题。

IIFE就是创建了一个闭包，一个表达式，并且是立即执行的。

它的主要作用是创建一个私有命名空间，避免和其他模块和库产生命名冲突，也因此其在开发各种模块和库的时候经常用到。

### 5.在JavaScript文件开头使用'use strict'有什么好处或者意义？

JavaScript中的```'use strict'```表示严格模式，由于一些历史原因，JavaScript在ES3时代有一些不合理的设计，在ES5中当然不能直接禁止这些不合理设计的存在，因为必须要考虑版本兼容性问题，于是在ES5中推出了严格模式来避免这些设计的使用。

一般而言使用严格模式都是一种好的实践。

1. 严格模式下变量必须先声明再使用，不存在默认给```global```定义属性；
2. 对象属性禁止重复定义；
3. 限定```this```，在严格模式下，嵌套函数的```this```只指向```undefined```（没有使用```bind()```或其他函数绑定的情况下）；
4. ```eval()```函数变得更安全；
5. 错误使用```delete```关键字时报错等等。

严格模式可以放在全局环境下（文件开始处），也可以放在某个函数的开始处。

```javascript
function foo() {
  'use strict'
  // ...
}
```

>应该避免```eval()```函数的使用，除非你非常清楚的知道你在干什么，并且除了```eval()```以外没有更好的做法。

### 6.下面两段代码是否输出同样内容？

```javascript
function foo1() {
  return {
    bar: 'hello'
  };
}
```

```javascript
function foo2() {
  return
  {
    bar: 'hello'
  };
}
```

结果是第一段代码返回了正确的对象，第二段代码返回的是```undefined```。

这是JavaScript的和分号的一个坑，第一段代码很好解释，第二段代码实际上等价于：

```javascript
function foo2() {
  return ;
  {
    bar: 'hello'
  };
}
```

>JavaScript中的函数、对象的左大括号的位置请永远放在和函数名、对象名同一行的位置（1TBS方式，即本例中的第一种），而不应该另起一行（Allman方式，常用于C语言中的对其方式，即本例中的第二种）。具体可以参考：[Indent Style](https://en.wikipedia.org/wiki/Indent_style#Placement_of_braces)。
>
>请永远使用分号。JavaScript本身是一个规则比较弱的语言，如果编码不得当而自己对JavaScript理解又不深，经常会出现这种坑。可以借助ESLint等工具强制检查自己的代码。

### 7.NaN是什么？如何可靠地检测一个变量是否是NaN？

JavaScript中的```NaN```是Not a Number的缩写，但实际上它又属于数字类型。

```javascript
console.log(typeof NaN); // number
```

它用于一些特殊情况，比如开方一个负数，或者转换一个无法被转换为数字的字符串。

```javascript
console.log(Math.sqrt(-1)); //NaN
console.log(+'foo'); // NaN
console.log(0 / 0); // NaN
```

JavaScript中提供了全局函数```isNaN()```来判断一个变量是否是NaN，但是并不是很可靠。

```javascript
isNaN(NaN); // true
isNaN(undefined); // true
isNaN({}); // true
```

如果想要更精确的结果，应该用ES6中的```Number.isNaN()```方法。

```javascript
Number.isNaN(NaN); // true
Number.isNaN(undefined); // false
Number.isNaN({}); // false
```

或者```NaN```自身不等于自身这一个特性。

```javascript
const foo = NaN;
console.log(foo === foo);
```

>注意```0 / 0```是```NaN```，但别的实数除零就不是```NaN```了，而是```Infinity```或者```-Infinity```。

### 8.下面代码会输出什么？为什么？

```javascript
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3);
```

答案是```0.30000000000000004```和```false```。

JavaScript中的小数采用的是二进制浮点的表示法，会有误差。

处理的可以采用如下思路：

```javascript
const TEN = 10;
console.log((0.1 * TEN + 0.2 * TEN) / TEN);
```

### 9.讨论如何判断一个数是否是整数的函数isInteger(x)的实现方法。

在ES6中，已经有这样的方法了：```Number.isInteger(x)```。

- 最干净简介的写法：

```javascript
function isInteger(x) {
  return (x ^ 0) === x; // 整数异或0还是自身，小数则不是。
} 
```

- 取整法：

```javascript
function isInteger(x) {
  return Math.round(x) === x; //Math.ceil()或者Math.floor()与Math.round()像似。
}
```

- 取余法：

```javascript
function isInteger(x) {
  return (typeof x === 'number') && x % 1 === 0;
}
```


- **错误写法：**

```javascript
function isInteger(x) {
  return parseInt(x, 10) === x;
}
```

这种写法在转换大数时会出错误，因为```parseInt()```会将第一次参数先转换为字符串，而当参数非常大时，字符串会采用科学计数法。如```parseInt(1000000000000000000000, 10)```等同于```parseInt(1e21, 10)```，而转换过程中遇到```'e'```时，转换停止，也就是说```parseInt(1000000000000000000000, 10) === 1```。

>注意parseInt()的这个坑。

### 10.下面代码执行时，数字1-4会以怎样的顺序输出？为什么？

```javascript
(function() {
  console.log(1); 
  setTimeout(function(){console.log(2)}, 1000); 
  setTimeout(function(){console.log(3)}, 0); 
  console.log(4);
})();
```

结果是```1```，```4```，```3```，```2```。

这个毫无疑问是熟悉异步编程的基础。执行过程如下：

1. 执行IIFE；
2. 执行第一句，输出```1```；
3. 执行第二句，设定计时器，一千豪秒后将输出```2```的匿名函数加入主线程中；
4. 执行第三句，设定计时器，零豪秒后将输出```3```的匿名函数加入主线程中；
5. 执行第四句，输出```4```。

这里最大的问题就是第三句，为什么零毫秒后没有立即输出```3```，而是继续输出```4```。

注意上面的步骤中的描述：将XXX匿名函数加入到主线程中，JavaScript是单线程的，```setTimeout()```和```setInteval()```从来都不是到了指定时间立刻执行指定函数，而是到了指定时间将指定函数加入到主线程中。因此，```3```排在```4```后面。

### 11.写一个返回boolean值的少于80字符的函数来判断一个字符串是否是回文。

```javascript
function isPalindrome(str) {
  // 去除所有非字母的字符，并小写化字母。
  str = str.replace(/\W/g, '').toLowerCase();
  // 分割为单个字符的数组，反转，再合并。
  return (str == str.split('').reverse().join(''));
}
```

需要熟悉JavaScript的string的API。

### 12.写一个sum函数使之无论以下面哪种方式都能正确运行。

```javascript
console.log(sum(2, 3));  // Outputs 5
console.log(sum(2)(3));  // Outputs 5
```

这个题目的考察点有几个，实现的方式也有不同（这里不考虑参数类型的判断问题）。

- 直接理解，既然可能是一个参数，也可能是两个参数，那就直接写：

```javascript
function sum(x, y) {
  if(y === undefined) {
    return function(z) {
      return y + z;
    } 
  } else {
    return x + y;
  }
}
```

- 使用```arguments```，和第一种方法类似：

```javascript
function sum() {
  if(arguments[1] === undefined) {
    return function(z) {
      return arguments[0] + z;
    }
  } else {
    return arguments[0] + arguments[1];
  }
}
```

- 函数柯里化，这个应该是面试官最想看到的答案，因为它适用于任何函数：

```javascript
const curry = (() => {
  const currying = (fn, fnArgsLength = fn.length) => {
    return function() {
      const args = Array.prototype.slice.apply(arguments);
      if(args.length >= fnArgsLength) {
        return fn.apply(null, args);
      }
      return currying(function() {
        const followingArgs = Array.prototype.slice.apply(arguments);
        return fn.apply(null, args.concat(followingArgs));
      }, fnArgsLength - args.length);
    }
  }

  const curry = fn => currying(fn);

  return curry;
})();

const sum = curry((x, y) => x + y);

console.log(sum(2, 3));  // Outputs 5
console.log(sum(2)(3));  // Outputs 5
```

理解curry函数的实现需要对闭包有比较清晰的理解，这里有一篇相关博客：[JavaScript函数柯里化 | 传不习乎](https://oychao.github.io/2017/01/26/javascript/27_currying/)。

### 13.考虑下面的代码段。

```javascript
for (var i = 0; i < 5; i++) {
  var btn = document.createElement('button');
  btn.appendChild(document.createTextNode('Button ' + i));
  btn.addEventListener('click', function(){ console.log(i); });
  document.body.appendChild(btn);
}
```

问题一：当用户单击```Button4```时控制台会输出什么？为什么？
问题二：请提供一个或多个能按期待输出的实现方法。

这里考察的是闭包以及函数作用域和块级作用域的区别。

实际上当上面代码片段执行完成之后，所有绑定的事件处理函数中访问到的```i```都是同一个```i```，他们都访问的是同一个函数作用域。也就是说输出的都是```5```。

- 为了解决这个问题，我们需要为每一个事件添加一个作用域，以保存当前循环中的```i```。

```javascript
for (var i = 0; i < 5; i++) {
  var btn = document.createElement('button');
  btn.appendChild(document.createTextNode('Button ' + i));
  (function(x) {
    btn.addEventListener('click', function() {console.log(x);});
  })(i);
  document.body.appendChild(btn);
}
```

- 或者使用```forEach()```方法，```forEach()```每一次循环都是一个新的函数作用域。

```javascript
['a', 'b', 'c', 'd', 'e'].forEach(function (value, i) {
  var btn = document.createElement('button');
  btn.appendChild(document.createTextNode('Button ' + i));
  btn.addEventListener('click', function() { console.log(i); });
  document.body.appendChild(btn);
});
```

- 又或者使用ES6中的```let```，```let```使用的是块级作用域。

```javascript
for (let i = 0; i < 5; i++) {
  const btn = document.createElement('button');
  btn.appendChild(document.createTextNode('Button ' + i));
  btn.addEventListener('click', function(){ console.log(i); });
  document.body.appendChild(btn);
}
```

### 14.下面代码会输出什么到控制台？为什么？

```javascript
var arr1 = "john".split('');
var arr2 = arr1.reverse();
var arr3 = "jones".split('');
arr2.push(arr3);
console.log("array 1: length=" + arr1.length + " last=" + arr1.slice(-1));
console.log("array 2: length=" + arr2.length + " last=" + arr2.slice(-1));
```

这个试试在控制台运行一遍，也许结果跟你想的不一样，里面有几个小坑。

三个需要注意的地方：

1. ```reverse()```会改变数组本身，并将自身的引用作为返回值；
2. ```push()```是将参数添加到数组的尾部，并不是合并，合并两个数组该用```concat()```；
3. ```slice(-1)```返回数组的最后一个元素。

需要熟悉JavaScript的array的API。

### 15.下面代码会输出什么到控制台？为什么？

```javascript
console.log(1 +  "2" + "2");
console.log(1 +  +"2" + "2");
console.log(1 +  -"1" + "2");
console.log(+"1" +  "1" + "2");
console.log("A" - "B" + "2");
console.log("A" - "B" + 2);
```

考察类型转换，结果如下：

```javascript
console.log(1 +  "2" + "2"); // '122'
console.log(1 +  +"2" + "2"); // '32'
console.log(1 +  -"1" + "2"); // '02'
console.log(+"1" +  "1" + "2"); // '112'
console.log("A" - "B" + "2"); // 'NaN2'
console.log("A" - "B" + 2); // NaN
```

注意前五个都是输出的字符串，最后一个输出的是数字```NaN```。

### 16.下面的递归代码中如果数组太大会栈溢出，你怎么才能在保存递归结构的条件下解决这个问题？

```javascript
var list = readHugeList();

var nextListItem = function() {
  var item = list.pop();

  if (item) {
    // process the list item...
    nextListItem();
  }
};
```

主线程中函数调用栈太深，想办法把栈弄浅。第10问中已经给了我们很好的启示。

```javascript
var list = readHugeList();

var nextListItem = function() {
  var item = list.pop();

  if (item) {
    // process the list item...
    setTimeout(nextListItem, 0);
  }
};
```

### 17.JavaScript中的闭包是什么？请给出示例。

闭包就是内部函数可以访问外部函数的作用域，一般还会暴露一些接口出来，可以借用闭包实现模块化和私有变量。

```javascript
const plus = x => y => x + y;

const plus2 = plus(2);
console.log(plus2(3)); // 5

const plus3 = plus(3);
console.log(plus3(2)); // 5
```

上面代码中```plus```嵌套了两个箭头函数，```x```依然可以在最里层的函数中被访问（```x + y```），并且外层函数中返回了```y => x + y```。

>这里只是随便举个简单的例子，闭包是JavaScript中的基础。

### 18.下面代码将会输出什么？为什么？闭包在这里有没有什么用处？

```javascript
for (var i = 0; i < 5; i++) {
  setTimeout(function() { console.log(i); }, i * 1000);
}
```

答案是每隔一秒输出一个```5```。这道题与第13题异曲同工，闭包的解决方案如下。

```javascript
for (var i = 0; i < 5; i++) {
  (function(x) {
    setTimeout(function() { console.log(i); }, x * 1000);    
  })(i);
}
```

### 19.下面的代码将会输出什么到控制台？为什么？

```javascript
console.log("0 || 1 = " + (0 || 1));
console.log("1 || 2 = " + (1 || 2));
console.log("0 && 1 = " + (0 && 1));
console.log("1 && 2 = " + (1 && 2));
```

考察JavaScript中的逻辑运算符，结果是。

```javascript
console.log("0 || 1 = " + (0 || 1)); // 1
console.log("1 || 2 = " + (1 || 2)); // 1
console.log("0 && 1 = " + (0 && 1)); // 0
console.log("1 && 2 = " + (1 && 2)); // 2
```

JavaScript中逻辑与和逻辑或都会返回一个值。

对于逻辑与：如果前一项为真，则返回的结果为后一项；如果前一项为假，则返回的结果为前一项。
对于逻辑或：如果前一项为真，则返回的结果为前一项；如果前一项为假，则返回的结果为后一项。

### 20.下面代码执行时会输出什么？为什么？

```javascript
console.log(false == '0');
console.log(false === '0');
```

第一个为```true```，第二个为```false```。```==```对比时进行类型转换，```===```对比时严格进行类型和值的对比。

>注意尽量使用```===```对比。

### 21.下面代码会输出什么？为什么？

```javascript
var a={},
  b={ key:'b' },
  c={ key:'c' };

a[b]=123;
a[c]=456;

console.log(a[b]);
```

结果是```456```，当对象作为键时，会转换为字符串，这里两个对象转换的结果都是```[object Object]```。很明显```a['[object Object]']```被覆盖掉了。

### 22.下面代码将会输出什么到控制台？为什么？

```javascript
console.log((function f(n){ return ((n > 1) ? n * f(n - 1) : n) })(10));
```

最基本的递归调用，结果是10的阶乘。

### 23.考虑下面的代码段，控制台会输出什么？为什么？

```javascript
(function(x) {
  return (function(y) {
    console.log(x);
  })(2)
})(1);
```

结果是```1```，词法作用域，在创建的时候就已经确定了作用域。这里和上面几道关于闭包和IIFE的题目并无太多不同。

### 24.下面的代码会输出什么到控制台？为什么？这段代码哪里有问题？怎么解决？

```javascript
var hero = {
  _name: 'John Doe',
  getSecretIdentity: function (){
    return this._name;
  }
};

var stoleSecretIdentity = hero.getSecretIdentity;

console.log(stoleSecretIdentity());
console.log(hero.getSecretIdentity());
```

考察对```this```的理解。记住JavaScript中的```this```永远指向当前调用的对象。

第一行输出```undefined```；第二行输出```'John Doe'```。

因为第一行的当前对象是```global```对象，第二行的当前对象是```hero```。

解决方法可以使用```bind()```或者```apply()```和```call()```来绑定```this```。

```javascript
// ...
var stoleSecretIdentity = hero.getSecretIdentity.bind(hero);

console.log(stoleSecretIdentity());
// ...
```

### 25.创建一个函数，对于给定的页面中的DOM节点，访问节点本身及其子孙节点。对于每个访问的节点，函数都应该将其作为参数传递给一个回调函数。函数的参数如下：1. 一个DOM节点；2. 一个回调函数。

考察深度优先搜索算法，将其应用到了一个实用的场景。

```javascript
function tranverse(ele, func) {
  func(ele);
  ele.children.forEach(child => tranverse(child));
}
```

### 26.试使用闭包创建一个单例

先声明一个变量，如果该变量没有被初始化（undefined），则新建一个对象，否则直接返回。闭包这里的作用就是限制该变量的访问，以免该变量被修改。

```javascript
const getInstance = (() => {
  function Instance() { this.prop = 'instance'; }
  let instance;
  return () => {
    if(instance === undefined) {
      instance = new Instance();
    }
    return instance;
  }
})();
const foo = getInstance();
const bar = getInstance();
console.log(foo === bar); // true
```

### 27.关于jQuery的用法，以下写法有什么区别

```javascript
$('#box');
new $('#box');
```

在jQuery的入口函数中，会显示地返回一个通过new关键字创建的新的$.fn.init对象，而上面的第二种写法虽然一般情况下会创建新的对象（即利用this创建新的对象），但是如果遇到显示的return，则会返回return后面的值。

### 28.实现以下形式的函数嵌套调用转换

```javascript
a(b(c(d(args))));
// -->
compose(a, b, c, d)(args);
```

这道题目是我看redux源码的时候，想起函数柯里化（compose和函数柯里化没有关系）也对函数的调用进行了变形转换，觉得这个也可以作为一道面试题，如果面试者有用过redux，应该会熟悉compose函数，compose的功能如上，但是它的实现却非常简洁优雅。

```javascript
const compose = function() {
  const funcs = Array.from(arguments);
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
};
```

该函数利用了数组的reduce方法，实现了函数嵌套调用的功能。