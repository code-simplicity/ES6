# let和const命令

## let命令

### 基本用法

ES6新添加了`let`命令，用于声明变量，类似于`var`，但是所声明的变量只在`let`命令所在的代码块中有用，所有说`let`有块级作用域。

```javascript
 {
    let a = 10;
    var b = 1;
}
console.log(`b`, b) // b 1
console.log(`a`, a) // Uncaught ReferenceError: a is not defined
```

在上面的代码块中，分别用`let`和`var`声明了两个变量，然后从外部调用这个代码块，我们在控制台查看到出现所注释的内容，结果`let`声明的变量报错，`var`声明的变量返回1，这表明`let`只在代码块中使用是有效的，存在块级作用域。

`for`循环的计数器，就很合适使用`let`命令。

```javascript
for (let i = 0; i < 10; i++) {
            // ...
}
console.log(`i`, i) //ReferenceError: i is not defined 
```

上面代码中，计数器声明的变量`i`只能是在`for`循环中使用有效，在外部引用就会报错。

```javascript
for(var i = 0; i < 10; i++) {
    // ...
}
console.log(`i`, i) //i 10
```

上面代码块中使用`var`声明的变量则会打印输出10，。

```javascript
var a = [];
for (var i = 0; i < 10; i++) {
    a[i] = function () {
        console.log(i);
    }
}
a[5]() // 10
```

在上面代码中如果使用`var`声明变量，那么就会最后输出`10`,因为在`for`循环中声明变量`i`，在全局范围内有效，所以全局只有一个变量`i`，该值会发生改变，而循环内被赋给数组`a`的函数内部的`console.log(i)`，**里面的`i`指向的就是全局的`i`**。也就是说，所有数组`a`的成员里面的`i`，指向的都是同一个`i`，导致运行时输出的是最后一轮的`i`的值，也就是 10。

如果使用`let`声明变量，仅是在块级作用域有效，最后`a[5]`的值是`5`。就不会存在使用`var`出现的问题。

```javascript
var a = [];
for (let i = 0; i < 10; i++) {
    a[i] = function () {
        console.log(i);
    }
}
a[5]() // 5
```

上面代码中，`i`是`let`声明的，**当且仅当`i`只在本轮循环有效，所以每一次循环`i`都是一个新的变量**，所以最后输出的值是`5`，`JavaScript`会记录住上一次循环的值，初始化`i`的时候会在原来的基础上进行运算。另外`for`循环还有一个特别之处就是设置环境变量的部分是父级作用域，二循环体内部是一个单独的子作用域。

```javascript
for(let i = 0; i < 3; i++) {
    let i = "abc"
    console.log(`i`, i)
}
//abc
//abc
//abc
```

上面的代码块输出的是3个`abc`,原因是循环体中的`i`与循环体内部的`i`不是一个作用域，有各自的作用域。

### 不存在变量提升

`var`命令会发生“变量提升”现象，即变量可以在声明之前使用，值为`undefined`，这种现象多多少少是有些奇怪的，按照一般的逻辑，变量应该在声明语句之后才可以被使用，为了纠正这种现象，`let`命令改变了语法行为，它所声明的变量一定要在声明后使用，否则报错。

```javascript
// var的情况
console.log(foo) //undefined
var foo = 2

// let的情况
console.log(foo) // ReferenceError: Cannot access 'foo' before initialization
let bar = 2
```

上面代码中，使用`var`声明变量`foo`，会发生变量提升，即脚本开始运行的时候，变量`foo`已经存在了，但是没有值，所有会出现`undefined`，变量`bar`使用`let`声明之后不会发生变量提升，这表示在他声明之前，变量`bar`是不存在的，这个时候使用他就抛出异常`ReferenceError`。

### 暂时性死区

**只要块级作用域内存在`let`命令，它所声明的变量就是绑定这个区域的，不会受外界影响。**

