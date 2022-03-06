# 继承

- `原型链的方式进行继承`：这种方式存在一种缺点，在包含有引用类型的数据时，会被所有的实例对象所共享，容易造成修改的混乱，还有就是在创建子类型的时候不能向超类型传递参数。
- `构造函数`：这种方式是通过在子类型的函数中调用超类型的构造函数来实现，这一种方法解决了不能向超类型传递的参数的缺点，但是它存在一个问题就是无法实现函数的复用，并且超类型原型定义的方法子类型也没用办法访问到。
- `组合继承`：组合继承是将原型链和借用构造函数组合起来使用的一种方式，通过借助构造函数的方式来实现类型的属性的继承，通过将子类型的原型设置为超类型的实例来实现函数方法的继承。这种方式解决了上面的两种模式单独使用时的问题，但是由于我们以超类型的实例来作为子类型的原型，所以调用了两次超类型的构造函数，造成了子类型的原型中多了很多不必要的属性。
- `原型式继承`：原型式继承继承的主要思路就是基于已有的对象来创建新的对象，实现的原理是，向函数中传入一个对象，然后返回以这个对象为原型的对象，这种继承的思路主要不是为了实现创造一种新的数据类型，只是对某一个对象实现一种简单的继承，ES5 中定义的 Object.create() 方法就是原型式继承的实现。缺点与原型链方式相同。
- `寄生式继承`：寄生式继承的思路是创建一个用于封装继承过程的函数，通过传入一个对象，然后复制一个对象的副本，然后进行对象拓展，最后返回这个对象。这个拓展的过程可以理解是一种继承，这种继承的优点就是对一个简单对象实现继承，如果这个对象不是我们的自定义类型时。缺点是没有办法实现函数的复用。
- `寄生式组合继承`：组合继承的缺点就是使用超类型的实例作为子类型的原型，导致添加了不必要的原型属性。寄生组合式继承的方式就是使用超类型的原型的副本作为子类型的原型，这样就避免了创建不必要的属性。
- `混入方式继承多个对象`：
- `ES6类继承extends`：

## 原型链继承

构造函数，原型和实例之间的关系，每一个构造函数都有一个原型对象，每一个原型对象都有一个指向构造函数的指针，而实例都包含一个原型对象的指针。

继承的本质其实就是复制，即重写对象原型。

```js
function SuperType() {
    this.property = true
}

SuperType.prototype.getSuperValue = function () {
    return this.property
}

function SubType() {
    this.subproperty = false;
}

// 创建SuperType的实例，并将该实例赋值给SubType.prototype
SubType.prototype = new SuperType()

SubType.prototype.getSubValue = function () {
    return this.subproperty
}

const test = new SubType()

console.log(test.getSuperValue()) // true
```

### 缺点

原型链继承的方式存在一个缺点那就是，多个实例对应用类型的数据的操作会被篡改。

```js
function SuperType() {
    this.color = ["red", "green", "blue"]
}

function SubType() {}

// 创建SuperType的实例，并将该实例赋值给SubType.prototype
SubType.prototype = new SuperType()

const test = new SubType()
test.color.push("block")
console.log(test.color) // [ 'red', 'green', 'blue', 'block' ]

const test1 = new SubType()

console.log(test1.color) // [ 'red', 'green', 'blue', 'block' ]
```

## 构造函数

使用父类的构造函数来增强子类的实例，等同于复制父类的实例给子类。

```js
function SuperType() {
    this.color = ["red", "green", "blue"]
}

function SubType() {
    // 使用父类构造函数实现继承
    SuperType.call(this)
}

const test = new SubType()
test.color.push("block")
console.log(test.color) // [ 'red', 'green', 'blue', 'block' ]

const test1 = new SubType()
console.log(test1.color) // [ 'red', 'green', 'blue' ]
```

核心代码是`SuperType.call(this)`，创建子类实例时调用父类的`SuperType`构造函数，于是`SubType`的每一个实例都将是`SuperType`中的属性复制一份。

### 缺点

- 只能继承父类的属性和方法，不能继承原型的属性/方法
- 无法实现复用，每个子类都有父类实例函数的副本，影响性能

## 组合继承

组合原型链继承和构造函数继承的方式就是组合继承，用原型链实现对原型的属性和方法的继承，用构造函数技术实现实例属性的继承。

```js
function SuperType(name) {
    this.name = name
    this.color = ['red', 'green', 'blue']
}

SuperType.prototype.sayName = function () {
    console.log(this.name)
}

function SubType(name, age) {
    // 继承属性
    // 第二次调用SuperType
    SuperType.call(this, name)
    this.age = age
}

// 继承方法
// 构造原型
SubType.prototype = new SuperType()
// 重写SubType.prototype 的constructor属性，指向自己的构造函数
SubType.prototype.constructor = SubType
SubType.prototype.sayAge = function () {
    console.log(this.age)
}

const test1 = new SubType("bugdr", 27)
test1.color.push("block")
console.log(test1.color) // [ 'red', 'green', 'blue', 'block' ]
test1.sayName() // bugdr
test1.sayAge() // 27

const test2 = new SubType("bugdr1", 28)
console.log(test2.color) // [ 'red', 'green', 'blue' ]
test2.sayName() // bugdr1
test2.sayAge() // 28
```

### 缺点

