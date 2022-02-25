// const obj = {
//     value: "bugdr"
// }

// function fn() {
//     console.log(this.value)
// }

// fn.call(obj) //bugdr

// const obj = {
//     value: "bugdr",
//     fn: function () {
//         console.log(this.value)
//     }
// }

// function fn() {
//     console.log(this.value)
// }

// obj.fn() // bugdr

// obj.fn = fn;
// obj.fn(); // bugdr
// delete obj.fn;

// Function.prototype.myCall = function (context) {
//     if (typeof this !== "function") {
//         throw new Error("Type error")
//     }
//     let args = [...arguments].slice(1)
//     let result = null
//     context = context || window
//     context.fn = this
//     result = context.fn(...args)
//     delete context.fn
//     return result
// }

// function fn() {
//     console.log(this.value)
// }

// const obj = {
//     value: "bugdr"
// }

// fn.myCall(obj) // bugdr

// Function.prototype.myApply = function (context) {
//     if (typeof this !== "function") {
//         throw new Error("type error")
//     }
//     let result = null
//     context = context || window
//     const fnSymbol = Symbol()
//     context[fnSymbol] = this
//     if (arguments[1]) {
//         result = context[fnSymbol](...arguments[1])
//     } else {
//         result = context[fnSymbol]()
//     }
//     delete context[fnSymbol]
//     return result
// }

// const obj = {
//     value: "bugdr"
// }

// function fn() {
//     console.log(this.value)
// }

// fn.myApply(obj)

// let value = 2

// let foo = {
//     value: 1
// }

// function bar(name, age) {
//     return {
//         value: this.value,
//         name: name,
//         age: age
//     }
// }

// console.log(bar.call(foo, "bugdr", 23)) // { value: 1, name: 'bugdr', age: 23 }
// console.log(bar.apply(foo, ["bugdr", 24])) // { value: 1, name: 'bugdr', age: 24 }
// let bindFar = bar.bind(foo, "bugdr", 25)
// console.log(bindFar()) // { value: 1, name: 'bugdr', age: 25 }

// let bindFar1 = bar.bind(foo, "bugdr")
// console.log(bindFar1(26)) // { value: 1, name: 'bugdr', age: 26 }

// Function.prototype.myBind = function (context) {
//     // 调用bind的不是函数，需要抛出异常
//     if (typeof this !== "function") {
//         throw new Error("type error")
//     }
//     // this指向调用者
//     let self = this
//     // 因为第一个参数指向的是this，所以只能取第一个参数之后的参数
//     let args = Array.prototype.slice.call(arguments, 1)
//     // 返回一个函数
//     return function () {
//         // 这个时候的arguments是指向bind返回的函数传入的参数
//         let bindArgs = Array.prototype.slice.call(arguments)
//         return self.apply(context, args.concat(bindArgs))
//     }
// }

// Function.prototype.myBind = function (context) {
//     // 调用bind的不是函数，需要抛出异常
//     if (typeof this !== "function") {
//         throw new Error("type error")
//     }
//     // this指向调用者
//     let self = this
//     // 因为第一个参数指向的是this，所以只能取第一个参数之后的参数
//     let args = Array.prototype.slice.call(arguments, 1)
//     // 创建一个空对象
//     const fNOP = function () {}
//     const fBound = function () {
//         let bindArgs = Array.prototype.slice.call(arguments)
//         return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs))
//         // 注释1
//     }
//     // 注释2
//     fNOP.prototype = this.prototype
//     fBound.prototype = new fNOP()
//     return fBound
// }


// let value = 2

// let foo = {
//     value: 1
// }

// function bar(name, age) {
//     this.habit = "shopping"
//     console.log(this.value)
//     console.log(name)
//     console.log(age)
// }

// bar.prototype.friend = "bugdr"

// let bindBar = bar.myBind(foo, "bugdr1")

// let obj = new bindBar(200)
// /* 
// undefined
// bugdr1
// 200
// */

// console.log(obj.habit) // shopping

// console.log(obj.friend) // bugdr