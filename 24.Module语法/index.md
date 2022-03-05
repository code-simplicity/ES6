# Module语法

## 介绍

历史上，`JavaScript`一直没有模块`Module`体系，无法将一个大程序拆分成互相依赖的小文件，再用简单的方法拼接起来，其他语言都有这些功能，比如`Ruby`的`require`、`Python`的`import`，甚至就连 `CSS` 都有`@import`，但是 `JavaScript` 任何这方面的支持都没有，这对开发大型的、复杂的项目形成了巨大障碍。

在**ES6之前**，社区制定了一些模块加载方案，最主要的是`CommonJS`和`AMD`两种，前者用于服务器，后者用于浏览器，`ES6`在语言标准的层面上，实现了模块功能，而且实现相当简单，完全可以取代`CommonJS`和`AMD`规范，成为浏览器和服务器通用的模块解决方案。

`ES6`模块的设计思想是尽量的静态化，使得编译时就能确认模块的关系，以及输入输出的变量。`CommonJS`和 `AMD` 模块，都只能在运行时确定这些东西。比如，`CommonJS` 模块就是对象，输入时必须查找对象属性。

```js
// CommonJS模块
let {
    stat,
    exists,
    readfile
} = require("fs")

// 相当于
let _fs = require("fs")
let stat = _fs.stat
let exists = _fs.exists
let readfile = _fs.readfile
```

上面代码的实质是整体加载`fs`模块（即加载`fs`的所有方法），生成一个对象（`_fs`），然后再从这个对象上面读取 3 个方法。这种加载称为“运行时加载”，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”。

ES6 模块不是对象，而是通过export命令显式指定输出的代码，再通过import命令输入。 