- 第一次调用`SuperType()`：给`SuperType.prototype`写入两个属性`name，color`。
- 第二次调用`SuperType()`：给`test1`写入两个属性`name，color`。\

实例对象`test1`上的两个属性就是屏蔽了其原型对象`SubType.prototype`的同名两个属性，所以组合模式在使用子类创建实例对象时，其原型中会存在两份相同的属性/方法。

## 原型式继承

利用一个空对象作为媒介，将某个对象直接赋值给空对象构造函数的原型。

```js
function object(obj) {
    function F() {}
    F.prototype = obj
    return new F()
}

const person = {
    name: "bugdr",
    friends: ["Shelby", "Court", "Van"]
}
const anotherPerson = object(person)

anotherPerson.name = "bugdr1"
anotherPerson.friends.push("mo")

const yetAnotherPerson = new object(person)

yetAnotherPerson.name = "bugdr2"
yetAnotherPerson.friends.push("mo1")

console.log(person.friends) // [ 'Shelby', 'Court', 'Van', 'mo', 'mo1' ]
```

`object`对传入其中的对象执行一次浅复制，将构造函数F的原型直接指向传入的对象。

### 缺点

- 原型链继承多个实例的引用类型属性指向相同，存在篡改的可能
- 无法传递参数

另外`ES5`中存在`Object.create()`方法，能够代替上面的`object`方法。

## 寄生式继承

核心：在原型式基础上，增强对象，返回构造函数。

```js
function object(obj) {
    function F() {}
    F.prototype = obj
    return new F()
}

function createAnother(original) {
    const clone = object(original) // 通过调用 object() 函数创建一个新对象
    clone.sayHi = function () { // 以某种方式来增强对象
        console.log("hi")
    }
    return clone // 返回这个对象
}
```

函数的主要作用是为了构造函数新增的属性和方法，以增强函数。

```js
const person = {
    name: "bugdr",
    friends: ["Shelby", "Court", "Van"]
}

const anotherPerson = createAnother(person)
anotherPerson.sayHi() // hi
```

### 缺点

- 原型链继承多个实例的引用类型属性指向相同，存在篡改的肯=可能
- 无法传递参数

## 寄生组合式继承

结合借用构造函数传递参数和寄生模式实现继承

```js
function inheritPrototype(subType, superType) {
    const prototype = Object.create(superType.prototype) // 创建对象，创建父原型的一个副本
    prototype.constructor = subType
    subType.prototype = prototype
}

// 父类初始实例属性和原型属性
function SuperType(name) {
    this.name = name
    this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function () {
    console.log(this.name)
}

// 借用构造函数传递增强子类实例的属性
function SubType(name, age) {
    SuperType.call(this, name)
    this.age = age
}

// 将父类原型指向子类
inheritPrototype(SubType, SuperType)

// 新增子类的原有属性
SubType.prototype.sayAge = function () {
    console.log(this.age)
}

const test1 = new SubType("bugdr", 18)
const test2 = new SubType("bugdr1", 18)
test1.colors.push("2")
test1.colors.push("3")
console.log(test1.colors) // [ 'red', 'blue', 'green', '2', '3' ]
```

这个例子高效率的只调用了一次`SuperType`构造函数，并且避免了`SuperType.prototype`上创建的不必要，多余的属性，并且原型链还能保持不变，因此，还能正常使用`instanceof`和`isPrototypeOf()`方法。

## 混入方法继承多个对象

```js
function MyClass() {
    SuperClass.call(this)
    OtherSuperClass.call(this)
}

// 继承一个类
MyClass.prototype = Object.create(SuperClass.prototype)
// 混入其它
Object.assign(MyClass.prototype, OtherSuperClass.prototype)
// 重新指定constructor
MyClass.prototype.constructor = MyClass

MyClass.prototype.myMethod = function () {
    // code
}
```

`Object.assign`会把 `OtherSuperClass`原型上的函数拷贝到 `MyClass`原型上，使 `MyClass` 的所有实例都可用 `OtherSuperClass` 的方法。

## ES6类继承extends
 
`extends`关键字主要用于类声明或者类表达式中，以创建一个类，该类是另一个类的子类，其中`constructor`表示构造函数，一个类只能有一个构造函数，有多个会报出`SyntaxError`错误，如果没有显示指定构造方法，则会添加默认的`constructor`方法，使用例子如下

```js
class Rectangle {
    constructor(height, width) {
        this.height = height
        this.width = width
    }

    // get
    get area() {
        return this.calcArea()
    }

    // method
    calcArea() {
        return this.height * this.width
    }
}

const rectangle = new Rectangle(10, 6)
console.log(rectangle.area) // 60

// 实现继承
class Square extends Rectangle {
    constructor(length) {
        super(length, length)
        this.name = "Square"
    }

    get area() {
        return this.height * this.width
    }
}

const square = new Square(10)
console.log(square.area) // 100
```

`extends`继承的核心代码如下，其实现和上诉的寄生组合式继承方式不一样。

```js
function _inherits(subType, superType) {
    // 创建对象
    // 增强对象
    // 指定对象
    subType.prototype = Object.create(superType && superType.prototype, {
        constructor: {
            value: subType,
            enumerable: false,
            writable: true,
            configurable: true
        }
    })

    if (superType) {
        Object.setPrototypeOf ? Object.setPrototypeOf(subType, superType) : subType.__proto__ = subType
    }
}
```