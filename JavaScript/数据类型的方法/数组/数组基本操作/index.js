// shift
// const arr = [1, 2, 3]
// const newArr = arr.shift() // 删除数组第一个元素，返回值是被删除的元素
// console.log(arr) // [ 2, 3 ]
// console.log(newArr) // 1 返回值是被删除的元素

// // unshift
// const arr = [1, 2, 3]
// // 在数组前面添加元素
// const newArr = arr.unshift("red", "blue") // [ 'red', 'blue', 1, 2, 3 ]
// console.log(arr) // 打印数组
// console.log(newArr) // 5 返回的数组长度

// // push
// const arr = [1, 2, 3]
// const newArr = arr.push(4, 5) // 往数组末尾添加元素
// console.log(arr) // [ 1, 2, 3, 4, 5 ]
// console.log(newArr) // 5

// // pop
// const arr = [1, 2, 3]
// const newArr = arr.pop() // 删除数组最后一个元素
// console.log(arr) // [ 1, 2 ]
// console.log(newArr) // 3 返回值是被删除的元素

// reverse()
// const arr = [1, 2, 3]
// const newArr = arr.reverse() // 数组反转，返回值是反转之后的数据，并且原数组也是反转的
// console.log(arr) // [ 3, 2, 1 ]
// console.log(newArr) // // [ 3, 2, 1 ]

// sort()
// const arr = ["a", "c", "b"]
// console.log(arr.sort()) // [ 'a', 'b', 'c' ]

// // 升序
// const arr = [2, 1, 4, 3]
// arr.sort((a, b) => {
//     return a - b
// })

// console.log(arr) // [ 1, 2, 3, 4 ]

// // 降序
// arr.sort((a, b) => {
//     return b - a
// })

// console.log(arr) // [ 4, 3, 2, 1 ]

// splice()

// // 不进行删除添加元素
// const arr = [1, 2, 4, 5]
// arr.splice(2, 0, 3)
// console.log(arr) // [ 1, 2, 3, 4, 5 ]

// // 删除数组下标为2的1个元素
// arr.splice(2, 1)
// console.log(arr) // [ 1, 2, 4, 5 ]

// // 替换数组元素
// arr.splice(5, 1, 6)
// console.log(arr) // [ 1, 2, 4, 5, 6 ]

/**
 * 不改变原数组的
 */

// // slice(begin, end)
// const arr1 = [1, 2, 3, 4]
// const arr2 = arr1.slice(1, 3)
// console.log(arr1) // [ 1, 2, 3, 4 ]
// console.log(arr2) // [ 2, 3 ]

// reduce()
// const arr1 = [1, 2, 3, 4]
// const initValue = 0
// const sumValue = arr1.reduce((pre, cur) => {
//     return pre + cur
// }, initValue)

// console.log(arr1) // [ 1, 2, 3, 4 ]
// console.log(sumValue) // 10