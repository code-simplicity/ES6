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