```javascript
var temp = 123
if (true) {
    temp = "123" // Uncaught ReferenceError: Cannot access 'temp' before initialization
    let temp
}
```

上诉代码存在全局变量`temp`，但是块级作用域内`let`又声明了一个`temp`变量，所以导致后者绑定了这个作用域，所以在`let`声明变量之前，对`temp`赋值会报错。

ES6明确规定在块级作用域内存在`let`和`const`命令，这些区块对这些命令声明的变量，从一开始就形成了一个封闭的作用域，凡是在声明之前使用这些变量，那么就会报错，总之，在代码块中，**使用`let`命令声明变量之前，这些变量是不可以使用的，这个语法称之为暂时性死区**,(temporal dead zone，简称 TDZ)

```javascript
 if (true) {
    temp = "abc" // ReferenceError
    console.log(temp) // ReferenceError

    let temp //TDZ结束
    console.log(temp) // undefined

    temp = 123
    console.log(temp) // 123
}
```

上面代码中，在`let`声明变量`temp`之前，都属于`temp`暂时性死区。

“暂时性死区”也意味着`typeof`不再是一个百分百安全的操作。

```javascript
typeof x // Uncaught ReferenceError: Cannot access 'x' before initialization
let x
```

上面代码中，在未使用`let`声明变量之前使用变量都会出现暂时性死区，`typeof`类型判断就会出现这种问题。

作为比较，如果变量没有被声明过，那么就不会报错

```javascript
typeof undeclared_variable // "undefined"
```

上面代码中，`undeclared_variable`是一个不存在的变量名，结果返回“undefined”。所以，在没有`let`之前，`typeof`运算符是百分之百安全的，永远不会报错。现在这一点不成立了。这样的设计是为了让大家养成良好的编程习惯，变量一定要在声明之后使用，否则就报错。

有些“死区”比较隐蔽，不太容易发现。

```javascript
function bar(x = y, y = 2) {
  return [x, y];
}

bar(); // 报错
```

上面代码中，调用`bar`函数之所以报错（某些实现可能不报错），是因为参数`x`默认值等于另一个参数`y`，而此时`y`还没有声明，属于“死区”。如果`y`的默认值是`x`，就不会报错，因为此时`x`已经声明了。

```javascript
function bar(x = 2, y = x) {
  return [x, y];
}
bar(); // [2, 2]
```

另外，下面的代码也会报错，与`var`的行为不同。

```javascript
// 不报错
var x = x;

// 报错
let x = x;
// ReferenceError: x is not defined
```

上面代码报错，也是因为暂时性死区。使用`let`声明变量时，只要变量在还没有声明完成前使用，就会报错。上面这行就属于这个情况，在变量`x`的声明语句还没有执行完成前，就去取`x`的值，导致报错”x 未定义“。

ES6 规定暂时性死区和`let`、`const`语句不出现变量提升，主要是为了减少运行时错误，防止在变量声明前就使用这个变量，从而导致意料之外的行为。这样的错误在 ES5 是很常见的，现在有了这种规定，避免此类错误就很容易了。

总之，暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。

### 不允许重复声明

**`let`不允许在相同作用域内重复声明一个变量。**

```javascript
let a = "1"
let a = "2"
// Uncaught SyntaxError: Identifier 'a' has already been declared

// 报错
function fun () {
    let a = "1"
    var a = "2"
}

// 报错
function fun () {
    let a = "1"
    let a = "2"
}
```

因此不能在内部重复声明变量或者参数

```javascript
function fun(arg) {
    let arg
}
fun() // 报错

function fun(arg) {
    {
        let arg
    }
}
fun() // 不报错
```

## 块级作用域

### 为什么需要块级作用域

ES5只有全局作用域和函数作用域，没有块级作用域，这带来很不合理的场景。

第一种就是可能内部变量会替换掉外部变量。

```javascript
var temp = new Date()
function fun() {
    console.log(temp)
    if (false) {
        var temp = "hello world"
    }
}
fun() // undefined
```

