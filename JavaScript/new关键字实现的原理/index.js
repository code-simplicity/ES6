// // 定义构造函数
// function Person(name, age) {
//     this.name = name
//     this.age = age

//     this.say = function () {
//         console.log(`my name is ${this.name}, my age is ${this.age}`)
//     }
// }

// // 构造函数的原型属性和方法定义
// Person.prototype.color = "red"
// Person.prototype.sayBy = function () {
//     console.log("by")
// }

// // 实例化
// const person = new Person("bugdr", 22)

// console.log(person) // Person { name: 'bugdr', age: 22, say: [Function (anonymous)] }

// // 当前属性
// console.log(person.name) // bugdr

// // 当前方法
// person.say() // my name is bugdr, my age is 22

// // 原型的方法
// person.sayBy() // by

// function Student(name) {
//     console.log('赋值前-this', this) // {}
//     this.name = name
//     console.log('赋值后-this', this) // { name: 'bugdr' }
// }

// const student = new Student("bugdr")
// console.log(student) // Student { name: 'bugdr' }

// 例子3
// function Student(name) {
//     this.name = name
// }

// Student.prototype.doSth = function () {
//     console.log(this.name)
// }

// const student1 = new Student("bug")
// const student2 = new Student("dr")

// console.log(student1, student1.doSth()) // bug Student { name: 'bug' } undefined
// console.log(student2, student2.doSth()) // dr Student { name: 'dr' } undefined
// console.log(student1.__proto__ === Student.prototype) // true
// console.log(student2.__proto__ === Student.prototype) // true

// 例子4
// function Student(name) {
//     this.name = name
// }

// const student = new Student("bugdr")
// console.log(student) // Student { name: 'bugdr' }

/**
 * 实现过程
 * @param {*} ctor 构造函数 
 */
function newFn(ctor) {
    if (typeof ctor !== "function") {
        throw new Error("newFn function the first param must be a function")
    }
    // ES6中 new.target是指向构造函数
    newFn.target = ctor
    // 创建一个全新的对象
    // 执行[[Prototype]]链接
    // 通过new 创建每个对象最终都被[[]Prototype]链接到这个函数的prototype对象上。
    const newObj = Object.create(ctor.prototype)
    // 将arguments转成数组
    // 去除ctor构造函数的多余参数
    const argsArr = [].slice.call(arguments, 1)
    // 生成的新对象会绑定到函数调用this
    // 获取ctor的返回结果
    const ctorReturnResult = ctor.apply(newObj, argsArr)
    // 这些类型中合并起来只有Object和Function两种类型 typeof null 也是'object'所以要不等于null，排除null
    const isObject = typeof ctorReturnResult === "object" && ctorReturnResult !== null
    const isFunction = typeof ctorReturnResult === "function"
    if (isObject || isFunction) {
        return ctorReturnResult
    }
    // 如果函数没有返回对象类型`Object`(包含`Functoin`, `Array`, `Date`, `RegExg`, `Error`)，那么`new`表达式中的函数调用会自动返回这个新的对象。
    return newObj
}

function Student(name, age) {
    this.name = name
    this.age = age
}

Student.prototype.doSth = function () {
    console.log(this.name)
}

const student1 = newFn(Student, "bugdr", 18)
const student2 = newFn(Student, "tom", 21)

console.log(student1, student1.doSth()) // bugdr Student { name: 'bugdr', age: 18 } undefined
console.log(student2, student2.doSth()) // tom Student { name: 'tom', age: 21 } undefined
console.log(student1.__proto__ === Student.prototype) // true
console.log(student2.__proto__ === Student.prototype) // true