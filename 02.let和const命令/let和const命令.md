# let和const命令

## let命令

### 基本用法

ES6新添加了`let`命令，用于声明变量，类似于`var`，但是所声明的变量只在`let`命令所在的代码块中有用，所有说`let`有块级作用域。

```javascript
 {
    let a = 10;
    var b = 1;
}
console.log(`b`, b) // b 1
console.log(`a`, a) // Uncaught ReferenceError: a is not defined
```

在上面的代码块中，分别用`let`和`var`声明了两个变量，然后从外部调用这个代码块，我们在控制台查看到出现所注释的内容，结果`let`声明的变量报错，`var`声明的变量返回1，这表明`let`只在代码块中使用是有效的，存在块级作用域。

`for`循环的计数器，就很合适使用`let`命令。

```javascript
for (let i = 0; i < 10; i++) {
            // ...
}
console.log(`i`, i) //ReferenceError: i is not defined 
```

上面代码中，计数器声明的变量`i`只能是在`for`循环中使用有效，在外部引用就会报错。

```javascript
for(var i = 0; i < 10; i++) {
    // ...
}
console.log(`i`, i) //i 10
```

上面代码块中使用`var`声明的变量则会打印输出10，。

```javascript
var a = [];
for (var i = 0; i < 10; i++) {
    a[i] = function () {
        console.log(i);
    }
}
a[5]() // 10
```

在上面代码中如果使用`var`声明变量，那么就会最后输出`10`,因为在`for`循环中声明变量`i`，在全局范围内有效，所以全局只有一个变量`i`，该值会发生改变，而循环内被赋给数组`a`的函数内部的`console.log(i)`，**里面的`i`指向的就是全局的`i`**。也就是说，所有数组`a`的成员里面的`i`，指向的都是同一个`i`，导致运行时输出的是最后一轮的`i`的值，也就是 10。

如果使用`let`声明变量，仅是在块级作用域有效，最后`a[5]`的值是`5`。就不会存在使用`var`出现的问题。

```javascript
var a = [];
for (let i = 0; i < 10; i++) {
    a[i] = function () {
        console.log(i);
    }
}
a[5]() // 5
```

上面代码中，`i`是`let`声明的，**当且仅当`i`只在本轮循环有效，所以每一次循环`i`都是一个新的变量**，所以最后输出的值是`5`，`JavaScript`会记录住上一次循环的值，初始化`i`的时候会在原来的基础上进行运算。另外`for`循环还有一个特别之处就是设置环境变量的部分是父级作用域，二循环体内部是一个单独的子作用域。

```javascript
for(let i = 0; i < 3; i++) {
    let i = "abc"
    console.log(`i`, i)
}
//abc
//abc
//abc
```

上面的代码块输出的是3个`abc`,原因是循环体中的`i`与循环体内部的`i`不是一个作用域，有各自的作用域。

### 不存在变量提升

`var`命令会发生“变量提升”现象，即变量可以在声明之前使用，值为`undefined`，这种现象多多少少是有些奇怪的，按照一般的逻辑，变量应该在声明语句之后才可以被使用，为了纠正这种现象，`let`命令改变了语法行为，它所声明的变量一定要在声明后使用，否则报错。

```javascript
// var的情况
console.log(foo) //undefined
var foo = 2

// let的情况
console.log(foo) // ReferenceError: Cannot access 'foo' before initialization
let foo = 2
```