上面代码中，`if`代码块的外层使用`temp`变量，内部使用内置的`temp`变量，都是函数`fun`执行后，输出结果为`undefined`，原因在于变量提升以后，导致内层的`temp` 覆盖掉了外层的`temp`变量。

第二种场景是用来计数的循环变量泄露成为全局变量

```javascript
var s = "hello"
for (var i =0; i < s.length; i++) {
    console.log(s[i])
}
console.log(i)
```

上面代码中，变量`i`只用来控制循环，但是循环结束后，它并没有消失，泄露成了全局变量。

### ES6 的块级作用域

`let`实际上为 JavaScript 新增了块级作用域。

```javascript
function f1() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n); // 5
}
```

上面的函数有两个代码块，都声明了变量`n`，运行后输出 5。这表示外层代码块不受内层代码块的影响。如果两次都使用`var`定义变量`n`，最后输出的值才是 10。

ES6 允许块级作用域的任意嵌套。

```javascript
{{{{
  {let insane = 'Hello World'}
  console.log(insane); // 报错
}}}};
```

上面代码使用了一个五层的块级作用域，每一层都是一个单独的作用域。第四层作用域无法读取第五层作用域的内部变量。

内层作用域可以定义外层作用域的同名变量。

```javascript
{{{{
  let insane = 'Hello World';
  {let insane = 'Hello World'}
}}}};
```

块级作用域的出现，实际上使得获得广泛应用的匿名立即执行函数表达式（匿名 IIFE）不再必要了。

```javascript
// IIFE 写法
(function () {
  var tmp = ...;
  ...
}());

// 块级作用域写法
{
  let tmp = ...;
  ...
}
```

### 块级作用域与函数声明

函数能不能在块级作用域中声明，这是一个相当令人混淆的问题。

ES5规定，函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明。

```javascript
// 情况1
if (true) {
    function f1() {

    }
}

// 情况2

try {
    function f2() {

    }
} cathc(e) {

}
```

上诉两种情况在ES5中都是非法的。

但是，浏览器没有遵守这个规定，为了兼容以前的旧代码，还是支持在块级作用域之中声明函数，因此上面两种情况实际都能运行，不会报错。

ES6 引入了块级作用域，明确允许在块级作用域之中声明函数。ES6 规定，块级作用域之中，函数声明语句的行为类似于`let`，在块级作用域之外不可引用。

```javascript
function f() { console.log('I am outside!'); }

(function () {
  if (false) {
    // 重复声明一次函数f
    function f() { console.log('I am inside!'); }
  }

  f();
}());
```

上面代码在 ES5 中运行，会得到“I am inside!”，因为在`if`内声明的函数`f`会被提升到函数头部，实际运行的代码如下。

```javascript
// ES5 环境
function f() { console.log('I am outside!'); }

(function () {
  function f() { console.log('I am inside!'); }
  if (false) {
  }
  f();
}());
```

ES6 就完全不一样了，理论上会得到“I am outside!”。因为块级作用域内声明的函数类似于`let`，对作用域之外没有影响。但是，如果你真的在 ES6 浏览器中运行一下上面的代码，是会报错的，这是为什么呢？

```javascript
// 浏览器的 ES6 环境
function f() { console.log('I am outside!'); }

(function () {
  if (false) {
    // 重复声明一次函数f
    function f() { console.log('I am inside!'); }
  }

  f();
}());
// Uncaught TypeError: f is not a function
```

上面的代码在 ES6 浏览器中，都会报错。

