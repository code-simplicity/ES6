# 扁平化

数组扁平化是将数组拉平，数组降维。

## Array.prototype.flat()特性

数组拍平方法 `Array.prototype.flat()`也叫数组扁平化、数组拉平、数组降维。

```js
let arr = [1, [2, [3, 4, [5, 6]]]]

// 不传参数，默认拉平第一层
console.log(arr.flat()) // [ 1, 2, [ 3, 4, [ 5, 6 ] ] ]

// 传入一个整数参数，就是拉平的层数
console.log(arr.flat(2)) // [ 1, 2, 3, 4, [ 5, 6 ] ]

// Infinity关键字作为参数，无论嵌套多少层，都会转为一维数组，Infinity 为无穷的意思
console.log(arr.flat(Infinity))

// 传入 <=0 的整数将返回原数组，不拉平
console.log(arr.flat(0)) // [ 1, [ 2, [ 3, 4, [Array] ] ] ]
console.log(arr.flat(-10)) // [ 1, [ 2, [ 3, 4, [Array] ] ] ]

// 如果元素组有空，那么flat()方法会跳过空位
console.log([1, 2, [3, 4], , ].flat()) // [ 1, 2, 3, 4 ]
```

### Array.prototype.flat() 特性总结

- `Array.prototype.flat()` 用于将嵌套的数组**拉平**，变成一维的数组，该方法返回一个新数组，对原数组没有影响。
- 不传递参数，默认**拉平**一层，可以传入一个整数，表示要拉平的层数。
- 传入**<=**的整数将返回原数组，不**拉平**。
- **Infinity** 关键字作为参数时，无论多少层嵌套，都会转为一维数组。
- 如果原数组存在空位，**Array.prototype.flat()**会跳过空位。

## 实现一个简单的数组扁平的**flat**函数

### 实现思路

思路非常简单：实现一个有数组拍平功能的 `flat` 函数，**要做的就是在数组中找到是数组类型的元素，然后将他们展开**。这就是实现数组拍平 flat 方法的关键思路。

- 第一个要解决的就是遍历数组的每一个元素
- 第二个要解决的就是判断元素是否是数组
- 第三个要解决的就是将数组的元素展开一层

#### 遍历数组的方案

遍历数组并取得元素的方法非常多，常见的有以下几种：

- `for`循环
- `for of`
- `for in`
- `forEach()`
- `entries()`
- `keys()`
- `values()`
- `reduce()`
- `map()`

```js
let arr = [1, 2, 3, 4, [1, 2, 3, 4, [1, 2, 3, 4]], 5, "string", {
    name: "bugdr"
}]

// for循环
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i])
}

// for of
for (let value of arr) {
    console.log(value)
}

// for in
for (let i in arr) {
    console.log(arr[i])
}

// forEach
arr.forEach(value => {
    console.log(value)
})

// entries()
for (let [index, value] of arr.entries()) {
    console.log(value)
}

// keys()
for (let index of arr.keys()) {
    console.log(arr[index])
}

// values()
for (let value of arr.values()) {
    console.log(value)
}

// reduce()
arr.reduce((pre, cur) => {
    console.log(cur)
}, [])

// map()
arr.map(value => {
    console.log(value)
})
```

上诉这些方法都可以从数组中去到具体的元素。

#### 判断元素是否是数组

- instanceof
- constructor
- Object.prototype.toString()
- isArray

```js
let arr = [1, 2, 3, 4, [1, 2, 3, 4, [1, 2, 3, 4]], 5, "string", {
    name: "bugdr"
}]

console.log(arr instanceof Array) // true
console.log(arr.constructor === Array) // true
console.log(Object.prototype.toString.call(arr) === "[object Array]") // true
console.log(Array.isArray(arr)) // true
```

##### 说明

