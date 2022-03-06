/*
 * @Author: mikey.zhaopeng 
 * @Date: 2022-03-Su 11:42:12 
 * @Last Modified by:   mikey.zhaopeng 
 * @Last Modified time: 2022-03-Su 11:42:12 
 */
/*
 * @Author: mikey.zhaopeng 
 * @Date: 2022-03-Su 11:42:12 
 * @Last Modified by:   mikey.zhaopeng 
 * @Last Modified time: 2022-03-Su 11:42:12 
 */
/*
 * @Author: mikey.zhaopeng 
 * @Date: 2022-03-Su 11:42:10 
 * @Last Modified by:   mikey.zhaopeng 
 * @Last Modified time: 2022-03-Su 11:42:10 
 */
/*
 * @Author: mikey.zhaopeng 
 * @Date: 2022-03-Su 11:42:10 
 * @Last Modified by:   mikey.zhaopeng 
 * @Last Modified time: 2022-03-Su 11:42:10 
 */
/*
 * @Author: mikey.zhaopeng 
 * @Date: 2022-03-Su 11:42:06 
 * @Last Modified by:   mikey.zhaopeng 
 * @Last Modified time: 2022-03-Su 11:42:06 
 */
/*
 * @Author: mikey.zhaopeng 
 * @Date: 2022-03-Su 11:42:05 
 * @Last Modified by:   mikey.zhaopeng 
 * @Last Modified time: 2022-03-Su 11:42:05 
 */
/*
 * @Author: mikey.zhaopeng 
 * @Date: 2022-03-Su 11:41:47 
 * @Last Modified by:   mikey.zhaopeng 
 * @Last Modified time: 2022-03-Su 11:41:47 
 */
/*
 * @Author: mikey.zhaopeng 
 * @Date: 2022-03-Su 11:37:10 
 * @Last Modified by:   mikey.zhaopeng 
 * @Last Modified time: 2022-03-Su 11:37:10 
 */
/*
 * @Author: mikey.zhaopeng 
 * @Date: 2022-03-Su 11:37:10 
 * @Last Modified by:   mikey.zhaopeng 
 * @Last Modified time: 2022-03-Su 11:37:10 
 */
/*
 * @Author: mikey.zhaopeng 
 * @Date: 2022-03-Su 11:36:24 
 * @Last Modified by:   mikey.zhaopeng 
 * @Last Modified time: 2022-03-Su 11:36:24 
 */
/*
 * @Author: mikey.zhaopeng 
 * @Date: 2022-03-Su 11:17:28 
 * @Last Modified by:   mikey.zhaopeng 
 * @Last Modified time: 2022-03-Su 11:17:28 
 */
/*
 * @Author: mikey.zhaopeng 
 * @Date: 2022-03-Su 11:17:27 
 * @Last Modified by:   mikey.zhaopeng 
 * @Last Modified time: 2022-03-Su 11:17:27 
 */
/*
 * @Author: bugdr 
 * @Date: 2022-03-Su 11:02:56 
 * @Last Modified by:   bugdr 
 * @Last Modified time: 2022-03-Su 11:02:56 
 */
/*
 * @Author: bugdr 
 * @Date: 2022-03-Su 11:02:55 
 * @Last Modified by:   bugdr 
 * @Last Modified time: 2022-03-Su 11:02:55 
 */
/*
 * @Author: bugdr 
 * @Date: 2022-03-Su 11:02:54 
 * @Last Modified by:   bugdr 
 * @Last Modified time: 2022-03-Su 11:02:54 
 */
/*
 * @Author: bugdr 
 * @Date: 2022-03-Su 11:01:28 
 * @Last Modified by:   bugdr 
 * @Last Modified time: 2022-03-Su 11:01:28 
 */
/*
 * @Author: bugdr 
 * @Date: 2022-03-Su 11:01:13 
 * @Last Modified by:   bugdr 
 * @Last Modified time: 2022-03-Su 11:01:13 
 */
/*
 * @Author: bugdr 
 * @Date: 2022-03-Su 10:57:28 
 * @Last Modified by:   bugdr 
 * @Last Modified time: 2022-03-Su 10:57:28 
 */
/*
 * @Author: bugdr 
 * @Date: 2022-03-Su 10:57:25 
 * @Last Modified by:   bugdr 
 * @Last Modified time: 2022-03-Su 10:57:25 
 */
/*
 * @Author: bugdr 
 * @Date: 2022-03-Su 10:55:38 
 * @Last Modified by:   bugdr 
 * @Last Modified time: 2022-03-Su 10:55:38 
 */
/*
 * @Author: bugdr 
 * @Date: 2022-03-Su 10:55:36 
 * @Last Modified by:   bugdr 
 * @Last Modified time: 2022-03-Su 10:55:36 
 */
// 原型链继承
// function SuperType() {
//     this.property = true
// }

// SuperType.prototype.getSuperValue = function () {
//     return this.property
// }

// function SubType() {
//     this.subproperty = false;
// }

// // 创建SuperType的实例，并将该实例赋值给SubType.prototype
// SubType.prototype = new SuperType()

// SubType.prototype.getSubValue = function () {
//     return this.subproperty
// }

// const test = new SubType()

// console.log(test.getSuperValue()) // true

// 实例的污染
// function SuperType() {
//     this.color = ["red", "green", "blue"]
// }

// function SubType() {}

// // 创建SuperType的实例，并将该实例赋值给SubType.prototype
// SubType.prototype = new SuperType()

// const test = new SubType()
// test.color.push("block")
// console.log(test.color) // [ 'red', 'green', 'blue', 'block' ]

