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