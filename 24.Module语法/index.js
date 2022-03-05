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