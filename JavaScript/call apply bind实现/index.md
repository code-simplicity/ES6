# call apply bind实现

## call方法

`call()`方法在使用一个指定的`this`的值和若干指定的参数值的前提下调用某个函数或者方法。

举个例子

```js
const obj = {
    value: "bugdr"
}

function fn() {
    console.log(this.value)
}

fn.call(obj) // bugdr
```

通过`call`方法我们做到了以下两点：

- 改变了`this`的指向，指向到了`obj`
- `fn`函数执行了

### 手写实现call()方法

那么如果我们自己实现`call()`方法，我们应该怎么做呢，首先改造`obj`。

```js
const obj = {
    value: "bugdr",
    fn: function () {
        console.log(this.value)
    }
}
obj.fn() // bugdr
```

上面的代码这个时候`this`就指向了`obj`，但是我们这样手动给`obj`加上一个`fn`属性，这样肯定是不可以的，不过我们可以在执行完再使用对象属性的删除方法删除就行了。

```js
const obj = {
    value: "bugdr",
    fn: function () {
        console.log(this.value)
    }
}

function fn() {
    console.log(this.value)
}

obj.fn() // bugdr

obj.fn = fn;
obj.fn();
delete obj.fn;
```

根据上面的思路，我们就可以写出了。

```js
Function.prototype.myCall = function (context) {
    if (typeof this !== "function") {
        throw new Error("Type error")
    }
    let args = [...arguments].slice(1)
    let result = null
    context = context || window
    context.fn = this
    result = context.fn(...args)
    console.log(context)
    delete context.fn
    return result
}

function fn() {
    console.log(this.value)
}

const obj = {
    value: "bugdr"
}

fn.myCall(obj) // bugdr
```

## apply

我们会了`call`的实现之后`apply`就变得很简单了，他们没有任何区别，除了传参方式。

```js
Function.prototype.myApply = function (context) {
    if (typeof this !== "function") {
        throw new Error("type error")
    }
    let result = null
    context = context || window
    const fnSymbol = Symbol()
    context[fnSymbol] = this
    if (arguments[1]) {
        result = context[fnSymbol](...arguments[1])
    } else {
        result = context[fnSymbol]()
    }
    delete context[fnSymbol]
    return result

```

## bind

`bind()`方法创建了一个函数，在`bind()`被调用的时候，这个新函数的`this`被指定为`bind()`的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

`bind`方法与`call / apply` 最大的不同就是前者返回一个**绑定上下文**的函数，而后两者是**直接执行了函数**。

下面举个例子来说明：

```js
let value = 2

let foo = {
    value: 1
}

function bar(name, age) {
    return {
        value: this.value,
        name: name,
        age: age
    }
}

console.log(bar.call(foo, "bugdr", 23)) // { value: 1, name: 'bugdr', age: 23 }
console.log(bar.apply(foo, ["bugdr", 24])) // { value: 1, name: 'bugdr', age: 24 }
let bindFar = bar.bind(foo, "bugdr", 25)
console.log(bindFar()) // { value: 1, name: 'bugdr', age: 25 }

let bindFar1 = bar.bind(foo, "bugdr")
console.log(bindFar1(26)) // { value: 1, name: 'bugdr', age: 26 }
```

通过上面代码可以看出`bind`有如下特性：

- 指定`this`
- 传入参数
- 返回一个函数
- 柯里化

### 模拟实现

```js
Function.prototype.myBind = function (context) {
    // 调用bind的不是函数，需要抛出异常
    if (typeof this !== "function") {
        throw new Error("type error")
    }
    // this指向调用者
    let self = this
    // 因为第一个参数指向的是this，所以只能取第一个参数之后的参数
    let args = Array.prototype.slice.call(arguments, 1)
    // 返回一个函数
    return function () {
        // 这个时候的arguments是指向bind返回的函数传入的参数
        let bindArgs = Array.prototype.slice.call(arguments)
        return self.apply(context, args.concat(bindArgs))
    }
}
```

还有就是`bind`有一个特性：

一个绑定函数也能使用`new`操作符创建对象，这种行为把原函数当做构造器，提供的`this`值被忽略，同时调用时的参数被提供给模拟使用。

```js
function bar(name, age) {
    this.habit = "shopping"
    console.log(this.value)
    console.log(name)
    console.log(age)
}

bar.prototype.friend = "bugdr"

let bindBar = bar.bind(foo, "bugdr1")

let obj = new bindBar(200)
/* 
undefined
bugdr1
200
*/

console.log(obj.habit) // shopping

console.log(obj.friend) // bugdr
```

上面代码中，运行结果`this.value`的值为`undefined`，这个不是全局的`value`也不是`foo`对象中`value`，说明`bind`的`this`失效了，`new`的实现中生成了一个新对象，这个时候`this`指向的是`obj`。

这个可以通过返回函数的原型来实现，代码如下：

```js
Function.prototype.myBind = function (context) {
    // 调用bind的不是函数，需要抛出异常
    if (typeof this !== "function") {
        throw new Error("type error")
    }
    // this指向调用者
    let self = this
    // 因为第一个参数指向的是this，所以只能取第一个参数之后的参数
    let args = Array.prototype.slice.call(arguments, 1)
    // 创建一个空对象
    const fNOP = function () {}
    const fBound = function () {
        let bindArgs = Array.prototype.slice.call(arguments)
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs))
        // 注释1
    }
    // 注释2
    fNOP.prototype = this.prototype
    fBound.prototype = new fNOP()
    return fBound
}
```

#### 注释1

- 当作为构造函数时，`this`指向实例，此时`this instanceof fBound`结果为`true`，可以让实例获得来自绑定函数的值，即上例中实例会具有 `habit`属性。
- 当作为普通函数时，`this`指向`window` ，此时结果为`false`，将绑定函数的`this`指向`context`

#### 注释2

- 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值，即上例中 obj 可以获取到 bar 原型上的 friend。
- 至于为什么使用一个空对象 fNOP 作为中介，把 fBound.prototype 赋值为空对象的实例（原型式继承），这是因为直接 fBound.prototype = this.prototype 有一个缺点，修改 fBound.prototype 的时候，也会直接修改 this.prototype ；其实也可以直接使用ES5的 Object.create() 方法生成一个新对象，但 bind 和 Object.create() 都是ES5方法，部分IE浏览器（IE < 9）并不支
注意： bind（） 函数在 ES5 才被加入，所以并不是所有浏览器都支持，IE8 及以下的版本中不被支持，如果需要兼容可以使用 Polyfill 来实现。

## 柯里化

在计算机科学中，`柯里化`（Currying）是把接受多个参数的函数变为一个接受单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数且返回结果的新函数的技术。这个技术由 `Christopher Strachey` 以逻辑学家 `Haskell Curry` 命名的，尽管它是 `Moses Schnfinkel` 和 `Gottlob Frege` 发明的。

