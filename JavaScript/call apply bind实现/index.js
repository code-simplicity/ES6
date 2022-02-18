// const obj = {
//     value: "bugdr"
// }

// function fn() {
//     console.log(this.value)
// }

// fn.call(obj) //bugdr

// const obj = {
//     value: "bugdr",
//     fn: function () {
//         console.log(this.value)
//     }
// }

// function fn() {
//     console.log(this.value)
// }

// obj.fn() // bugdr

// obj.fn = fn;
// obj.fn(); // bugdr
// delete obj.fn;

Function.prototype.myCall = function (context) {
    if (typeof this !== "function") {
        throw new Error("Type error")
    }
    let args = [...arguments].slice(1)
    let result = null
    context = context || window
    context.fn = this
    result = context.fn(...args)
    console.log(context)
    delete context.fn
    return result
}

function fn() {
    console.log(this.value)
}

const obj = {
    value: "bugdr"
}

fn.myCall(obj) // bugdr