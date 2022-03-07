# new关键字实现的原理

## 作用

`new`关键字的作用：通过对`new`关键字实例化构造函数，获取对象。

- 首先创建了一个空对象
- 设置原型，将对象的原型设置为函数的`prototype`对象
- 让函数的`this`指向这个对象，执行构造函数的代码（为这个新对象添加属性）
- 判断函数的返回值类型，如果是值类型，返回创建的对象，如果是引用类型，就返回这个引用类型的对象

## 原理

首先我们看一下这个例子：

```js
// 定义构造函数
function Person(name, age) {
    this.name = name
    this.age = age

    this.say = function () {
        console.log(`my name is ${this.name}, my age is ${this.age}`)
    }
}

// 构造函数的原型属性和方法定义
Person.prototype.color = "red"
Person.prototype.sayBy = function () {
    console.log("by")
}

// 实例化
const person = new Person("bugdr", 22)

console.log(person) // Person { name: 'bugdr', age: 22, say: [Function (anonymous)] }

// 当前属性
console.log(person.name) // bugdr

// 当前方法
person.say() // my name is bugdr, my age is 22

// 原型的方法
person.sayBy() // by
```

上面代码定义了一个`Person`函数，当我们对这个函数使用`new`操作符的时候，就会生成一个全新的对象，对这个对象进行输出，可以看到该对象携带的属性和方法。

从上面的例子看，`new`操作符做了两件事：

- 创建了一个全新的对象
- 这个对象会被执行链接

接下来我们再看下面一个例子：

```js
function Student(name) {
    console.log('赋值前-this', this) // {}
    this.name = name
    console.log('赋值后-this', this) // { name: 'bugdr' }
}

const student = new Student("bugdr")
console.log(student) // Student { name: 'bugdr' }
```

由此可以看出，这里的`Student`的函数中的`this`指向`new Student()`生成的对象`student`。

从上诉例子可以看到，`new`操作符又做了一件事：

- 生成的新对象会绑定到函数调用的`this`。

接下来看下一个例子：

```js
function Student(name) {
    this.name = name
}

Student.prototype.doSth = function () {
    console.log(this.name)
}

const student1 = new Student("bug")
const student2 = new Student("dr")

console.log(student1, student1.doSth()) // bug Student { name: 'bug' } undefined
console.log(student2, student2.doSth()) // dr Student { name: 'dr' } undefined
console.log(student1.__proto__ === Student.prototype) // true
console.log(student2.__proto__ === Student.prototype) // true
```

上面的例子再次验证了例子1的第二点，对象会被执行链接，并且通过`new Student()`创建的每个对象最终被`[[Prototype]]`链接到这个`Student.prototype`对象上。

接下来再进行一个例子的探讨：

```js
function Student(name) {
    this.name = name
}

const student = new Student("bugdr")
console.log(student) // Student { name: 'bugdr' }
```

如果函数没有返回对象类型`Object`，那么`new`表达式中的函数调用会自动返回这个新的对象。

## 模拟实现

知道`new`操作符的这些现象之后，接下来可以模拟实现以下`new`的实现过程。

```js
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
```

之后我们模拟实现以下这个`newFn`

```js
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
```

从上面可以看出这个很符合`new`操作符。

## 总结

最后总结一下：

- 创建了一个全新的对象
- 这个创建的对象会被执行`[[Prototype]]`（也就是`__proto__`）链接
- 生成的新对象会绑定到函数调用的`this`
- 通过`new`创建的每个对象最终都会被`[[Prototype]]`链接到这个函数的`prototype`上
- 如果函数没有返回对象类型，那么`new`表达式中的函数调用会自动返回这个新的对象