原来，如果改变了块级作用域内声明的函数的处理规则，显然会对老代码产生很大影响。为了减轻因此产生的不兼容问题，ES6 在[附录 B](http://www.ecma-international.org/ecma-262/6.0/index.html#sec-block-level-function-declarations-web-legacy-compatibility-semantics)里面规定，浏览器的实现可以不遵守上面的规定，有自己的[行为方式](http://stackoverflow.com/questions/31419897/what-are-the-precise-semantics-of-block-level-functions-in-es6)。

- 允许在块级作用域内声明函数。
- 函数声明类似于`var`，即会提升到全局作用域或函数作用域的头部。
- 同时，函数声明还会提升到所在的块级作用域的头部。

考虑到环境导致的行为差异太大，应该避免在块级作用域内声明函数。如果确实需要，也应该写成函数表达式，而不是函数声明语句。

```javascript
// 块级作用域内部的函数声明语句，建议不要使用
{
  let a = 'secret';
  function f() {
    return a;
  }
}

// 块级作用域内部，优先使用函数表达式
{
  let a = 'secret';
  let f = function () {
    return a;
  };
}
```

另外，还有一个需要注意的地方。ES6 的块级作用域必须有大括号，如果没有大括号，JavaScript 引擎就认为不存在块级作用域。

```javascript
// 第一种写法，报错
if (true) let x = 1;

// 第二种写法，不报错
if (true) {
  let x = 1;
}
```

上面代码中，第一种写法没有大括号，所以不存在块级作用域，而`let`只能出现在当前作用域的顶层，所以报错。第二种写法有大括号，所以块级作用域成立。

函数声明也是如此，严格模式下，函数只能声明在当前作用域的顶层。

```javascript
// 不报错
'use strict';
if (true) {
  function f() {}
}

// 报错
'use strict';
if (true)
  function f() {}
```

## const命令

### 基本用法

`const`声明一个**只读的常量**。一旦声明，**常量的值就不能改变**。

```javascript
const PI = 3.1415;
PI // 3.1415

PI = 3;
// TypeError: Assignment to constant variable.
```

上面代码表明改变常量的值会报错。

`const`声明的变量不得改变值，这意味着，`const`一旦声明变量，就必须立即初始化，不能留到以后赋值。

```javascript
const foo;
// SyntaxError: Missing initializer in const declaration
```

上面代码表示，对于`const`来说，只声明不赋值，就会报错。

`const`的作用域与`let`命令相同：只在声明所在的块级作用域内有效。

```javascript
if (true) {
  const MAX = 5;
}

MAX // Uncaught ReferenceError: MAX is not defined
```

`const`命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。

```javascript
if (true) {
  console.log(MAX); // ReferenceError
  const MAX = 5;
}
```

上面代码在常量`MAX`声明之前就调用，结果报错。

`const`声明的常量，也与`let`一样不可重复声明。

```javascript
var message = "Hello!";
let age = 25;

// 以下两行都会报错
const message = "Goodbye!";
const age = 30;
```

### 本质

`const`实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，`const`只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了。因此，将一个对象声明为常量必须非常小心。

```javascript
const foo = {};

// 为 foo 添加一个属性，可以成功
foo.prop = 123;
foo.prop // 123

// 将 foo 指向另一个对象，就会报错
foo = {}; // TypeError: "foo" is read-only
```

上面代码中，常量`foo`储存的是一个地址，这个地址指向一个对象。不可变的只是这个地址，即不能把`foo`指向另一个地址，但对象本身是可变的，所以依然可以为其添加新属性。

下面是另一个例子。

```javascript
const a = [];
a.push('Hello'); // 可执行
a.length = 0;    // 可执行
a = ['Dave'];    // 报错
```

上面代码中，常量`a`是一个数组，这个数组本身是可写的，但是如果将另一个数组赋值给`a`，就会报错。

如果真的想将对象冻结，应该使用`Object.freeze`方法。

```javascript
const foo = Object.freeze({});

// 常规模式时，下面一行不起作用；
// 严格模式时，该行会报错
foo.prop = 123;
```

上面代码中，常量`foo`指向一个冻结的对象，所以添加新属性不起作用，严格模式时还会报错。

除了将对象本身冻结，对象的属性也应该冻结。下面是一个将对象彻底冻结的函数。

```javascript
var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, i) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};
```

### ES6 声明变量的六种方法

ES5 只有两种声明变量的方法：`var`命令和`function`命令。ES6 除了添加`let`和`const`命令，后面章节还会提到，另外两种声明变量的方法：`import`命令和`class`命令。所以，ES6 一共有 6 种声明变量的方法。

## 顶层对象的属性

顶层对象，在浏览器环境指的是`window`对象，在 Node 指的是`global`对象。ES5 之中，顶层对象的属性与全局变量是等价的。

```javascript
window.a = 1;
a // 1

a = 2;
window.a // 2
```

上面代码中，顶层对象的属性赋值与全局变量的赋值，是同一件事。

顶层对象的属性与全局变量挂钩，被认为是 JavaScript 语言最大的设计败笔之一。这样的设计带来了几个很大的问题，首先是没法在编译时就报出变量未声明的错误，只有运行时才能知道（因为全局变量可能是顶层对象的属性创造的，而属性的创造是动态的）；其次，程序员很容易不知不觉地就创建了全局变量（比如打字出错）；最后，顶层对象的属性是到处可以读写的，这非常不利于模块化编程。另一方面，`window`对象有实体含义，指的是浏览器的窗口对象，顶层对象是一个有实体含义的对象，也是不合适的。

ES6 为了改变这一点，一方面规定，为了保持兼容性，`var`命令和`function`命令声明的全局变量，依旧是顶层对象的属性；另一方面规定，`let`命令、`const`命令、`class`命令声明的全局变量，不属于顶层对象的属性。也就是说，**从 ES6 开始，全局变量将逐步与顶层对象的属性脱钩。**

```javascript
var a = 1;
// 如果在 Node 的 REPL 环境，可以写成 global.a
// 或者采用通用方法，写成 this.a
window.a // 1

let b = 1;
window.b // undefined
```

上面代码中，全局变量`a`由`var`命令声明，所以它是顶层对象的属性；全局变量`b`由`let`命令声明，所以它不是顶层对象的属性，返回`undefined`。

## globalThis 对象

JavaScript 语言存在一个顶层对象，它提供全局环境（即全局作用域），所有代码都是在这个环境中运行。但是，顶层对象在各种实现里面是不统一的。

- 浏览器里面，顶层对象是`window`，但 Node 和 Web Worker 没有`window`。
- 浏览器和 Web Worker 里面，`self`也指向顶层对象，但是 Node 没有`self`。
- Node 里面，顶层对象是`global`，但其他环境都不支持。

同一段代码为了能够在各种环境，都能取到顶层对象，现在一般是使用`this`变量，但是有局限性。

- 全局环境中，`this`会返回顶层对象。但是，Node 模块和 ES6 模块中，`this`返回的是当前模块。
- 函数里面的`this`，如果函数不是作为对象的方法运行，而是单纯作为函数运行，`this`会指向顶层对象。但是，严格模式下，这时`this`会返回`undefined`。
- 不管是严格模式，还是普通模式，`new Function('return this')()`，总是会返回全局对象。但是，如果浏览器用了 CSP（Content Security Policy，内容安全策略），那么`eval`、`new Function`这些方法都可能无法使用。

综上所述，很难找到一种方法，可以在所有情况下，都取到顶层对象。下面是两种勉强可以使用的方法。

```javascript
// 方法一
(typeof window !== 'undefined'
   ? window
   : (typeof process === 'object' &&
      typeof require === 'function' &&
      typeof global === 'object')
     ? global
     : this);

// 方法二
var getGlobal = function () {
  if (typeof self !== 'undefined') { return self; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('unable to locate global object');
};
```

[ES2020](https://github.com/tc39/proposal-global) 在语言标准的层面，引入`globalThis`作为顶层对象。也就是说，任何环境下，`globalThis`都是存在的，都可以从它拿到顶层对象，指向全局环境下的`this`。

垫片库[`global-this`](https://github.com/ungap/global-this)模拟了这个提案，可以在所有环境拿到`globalThis`。