# 拷贝

拷贝的意思其实就是复制的意思，一般分为`浅拷贝`和`深拷贝`，下面就简单的介绍一下什么是`浅拷贝`，什么是`深拷贝`。

## 浅拷贝和深拷贝

- `浅拷贝`是创建一个新的对象，这个对象有着原始对象的属性值的一份精确拷贝，如果属性是基本数据类型，拷贝的就是基本数据类型的值，如果数据是引用类型，拷贝的就是内存的地址，所以如果其中一个对象改变了这个地址，就会影响到另外一个对象。
- `深拷贝`是将一个对象从内存中完整的拷贝一份出来，从堆内存中开辟一个新的区域存放拷贝的对象，且修改新对象不会影响原来的对象。

了解了相关的概念，`浅拷贝`只是复制指向某个对象的指针，而不是复制对象本身，**新旧对象还是共享一块内存**，但是`深拷贝`则会另外创造一个一模一样的对象，**新对象和原对象不共享内存**，修改新对象也不会改变原对象。

## 赋值和深/浅拷贝的区别

这三者的区别如下，不过比较的前提都是**针对引用类型**。

- 赋值：当把一个对象赋值给一个新变量的时候，**赋值的其实是该对象在栈中的地址，而不是堆中的数据**，也就是这两个对象指向的是同一个存储空间，无论哪一个对象发生改变，其实都是改变存储空间的内容，因此，两个对象是联动的。
- 浅拷贝：浅拷贝是在堆中重新创建内存，拷贝前后基本数据类型不相互影响，但拷贝前后的引用数据类型就会共享一块内存，相互影响。
- 深拷贝：深拷贝就是从堆内存中开辟一个新的区域存放对象，对对象的子对象进行递归拷贝，拷贝前后的两个对象不相互影响。

### 赋值

下面我们看一下赋值的代码：

```js
let obj1 = {
    name: "bugdr",
    arr: [1, [2, 3]]
}

let obj2 = obj1
obj2.name = "bugdr1"
obj2.arr[1] = [4, 5, 6]
console.log("obj1", obj1) // obj1 { name: 'bugdr1', arr: [ 1, [ 4, 5, 6 ] ] }
console.log("obj2", obj2) // obj2 { name: 'bugdr1', arr: [ 1, [ 4, 5, 6 ] ] }
```

下面看一下`浅拷贝`的代码：

```js
// 浅拷贝
let obj1 = {
    name: "bugdr",
    arr: [1, [2, 3]]
}

let obj2 = shallowClone(obj1)
obj2.name = "bugdr1"
obj2.arr[1] = [4, 5, 6]

function shallowClone(source) {
    let target = {};
    for (let i in source) {
        if (source.hasOwnProperty(i)) {
            target[i] = source[i];
        }
    }
    return target;
}
console.log("obj1", obj1) // obj1 { name: 'bugdr', arr: [ 1, [ 4, 5, 6 ] ] }
console.log("obj2", obj2) // obj2 { name: 'bugdr1', arr: [ 1, [ 4, 5, 6 ] ] }
```

下面来看`深拷贝`的情况：

```js
let obj1 = {
    name: "bugdr",
    arr: [1, [2, 3]]
}

let obj2 = deepClone(obj1)
obj2.name = "bugdr1"
obj2.arr[1] = [4, 5, 6] // 新对象不共享内存

function deepClone(obj) {
    if (obj === null) return obj
    if (obj instanceof Date) return new Date(obj)
    if (obj instanceof RegExp) return new RegExp(obj)
    if (typeof obj !== "object") return obj
    let cloneObj = new obj.constructor()
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            // 实现一个递归拷贝
            cloneObj[key] = deepClone(obj[key])
        }
    }
    return cloneObj
}

console.log("obj1", obj1) // obj1 { name: 'bugdr', arr: [ 1, [ 2, 3 ] ] }
console.log("obj2", obj2) // obj2 { name: 'bugdr1', arr: [ 1, [ 4, 5, 6 ] ] }
```

上面例子中，`obj1`是原始对象，然后进行`赋值`，`浅拷贝`以及`深拷贝`，然后得出了一下结论：

| 方式   | 和原数据是否指向同一对象 | 第一层数据未基本数据类型   | 原数据中包含了对象         |
| ------ | ------------------------ | -------------------------- | -------------------------- |
| 赋值   | 是                       | 改变会使原始数据同一改变   | 改变会使原始数据同一改变   |
| 浅拷贝 | 否                       | 改变不会使原始数据同一改变 | 改变会使原始数据同一改变   |
| 深拷贝 | 否                       | 改变不会使原始数据同一改变 | 改变不会使原始数据同一改变 |

## 浅拷贝的实现方式

### Object.assign()

`Object.assign()`方法可以把任意多个的源对象自身的可枚举属性拷贝给目标对象，然后返回给目标对象。

