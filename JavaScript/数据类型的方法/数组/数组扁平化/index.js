// let arr = [1, [2, [3, 4, [5, 6]]]]

// // 不传参数，默认拉平第一层
// console.log(arr.flat()) // [ 1, 2, [ 3, 4, [ 5, 6 ] ] ]

// // 传入一个整数参数，就是拉平的层数
// console.log(arr.flat(2)) // [ 1, 2, 3, 4, [ 5, 6 ] ]

// // Infinity关键字作为参数，无论嵌套多少层，都会转为一维数组，Infinity 为无穷的意思
// console.log(arr.flat(Infinity))

// // 传入 <=0 的整数将返回原数组，不拉平
// console.log(arr.flat(0)) // [ 1, [ 2, [ 3, 4, [Array] ] ] ]
// console.log(arr.flat(-10)) // [ 1, [ 2, [ 3, 4, [Array] ] ] ]

// // 如果元素组有空，那么flat()方法会跳过空位
// console.log([1, 2, [3, 4], , ].flat()) // [ 1, 2, 3, 4 ]

// let arr = [1, 2, 3, 4, [1, 2, 3, 4, [1, 2, 3, 4]], 5, "string", {
//     name: "bugdr"
// }]

// // for循环
// for (let i = 0; i < arr.length; i++) {
//     console.log(arr[i])
// }

// // for of
// for (let value of arr) {
//     console.log(value)
// }

// // for in
// for (let i in arr) {
//     console.log(arr[i])
// }

// // forEach
// arr.forEach(value => {
//     console.log(value)
// })

// // entries()
// for (let [index, value] of arr.entries()) {
//     console.log(value)
// }

// // keys()
// for (let index of arr.keys()) {
//     console.log(arr[index])
// }

// // values()
// for (let value of arr.values()) {
//     console.log(value)
// }

// // reduce()
// arr.reduce((pre, cur) => {
//     console.log(cur)
// }, [])

// // map()
// arr.map(value => {
//     console.log(value)
// })

// 判断元素是否是数组
// let arr = [1, 2, 3, 4, [1, 2, 3, 4, [1, 2, 3, 4]], 5, "string", {
//     name: "bugdr"
// }]

// console.log(arr instanceof Array) // true
// console.log(arr.constructor === Array) // true
// console.log(Object.prototype.toString.call(arr) === "[object Array]") // true
// console.log(Array.isArray(arr)) // true

// let arr = [1, 2, 3, 4, [1, 2, 3, 4, [1, 2, 3, 4]], 5, "string", {
//   name: "bugdr"
// }]

// // 拓展运算符+concat()
// console.log([].concat(...arr))
// /**
// [
//   1,
//   2,
//   3,
//   4,
//   1,
//   2,
//   3,
//   4,
//   [ 1, 2, 3, 4 ],
//   5,
//   'string',
//   { name: 'bugdr' }
// ]
//  */

// console.log([].concat.apply([], arr))

// /** 
// [
//   1,
//   2,
//   3,
//   4,
//   1,
//   2,
//   3,
//   4,
//   [ 1, 2, 3, 4 ],
//   5,
//   'string',
//   { name: 'bugdr' }
// ]
// */
// const arr1 = [1, 2, 3, 4, [1, 2, 3, 4, [1, 2, 3, 4]], 5]
// console.log(arr1.toString().split(',').map(value => parseInt(value)))
// /**
// [
//   1, 2, 3, 4, 1, 2,
//   3, 4, 1, 2, 3, 4,
//   5
// ]
//  */

// 数据扁平化
// const arr = [1, 2, 3, 4, [1, 2, 3, 4, [1, 2, [3, 4]]], 5, "string", {
//   name: "bugdr"
// }]

// // concat + 递归
// function flat(arr) {
//   let result = []
//   arr.forEach(item => {
//     if (Array.isArray(item)) {
//       result = result.concat(flat(item))
//     } else {
//       result.push(item)
//     }
//   })
//   return result
// }

// console.log(flat(arr)) // [ 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 5, 'string', { name: 'bugdr' } ]