// const test1 = new SubType()

// console.log(test1.color) // [ 'red', 'green', 'blue', 'block' ]

/* 
构造函数
*/

// function SuperType() {
//     this.color = ["red", "green", "blue"]
// }

// function SubType() {
//     // 使用父类构造函数实现继承
//     SuperType.call(this)
// }

// const test = new SubType()
// test.color.push("block")
// console.log(test.color) // [ 'red', 'green', 'blue', 'block' ]

// const test1 = new SubType()
// console.log(test1.color) // [ 'red', 'green', 'blue' ]


/**
 * 组合继承
 */
// function SuperType(name) {
//     this.name = name
//     this.color = ['red', 'green', 'blue']
// }

// SuperType.prototype.sayName = function () {
//     console.log(this.name)
// }

// function SubType(name, age) {
//     // 继承属性
//     // 第二次调用SuperType
//     SuperType.call(this, name)
//     this.age = age
// }

// // 继承方法
// // 构造原型
// SubType.prototype = new SuperType()
// // 重写SubType.prototype 的constructor属性，指向自己的构造函数
// SubType.prototype.constructor = SubType
// SubType.prototype.sayAge = function () {
//     console.log(this.age)
// }

// const test1 = new SubType("bugdr", 27)
// test1.color.push("block")
// console.log(test1.color) // [ 'red', 'green', 'blue', 'block' ]
// test1.sayName() // bugdr
// test1.sayAge() // 27

// const test2 = new SubType("bugdr1", 28)
// console.log(test2.color) // [ 'red', 'green', 'blue' ]
// test2.sayName() // bugdr1
// test2.sayAge() // 28

/**
 * 原型式继承
 */
// function object(obj) {
//     function F() {}
//     F.prototype = obj
//     return new F()
// }

// const person = {
//     name: "bugdr",
//     friends: ["Shelby", "Court", "Van"]
// }
// const anotherPerson = object(person)

// anotherPerson.name = "bugdr1"
// anotherPerson.friends.push("mo")

// const yetAnotherPerson = new object(person)

// yetAnotherPerson.name = "bugdr2"
// yetAnotherPerson.friends.push("mo1")

// console.log(person.friends) // [ 'Shelby', 'Court', 'Van', 'mo', 'mo1' ]

/**
 * 寄生式继承
 */

// function object(obj) {
//     function F() {}
//     F.prototype = obj
//     return new F()
// }

// function createAnother(original) {
//     const clone = object(original) // 通过调用 object() 函数创建一个新对象
//     clone.sayHi = function () { // 以某种方式来增强对象
//         console.log("hi")
//     }
//     return clone // 返回这个对象
// }

// const person = {
//     name: "bugdr",
//     friends: ["Shelby", "Court", "Van"]
// }

// const anotherPerson = createAnother(person)
// anotherPerson.sayHi() // hi

/**
 * 寄生组合式继承
 */
// function inheritPrototype(subType, superType) {
//     const prototype = Object.create(superType.prototype) // 创建对象，创建父原型的一个副本
//     prototype.constructor = subType
//     subType.prototype = prototype
// }

// // 父类初始实例属性和原型属性
// function SuperType(name) {
//     this.name = name
//     this.colors = ["red", "blue", "green"];
// }

// SuperType.prototype.sayName = function () {
//     console.log(this.name)
// }

// // 借用构造函数传递增强子类实例的属性
// function SubType(name, age) {
//     SuperType.call(this, name)
//     this.age = age
// }

// // 将父类原型指向子类
// inheritPrototype(SubType, SuperType)

// // 新增子类的原有属性
// SubType.prototype.sayAge = function () {
//     console.log(this.age)
// }

// const test1 = new SubType("bugdr", 18)
// const test2 = new SubType("bugdr1", 18)
// test1.colors.push("2")
// test1.colors.push("3")
// console.log(test1.colors) // [ 'red', 'blue', 'green', '2', '3' ]

/**
 * 混入方式继承多个对象
 */

// function MyClass() {
//     SuperClass.call(this)
//     OtherSuperClass.call(this)
// }

// // 继承一个类
// MyClass.prototype = Object.create(SuperClass.prototype)
// // 混入其它
// Object.assign(MyClass.prototype, OtherSuperClass.prototype)
// // 重新指定constructor
// MyClass.prototype.constructor = MyClass

// MyClass.prototype.myMethod = function () {
//     // code
// }

/**
 * extends继承
 */
// class Rectangle {
//     constructor(height, width) {
//         this.height = height
//         this.width = width
//     }

//     // get
//     get area() {
//         return this.calcArea()
//     }

//     // method
//     calcArea() {
//         return this.height * this.width
//     }
// }

// const rectangle = new Rectangle(10, 6)
// console.log(rectangle.area) // 60

// // 实现继承
// class Square extends Rectangle {
//     constructor(length) {
//         super(length, length)
//         this.name = "Square"
//     }

//     get area() {
//         return this.height * this.width
//     }
// }

// const square = new Square(10)
// console.log(square.area) // 100

// function _inherits(subType, superType) {
//     // 创建对象
//     // 增强对象
//     // 指定对象
//     subType.prototype = Object.create(superType && superType.prototype, {
//         constructor: {
//             value: subType,
//             enumerable: false,
//             writable: true,
//             configurable: true
//         }
//     })

//     if (superType) {
//         Object.setPrototypeOf ? Object.setPrototypeOf(subType, superType) : subType.__proto__ = subType
//     }
// }

console.log(1 + true + "1")