- `instanceof` 操作符是假定只有一种全局环境，如果网页中包含多个框架，多个全局环境，加入你从一个框架向另外一个框架传入一个数组，那么传入的数组与第二个框架中原生创建的数组分别具有各自不同的构造函数
- `typeof` 操作符对数组取类型将返回 `object`
- `constructor` 可以被重写，所以不一定保证是数组

#### 将数组元素展开一层的方案

- 拓展运算符 + `concat()`

  `concat()` 方法用于合并两个或者多个数组，在拼接的过程中加上拓展运算符会展开一层数组，具体查看下面代码

- `concat` + `apply`
  
  主要利用`apply`在绑定作用域时，传入的第二个参数是一个数组或者类似于数组对象，其中数组元素将作为单独的参数传给 `fn`函数，也就是调用`apply`函数的过程中，会将传入的数组一个一个的传入要执行的函数中，也就相当于对数组的展开。

- `toString()` + `split`
  
  不推荐使用`toString()` + `split`方法，因为操作字符串是危险的事，如果数组中的元素都是数字的话，使用该方法是可行的。

```js
let arr = [1, 2, 3, 4, [1, 2, 3, 4, [1, 2, 3, 4]], 5, "string", {
  name: "bugdr"
}]

// 拓展运算符+concat()
console.log([].concat(...arr))
/**
[
  1,
  2,
  3,
  4,
  1,
  2,
  3,
  4,
  [ 1, 2, 3, 4 ],
  5,
  'string',
  { name: 'bugdr' }
]
 */

console.log([].concat.apply([], arr))

/** 
[
  1,
  2,
  3,
  4,
  1,
  2,
  3,
  4,
  [ 1, 2, 3, 4 ],
  5,
  'string',
  { name: 'bugdr' }
]
*/
const arr1 = [1, 2, 3, 4, [1, 2, 3, 4, [1, 2, 3, 4]], 5]
console.log(arr1.toString().split(',').map(value => parseInt(value)))
/**
[
  1, 2, 3, 4, 1, 2,
  3, 4, 1, 2, 3, 4,
  5
]
 */  
```

之后就可以完成一个简单的数组扁平化`flat`函数的实现了。

```js
const arr = [1, 2, 3, 4, [1, 2, 3, 4, [1, 2, [3, 4]]], 5, "string", {
  name: "bugdr"
}]

// concat + 递归
function flat(arr) {
  let result = []
  arr.forEach(item => {
    if (Array.isArray(item)) {
      result = result.concat(flat(item))
    } else {
      result.push(item)
    }
  })
  return result
}

console.log(flat(arr)) // [ 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 5, 'string', { name: 'bugdr' } ]
```

上面代码就是一个数据扁平化的函数，到此数组扁平化基本就到此为止。

## 用 `reduce` 实现 `flat` 函数

接来下学习怎么使用`reduce`实现`flat`函数。

```js
const arr = [1, 2, 3, 4, [1, 2, 3, 4, [1, 2, [3, 4]]], 5, "string", {
  name: "bugdr"
}]

// 使用reduce展开一层
console.log(arr.reduce((pre, cur) => pre.concat(cur), []))
/**
[
  1,
  2,
  3,
  4,
  1,
  2,
  3,
  4,
  [ 1, 2, [ 3, 4 ] ],
  5,
  'string',
  { name: 'bugdr' }
]
 */

const flat = arr => {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flat(cur) : cur)
  }, [])
}
console.log(flat(arr)) // [ 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 5, 'string', { name: 'bugdr' } ]
```

## 使用栈的思想实现 `flat` 函数

```js
const arr = [1, 2, 3, 4, [1, 2, 3, 4, [1, 2, [3, 4]]], 5, "string", {
  name: "bugdr"
}]

function flat(arr) {
  const result = []
  const stack = [].concat(arr) // 将数组元素拷贝到栈，直接复制会改变原数组
  // 如果栈不为空，则遍历循环
  while (stack.length !== 0) {
    const val = stack.pop()
    if (Array.isArray(val)) {
      stack.push(...val) // 如果是数组再次入栈，并展开一层
    } else {
      result.unshift(val) // 如果不是数组就将其取出来放入结果数组中
    }
  }
  return result
}
console.log(flat(arr)) // [ 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 5, 'string', { name: 'bugdr' } ]
```