// const arr = [1, 2, 3, 4, [1, 2, 3, 4, [1, 2, [3, 4]]], 5, "string", {
//   name: "bugdr"
// }]

// // 使用reduce展开一层
// console.log(arr.reduce((pre, cur) => pre.concat(cur), []))
// /**
// [
//   1,
//   2,
//   3,
//   4,
//   1,
//   2,
//   3,
//   4,
//   [ 1, 2, [ 3, 4 ] ],
//   5,
//   'string',
//   { name: 'bugdr' }
// ]
//  */

// const flat = arr => {
//   return arr.reduce((pre, cur) => {
//     return pre.concat(Array.isArray(cur) ? flat(cur) : cur)
//   }, [])
// }
// console.log(flat(arr)) // [ 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 5, 'string', { name: 'bugdr' } ]

// const arr = [1, 2, 3, 4, [1, 2, 3, 4, [1, 2, [3, 4]]], 5, "string", {
//   name: "bugdr"
// }]

// function flat(arr) {
//   const result = []
//   const stack = [].concat(arr) // 将数组元素拷贝到栈，直接复制会改变原数组
//   // 如果栈不为空，则遍历循环
//   while (stack.length !== 0) {
//     const val = stack.pop()
//     if (Array.isArray(val)) {
//       stack.push(...val) // 如果是数组再次入栈，并展开一层
//     } else {
//       result.unshift(val) // 如果不是数组就将其取出来放入结果数组中
//     }
//   }
//   return result
// }
// console.log(flat(arr)) // [ 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 5, 'string', { name: 'bugdr' } ]

// // reduce + 递归

// const arr = [1, 2, 3, 4, [1, 2, 3, 4, [1, 2, [3, 4]]], 5, "string", {
//   name: "bugdr"
// }]

// function flat(arr, num = 1) {
//   return num > 0 ?
//     arr.reduce((pre, cur) =>
//       pre.concat(Array.isArray(cur) ?
//         flat(cur, num - 1) : cur), []) :
//     arr.slice()
// }

// console.log(flat(arr, Infinity))

// // Generator
// const arr = [1, 2, 3, 4, [1, 2, 3, 4, [1, 2, [3, 4]]], 5, "string", {
//   name: "bugdr"
// }]

// function* flat(arr, num) {
//   if (num === undefined) num = 1
//   for (const item of arr) {
//     if (Array.isArray(item) && num > 0) {
//       yield* flat(item, num - 1)
//     } else {
//       yield item
//     }
//   }
// }

// // 调用Generator函数，该函数并不立即执行，返回的也不是函数运行结果，而是指向内部状态的指针对象
// // 也就是遍历对象（Iterator Object）所以需要用一次拓展运算符得到结果
// console.log([...flat(arr, Infinity)]) // [ 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 5, 'string', { name: 'bugdr' } ]

// const arr = [1, 2, 3, 4, [1, 2, 3, 4, [1, 2, [3, 4]]], 5, "string", {
//   name: "bugdr"
// }]

// Array.prototype.fnFlat = function (num = 1) {
//   if (!Number(num) || Number(num) < 0) {
//     return this;
//   }
//   let arr = this.concat(); // 获得调用 fakeFlat 函数的数组
//   while (num > 0) {
//     if (arr.some(x => Array.isArray(x))) {
//       arr = [].concat.apply([], arr);
//     } else {
//       break;
//     }
//     num--;
//   }
//   return arr;
// };

// console.log(arr.fnFlat(Infinity)) // [ 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 5, 'string', { name: 'bugdr' } ]

// // 考虑数据空位的情况
// const arr = [1, 2, 3, , [4, , 5]]

// // reduce + 递归
// Array.prototype.fnFlat = function (num = 1) {
//   if (!Number(num) || Number(num) < 0) {
//     return this;
//   }
//   let arr = [].concat(this);
//   return num > 0 ?
//     arr.reduce(
//       (pre, cur) =>
//       pre.concat(Array.isArray(cur) ? cur.fnFlat(--num) : cur),
//       []
//     ) :
//     arr.slice();
// }
// console.log(arr.fnFlat()) // [ 1, 2, 3, 4, <1 empty item>, 5 ]