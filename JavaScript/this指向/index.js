// function fn() {
//     console.log(this)
// }
// fn()

// const obj = {
//     fn1: function () {
//         console.log(this === obj)
//     }
// }

// obj.fn2 = function () {
//     console.log(this === obj)
// }

// function fn3() {
//     console.log(this === obj)
// }

// obj.fn3 = fn3
// obj.fn1() // true
// obj.fn2() // true
// obj.fn3() // true

// function fn() {
//     console.log(this)
// }

// // new fn() // fn的实例fn {}

// const ctx = {
//     value: "a"
// }

// fn.call(ctx) // { value: 'a' }
// fn.apply(ctx) // { value: 'a' }
// const fnBind = fn.bind(ctx)
// fnBind() // { value: 'a' }

// const obj = {
//     fn(arr) {
//         console.log(this)
//         const cb = () => {
//             console.log(this)
//         }
//         arr.forEach(cb)
//     }
// }

// obj.fn([1, 2, 3])
/**
 * { fn: [Function: fn] }
{ fn: [Function: fn] }
{ fn: [Function: fn] }
{ fn: [Function: fn] }
 */

// const adder = {
//     base: 1,
//     add: function (a) {
//         const f = v => v + this.base
//         return f(a)
//     },

//     addThruCall: function (a) {
//         const f = v => v + this.base
//         const b = {
//             base: 2
//         }

//         return f.call(b, a)
//     }
// }

// console.log(adder.add(1)) // 2
// console.log(adder.addThruCall(1)) // 2

// function fn() {}
// console.log(fn.prototype) // {}

// const arrowFn = () => {}
// console.log(arrowFn.prototype) // undefined
// const arrowIns = new arrowFn() // TypeError: arrowFn is not a constructor

// function newOperator(Con, ...args) {
//     let obj = {}
//     Object.setPrototypeOf(obj, Con.prototype)
//     let result = Con.apply(obj, args)
//     return result instanceof Object ? result : obj
// }