## 通过传入整数参数控制扁平参数

```js
// reduce + 递归

const arr = [1, 2, 3, 4, [1, 2, 3, 4, [1, 2, [3, 4]]], 5, "string", {
  name: "bugdr"
}]

function flat(arr, num = 1) {
  return num > 0 ?
    arr.reduce((pre, cur) =>
      pre.concat(Array.isArray(cur) ?
        flat(cur, num - 1) : cur), []) :
    arr.slice()
}

console.log(flat(arr, Infinity))
```

## 使用 `Generator` 实现 `flat` 函数

```js
// Generator
const arr = [1, 2, 3, 4, [1, 2, 3, 4, [1, 2, [3, 4]]], 5, "string", {
  name: "bugdr"
}]

function* flat(arr, num) {
  if (num === undefined) num = 1
  for (const item of arr) {
    if (Array.isArray(item) && num > 0) {
      yield* flat(item, num - 1)
    } else {
      yield item
    }
  }
}

// 调用Generator函数，该函数并不立即执行，返回的也不是函数运行结果，而是指向内部状态的指针对象
// 也就是遍历对象（Iterator Object）所以需要用一次拓展运算符得到结果
console.log([...flat(arr, Infinity)]) // [ 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 5, 'string', { name: 'bugdr' } ]
```

## 在原型链上重写`flat`函数

```js
const arr = [1, 2, 3, 4, [1, 2, 3, 4, [1, 2, [3, 4]]], 5, "string", {
  name: "bugdr"
}]

Array.prototype.fnFlat = function (num = 1) {
  if (!Number(num) || Number(num) < 0) {
    return this;
  }
  let arr = this.concat(); // 获得调用 fakeFlat 函数的数组
  while (num > 0) {
    if (arr.some(x => Array.isArray(x))) {
      arr = [].concat.apply([], arr);
    } else {
      break;
    }
    num--;
  }
  return arr;
};

console.log(arr.fnFlat(Infinity)) // [ 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 5, 'string', { name: 'bugdr' } ]
```

## 考虑数组空位的情况

最开始我们总结`flat`特性知道，`flat`函数执行会跳过空位，`ES5`大多数数组方法对空位的处理都会选择跳过空位：`forEach`，`filter`，`reduce`，`every`和`some`都会跳过空位。

所以可以利用上诉的函数特性来实现`flat`跳过空位。

```js
// 考虑数据空位的情况
const arr = [1, 2, 3, , [4, , 5]]

// reduce + 递归
Array.prototype.fnFlat = function (num = 1) {
  if (!Number(num) || Number(num) < 0) {
    return this;
  }
  let arr = [].concat(this);
  return num > 0 ?
    arr.reduce(
      (pre, cur) =>
      pre.concat(Array.isArray(cur) ? cur.fnFlat(--num) : cur),
      []
    ) :
    arr.slice();
}
console.log(arr.fnFlat()) // [ 1, 2, 3, 4, <1 empty item>, 5 ]
```

由于空位的处理规则非常不统一，所以建议避免出现空位。

ES5 对空位的处理，就非常不一致，大多数情况下会忽略空位。

- forEach(), filter(), reduce(), every() 和 some() 都会跳过空位。
- map() 会跳过空位，但会保留这个值。
- join() 和 toString() 会将空位视为 undefined，而 undefined 和 null 会被处理成空字符串。

### ES6 明确将空位转为 undefined

- entries()、keys()、values()、find()和 findIndex() 会将空位处理成 undefined。
- for...of 循环会遍历空位。
- fill() 会将空位视为正常的数组位置。
- copyWithin() 会连空位一起拷贝。
- 扩展运算符（...）也会将空位转为 undefined。
- Array.from 方法会将数组的空位，转为 undefined。