<!--
 * @Author: bugdr
 * @Date: 2022-03-11 16:38:28
 * @LastEditors: bugdr
 * @LastEditTime: 2022-03-12 10:11:52
 * @FilePath: \es6\JavaScript\数据类型的方法\数组\数组基本操作\index.md
 * @Description: 
-->
# 数组常用方法整理

## 数组的方法大致分为两类

- 改变原数组的方法：比如`push`，`unshift`，`pop`等。
- 不改变原数组的方法：比如`reduce`，`filter`，`every`等。

### 改变原数组的方法

#### Array.shift()

`shift()`删除数组的第一个元素，返回值是删除的元素

```js
const arr = [1, 2, 3]
const newArr = arr.shift() // 删除数组第一个元素，返回值是被删除的元素
console.log(arr) // [ 2, 3 ]
console.log(newArr) // 1
```

`shift()`是没有参数的，不需要进行传输，并且`shift()`方法只能删除一个元素。

#### Array.unshift()

在数组的前面添加一个或者多个数组元素，返回值是新数组的长度。

```js
// unshift
const arr = [1, 2, 3]
// 在数组前面添加元素
const newArr = arr.unshift("red", "blue") // [ 'red', 'blue', 1, 2, 3 ]
console.log(arr) // 打印数组
console.log(newArr) // 5 返回的数组长度
```

`unshift()`方法是向数组头部添加元素，元素个数不限制。

#### Array.push()

`push()`方法在数组末尾添加一个或者多个数组元素，返回的结果是新数组的长度

```js
// push
const arr = [1, 2, 3]
const newArr = arr.push(4, 5) // 往数组末尾添加元素
console.log(arr) // [ 1, 2, 3, 4, 5 ]
console.log(newArr) // 5
```

`push()`参数直接写就行，表示添加的元素。

#### Array.pop()

删除数组末尾元素。

```js
// pop
const arr = [1, 2, 3]
const newArr = arr.pop() // 删除数组最后一个元素
console.log(arr) // [ 1, 2 ]
console.log(newArr) // 3 返回值是被删除的元素
```

`pop()`没有参数，并且一次只能删除一个元素，返回值是删除的元素。

#### Array.reverse()

数组元素反转，返回值是反转之后的数组，并且原数组也会被改变。

```js
// reverse()
const arr = [1, 2, 3]
const newArr = arr.reverse() // 数组反转，返回值是反转之后的数据，并且原数组也是反转的
console.log(arr) // [ 3, 2, 1 ]
console.log(newArr) // // [ 3, 2, 1 ]
```

`reverse()`没有参数，不传参。

#### Array.sort()

对数组进行排序，返回值是排序后的数组，会改变原来的数组。

当数组的元素是英文字母的时候，默认按照字母顺序来排序。

当数组内部是中文字符串时，按`UTF-16`代码排序。

一般情况下，基本上不会对字符串类型数组进行排序。

```js
// sort()
const arr = ["a", "c", "b"]
console.log(arr.sort()) // [ 'a', 'b', 'c' ]
```

要比较数字而非字符串，要想升序和降序排序，要这样做：

```js
// 升序
const arr = [2, 1, 4, 3]
arr.sort((a, b) => {
    return a - b
})

console.log(arr) // [ 1, 2, 3, 4 ]

// 降序
arr.sort((a, b) => {
    return b - a
})

console.log(arr) // [ 4, 3, 2, 1 ]
```

#### Array.splice(start, length, item)

该方法实现的是`删`，`增`，`替换`数组元素，返回被删除的数组元素，没有做任何操作则不返回。

`splice()`一共有三个参数：

- start：起始位置的索引号
- length：需要删除的个数‘
- item：需要替换的元素（在不需要添加，只进行删除操作时可以省略）

`splice()`在不进行删除的时候，可以在某个索引后面添加元素。

```js
// 不进行删除添加元素
const arr = [1, 2, 4, 5]
arr.splice(2, 0, 3)
console.log(arr) // [ 1, 2, 3, 4, 5 ]

// 删除数组下标为2的1个元素
arr.splice(2, 1)
console.log(arr) // [ 1, 2, 4, 5 ]

// 替换数组元素
arr.splice(5, 1, 6)
console.log(arr) // [ 1, 2, 4, 5, 6 ]
```

### 不会改变原数组的方法

#### Array.prototype.slice()

`slice()`方法返回一个新的数组，截取数组，这是一个**浅拷贝**的方法，主要是有该方法的参数`begin`和`end`决定的，原数组不会被改变。

```js
// slice(begin, end)
const arr1 = [1, 2, 3, 4]
const arr2 = arr1.slice(1, 3)
console.log(arr1) // [ 1, 2, 3, 4 ]
console.log(arr2) // [ 2, 3 ]
```

- begin：提取起始处的索引（从0开始），从该索引开始提取原数组元素，如果该参数为负数，那就从数组最后元素提取。
- end：提取终止处的索引（从0开始），在该索引处结束提取原数组元素。

#### Array.prototype.reduce()

`reduce()` 方法对数组中的每个元素执行一个由您提供的`reducer`函数(升序执行)，将其结果汇总为单个返回值。

```js
// reduce()
const arr1 = [1, 2, 3, 4]
const initValue = 0
const sumValue = arr1.reduce((pre, cur) => {
    return pre + cur
}, initValue)

console.log(arr1) // [ 1, 2, 3, 4 ]
console.log(sumValue) // 10
```

`reduce()`接受4个参数：

- Accumulator(acc)：累加器
- Current Value(cur)：当前值
- Current Index(idx)：当前索引
- Source Array(src)：源数组

`reduce()`函数的值分配给累加器，该返回值在数组中的每一个迭代都被标记，并最后成为最终的单个结果值。