```js
let obj1 = {
    person: {
        name: "bugdr",
        age: 18
    },
    name: "block"
}

let obj2 = Object.assign({}, obj1)
obj2.name = "block1"
obj2.person.name = "bugdr1"
console.log(obj1) // { person: { name: 'bugdr1', age: 18 }, name: 'block' }
console.log(obj2) // { person: { name: 'bugdr1', age: 18 }, name: 'block1' }
```

### 利用函数lodash的.clone方法

该函数库也提供_.clone用来做Shallow Copy，后面会再介绍利用这个库来实现`深拷贝`。

```js
const _ = require("lodash")

const obj1 = {
    person: {
        name: "bugdr",
        age: 18
    },
    name: "block"
}

const obj2 = _.clone(obj1)
console.log(obj1.person.age === obj2.person.age) // true
```

### 拓展运算符

`拓展运算符`是`ES6`的新特性，它提供了一种非常方便的方式来提供浅拷贝。这与`Object.assign()`的功能相同。

```js
let obj1 = {
    name: "bugdr",
    address: {
        x: 100,
        y: 100
    }
}

let obj2 = {
    ...obj1
}

obj2.address.x = 200
obj1.name = "bugdr1"
console.log("obj1", obj1) // obj1 { name: 'bugdr1', address: { x: 200, y: 100 } }
console.log("obj2", obj2) // obj2 { name: 'bugdr', address: { x: 200, y: 100 } }
```

### Array.prototype.concat()

```js
let arr1 = [1, 3, {
    name: "bugdr"
}]
let arr2 = arr1.concat()
arr2[2].name = "bugdr1"
console.log(arr1) // [ 1, 3, { name: 'bugdr1' } ]
console.log(arr2) // [ 1, 3, { name: 'bugdr1' } ]
```

### Array.prototype.slice()

```js
let arr1 = [1, 3, {
    name: "bugdr"
}]
let arr2 = arr1.slice()
arr2[2].name = "bugdr1"
console.log(arr1) // [ 1, 3, { name: 'bugdr1' } ]
console.log(arr2) // [ 1, 3, { name: 'bugdr1' } ]
```

## 深拷贝的实现方式

### JSON.parse(JSON.stringify())

```js
let arr1 = [1, 3, {
    name: "bugdr"
}]

let arr2 = JSON.parse(JSON.stringify(arr1))
arr2[2].name = "bugdr1"
console.log(arr1) // [ 1, 3, { name: 'bugdr' } ]
console.log(arr2) // [ 1, 3, { name: 'bugdr1' } ]
```

这也是利用`JSON.stringify`将对象转成`JSON`字符串，再用`JSON.parse`把字符串解析成对象，一去一来，新的对象产生了，而且对象会开辟新的栈，实现深拷贝。

这种方式虽然可以实现数组和对象的深拷贝，但不能处理函数的正则，因为这个两者是基于`JSON.stringify`和`JSON.parse`处理后，得到的正则不再是正则（变为空对象），得到的函数不再是函数了（变为null）。比如下面的例子：

```js
let arr1 = [1, 3, {
    name: 'bugdr'
}, function () {}]

let arr2 = JSON.parse(JSON.stringify(arr1))
arr2[2].name = "bugdr1"
console.log(arr1) // [ 1, 3, { name: 'bugdr' }, [Function (anonymous)] ]
console.log(arr2) // [ 1, 3, { name: 'bugdr1' }, null ]
```

### 函数库lodash的_.cloneDeep方法

```js
let _ = require('lodash');
let obj1 = {
    a: 1,
    b: {
        f: {
            g: 1
        }
    },
    c: [1, 2, 3]
};
let obj2 = _.cloneDeep(obj1);
console.log(obj1.b.f === obj2.b.f); // false
```

### jQuery.extend()方法

`jquery`提供了一个`$.extend`可以作为深拷贝。

```js
$.extend(deepCopy, target, object1, [objectN]) //第一个参数为true,就是深拷贝
```

```js
const $ = require("jquery")
let obj1 = {
    person: {
        name: "bugdr",
        age: 18
    },
    name: "block"
}

let obj2 = $.extend(true, {}, obj1)
console.log(obj1.person.name === obj2.person.name) // false
```

### 手写递归实现深拷贝方法

```js
// 深度拷贝
function deepClone(obj, hash = new WeakMap()) {
    if (obj === null) return obj
    if (obj instanceof Date) return new Date(obj)
    if (obj instanceof RegExp) return new RegExp(obj);
    // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
    if (typeof obj !== "object") return obj;
    // 是对象的话就要进行深拷贝
    if (hash.get(obj)) return hash.get(obj)
    let cloneObj = new obj.constructor()
    // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
    hash.set(obj, cloneObj)
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            // 实现递归拷贝
            cloneObj[key] = deepClone(obj[key], hash)
        }
    }
    return cloneObj
}

let obj1 = {
    person: {
        name: "bugdr",
        age: 18
    },
    name: "block"
}

obj1.o = obj1
let o = deepClone(obj1)
obj1.name = "bugdr1"
console.log(o)
/* <ref *1> {
    person: { name: 'bugdr', age: 18 },
    name: 'block',
    o: [Circular *1]
} */
```