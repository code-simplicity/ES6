// 赋值
// let obj1 = {
//     name: "bugdr",
//     arr: [1, [2, 3]]
// }

// let obj2 = obj1
// obj2.name = "bugdr1"
// obj2.arr[1] = [4, 5, 6]
// console.log("obj1", obj1) // obj1 { name: 'bugdr1', arr: [ 1, [ 4, 5, 6 ] ] }
// console.log("obj2", obj2) // obj2 { name: 'bugdr1', arr: [ 1, [ 4, 5, 6 ] ] }

// // 浅拷贝
// let obj1 = {
//     name: "bugdr",
//     arr: [1, [2, 3]]
// }

// let obj2 = shallowClone(obj1)
// obj2.name = "bugdr1"
// obj2.arr[1] = [4, 5, 6]

// function shallowClone(source) {
//     let target = {};
//     for (let i in source) {
//         if (source.hasOwnProperty(i)) {
//             target[i] = source[i];
//         }
//     }
//     return target;
// }
// console.log("obj1", obj1) // obj1 { name: 'bugdr', arr: [ 1, [ 4, 5, 6 ] ] }
// console.log("obj2", obj2) // obj2 { name: 'bugdr1', arr: [ 1, [ 4, 5, 6 ] ] }

// 深拷贝
// let obj1 = {
//     name: "bugdr",
//     arr: [1, [2, 3]]
// }

// let obj2 = deepClone(obj1)
// obj2.name = "bugdr1"
// obj2.arr[1] = [4, 5, 6] // 新对象不共享内存

// function deepClone(obj) {
//     if (obj === null) return obj
//     if (obj instanceof Date) return new Date(obj)
//     if (obj instanceof RegExp) return new RegExp(obj)
//     if (typeof obj !== "object") return obj
//     let cloneObj = new obj.constructor()
//     for (let key in obj) {
//         if (obj.hasOwnProperty(key)) {
//             // 实现一个递归拷贝
//             cloneObj[key] = deepClone(obj[key])
//         }
//     }
//     return cloneObj
// }

// console.log("obj1", obj1) // obj1 { name: 'bugdr', arr: [ 1, [ 2, 3 ] ] }
// console.log("obj2", obj2) // obj2 { name: 'bugdr1', arr: [ 1, [ 4, 5, 6 ] ] }

// Object.assign()
// let obj1 = {
//     person: {
//         name: "bugdr",
//         age: 18
//     },
//     name: "block"
// }

// let obj2 = Object.assign({}, obj1)
// obj2.name = "block1"
// obj2.person.name = "bugdr1"
// console.log(obj1) // { person: { name: 'bugdr1', age: 18 }, name: 'block' }
// console.log(obj2) // { person: { name: 'bugdr1', age: 18 }, name: 'block1' }

// const _ = require("lodash")

// const obj1 = {
//     person: {
//         name: "bugdr",
//         age: 18
//     },
//     name: "block"
// }

// const obj2 = _.clone(obj1)
// console.log(obj1.person.age === obj2.person.age) // true

// 拓展运算符
// let obj1 = {
//     name: "bugdr",
//     address: {
//         x: 100,
//         y: 100
//     }
// }

// let obj2 = {
//     ...obj1
// }

// obj2.address.x = 200
// obj1.name = "bugdr1"
// console.log("obj1", obj1) // obj1 { name: 'bugdr1', address: { x: 200, y: 100 } }
// console.log("obj2", obj2) // obj2 { name: 'bugdr', address: { x: 200, y: 100 } }

// Array.prototype.concat()
// let arr1 = [1, 3, {
//     name: "bugdr"
// }]
// let arr2 = arr1.concat()
// arr2[2].name = "bugdr1"
// console.log(arr1) // [ 1, 3, { name: 'bugdr1' } ]
// console.log(arr2) // [ 1, 3, { name: 'bugdr1' } ]

// Array.prototype.slice()
// let arr1 = [1, 3, {
//     name: "bugdr"
// }]
// let arr2 = arr1.slice()
// arr2[2].name = "bugdr1"
// console.log(arr1) // [ 1, 3, { name: 'bugdr1' } ]
// console.log(arr2) // [ 1, 3, { name: 'bugdr1' } ]

/**
 * 深拷贝
 */
// JSON.parse(JSON.stringify())
// let arr1 = [1, 3, {
//     name: "bugdr"
// }]

// let arr2 = JSON.parse(JSON.stringify(arr1))
// arr2[2].name = "bugdr1"
// console.log(arr1) // [ 1, 3, { name: 'bugdr' } ]
// console.log(arr2) // [ 1, 3, { name: 'bugdr1' } ]

// let arr1 = [1, 3, {
//     name: 'bugdr'
// }, function () {}]

// let arr2 = JSON.parse(JSON.stringify(arr1))
// arr2[2].name = "bugdr1"
// console.log(arr1) // [ 1, 3, { name: 'bugdr' }, [Function (anonymous)] ]
// console.log(arr2) // [ 1, 3, { name: 'bugdr1' }, null ]
// let _ = require('lodash');
// let obj1 = {
//     a: 1,
//     b: {
//         f: {
//             g: 1
//         }
//     },
//     c: [1, 2, 3]
// };
// let obj2 = _.cloneDeep(obj1);
// console.log(obj1.b.f === obj2.b.f); // false

// jQuery.extend
// $.extend(deepCopy, target, object1, [objectN]) //第一个参数为true,就是深拷贝
// const $ = require("jquery")
// let obj1 = {
//     person: {
//         name: "bugdr",
//         age: 18
//     },
//     name: "block"
// }

// let obj2 = $.extend(true, {}, obj1)
// console.log(obj1.person.name === obj2.person.name) // false

// 深度拷贝
function deepClone(obj, hash = new WeakMap()) {
    if (obj === null) return obj
    if (obj instanceof Date) return new Date(obj)
    if (obj instanceof RegExp) return new RegExp(obj);
    // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
    if (typeof obj !== "object") return obj;
    // 是对象的话就要进行深拷贝
    if (hash.get(obj)) return hash.get(obj)
    let cloneObj = new obj.constructor()
    // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
    hash.set(obj, cloneObj)
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            // 实现递归拷贝
            cloneObj[key] = deepClone(obj[key], hash)
        }
    }
    return cloneObj
}

let obj1 = {
    person: {
        name: "bugdr",
        age: 18
    },
    name: "block"
}

obj1.o = obj1
let o = deepClone(obj1)
obj1.name = "bugdr1"
console.log(o)
/* <ref *1> {
    person: { name: 'bugdr', age: 18 },
    name: 'block',
    o: [Circular *1]
} */