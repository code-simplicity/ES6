// function Person() {

// }

// const person = new Person()
// person.name = "bugdr"
// console.log(person.name)
// function Person() {

// }
// const person = new Person()
// console.log(person.__proto__ === Person.prototype) // true

// function Person() {

// }
// const person = new Person()
// console.log(person.__proto__ === Person.prototype) // true
// console.log(Person === Person.prototype.constructor) // true
// console.log(Object.getPrototypeOf(person) === Person.prototype) // true

// function Person() {

// }

// Person.prototype.name = "bugdr"

// const person = new Person()

// person.name = "www"

// console.log(person.name) // www

// delete person.name

// console.log(person.name) // bugdr

// function Person() {

// }

// Person.prototype.name = "bugdr"

// const person = new Person()

// person.name = "www"

// console.log(person.name) // www

// delete person.name

// const obj = new Object()
// obj.name = "bugdr"
// console.log(obj.name)

// console.log(person.name) // bugdr

// function Person() {

// }
// const person = new Person()
// console.log(person.constructor === Person) // true

// console.log(person.constructor === Person.prototype.constructor) // true

setTimeout(function () {
    console.log("1");
}, 0);
console.log("2")

setTimeout(() => {
    console.log("3")
}, 10)

setTimeout(() => {
    console.log("7")
}, 10)

const promise = new Promise((resolve) => {
    console.log("4")
    resolve("5")
})

promise.then((data) => {
    console.log("6")
    console.log(data)
})