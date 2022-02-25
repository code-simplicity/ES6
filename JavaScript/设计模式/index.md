# 设计模式

## 策略模式

要实现某一功能，有很多种方案可以选择，我们定义`策略模式`，把它们一个一个封装起来，并且使用它们可以相互装换。

首先就是来实现一个**权限逻辑**的判断题。

我们使用`策略模式`来实现一个用户查看掘金文章的权限设计。

```js
// 权限维护列表
const jobList = ["FE", "BE"]

// 策略
const strategies = {
    checkRole: function (value) {
        return value === "juejin"
    },
    checkGrade: function (value) {
        return value >= 1
    },
    checkJob: function (value) {
        return jobList.indexOf(value) > 1
    },
    checkEatType: function (value) {
        return value === "eat melons"
    }
}
```

上面代码就是表示的是策略，接下来需要去验证了。

```js
// 验证规则
const Vaildator = function () {
    this.cache = []

    // 添加事件策略
    this.add = function (value, method) {
        this.cache.push(function () {
            return strategies[method](value)
        })
    }

    // 检查
    this.check = function () {
        for (let i = 0; i < this.cache.length; i++) {
            let vailFn = this.cache[i]
            let data = vailFn()
            // 开始检查
            if (!data) {
                return false
            }
            return true
        }
    }
}
```

这个时候，我们需要去进行这样的验证，二验证条件为：

- 掘金用户
- 掘金等级大于1

那么这个代码就可以这样写。

```js
const compose1 = function () {
    const vaildator = new Vaildator()
    const data1 = {
        role: "juejin",
        grade: 3
    }
    vaildator.add(data1.role, "checkRole")
    vaildator.add(data1.grade, "checkGrade")
    const result = vaildator.check()
    return result
}
console.log(compose1()) // true
```

之后打上`log`查看输出结果，如果满足上诉`role === juejin && grade >= 1`，那么就会输出`true`，否则就是输出`false`。

策略模式可以作为权限判断，表单验证等代码的优化。

