// console.log('script start');

// setTimeout(function () {
//     console.log('setTimeout');
// }, 0);

// Promise.resolve().then(function () {
//     console.log('promise1');
// }).then(function () {
//     console.log('promise2');
// });
// console.log('script end');

// console.log('script start')

// async function async1() {
//     await async2()
//     console.log('async1 end')
// }
// async function async2() {
//     console.log('async2 end')
// }
// async1()

// setTimeout(function () {
//     console.log('setTimeout')
// }, 0)

// new Promise(resolve => {
//         console.log('Promise')
//         resolve()
//     })
//     .then(function () {
//         console.log('promise1')
//     })
//     .then(function () {
//         console.log('promise2')
//     })

// console.log('script end')
// console.log('start')
// setTimeout(() => {
//     console.log('timer1')
//     Promise.resolve().then(function () {
//         console.log('promise1')
//     })
// }, 0)
// setTimeout(() => {
//     console.log('timer2')
//     Promise.resolve().then(function () {
//         console.log('promise2')
//     })
// }, 0)
// const promise = new Promise((resolve, reject) => {
//     resolve()
// })
// promise.then(function () {
//     console.log('promise3')
// })
// console.log('end')

// console.log(1)
// setTimeout(function () {
//     console.log(2)
// }, 10);
// const intervalId = setInterval(function () {
//     console.log(3)
// }, 0)
// setTimeout(function () {
//     console.log(10)
//     new Promise(function (resolve) {
//             console.log(11)
//             resolve()
//         })
//         .then(function () {
//             console.log(12)
//         })
//         .then(function () {
//             console.log(13)
//             clearInterval(intervalId)
//         })
// }, 1);

// Promise.resolve()
//     .then(function () {
//         console.log(7)
//     })
//     .then(function () {
//         console.log(8)
//     })
// console.log(9)

// function app() {
//     setTimeout(() => {
//         console.log("1-1");
//         Promise.resolve().then(() => {
//             console.log("2-1");
//         });
//     });
//     console.log("1-2");
//     Promise.resolve().then(() => {
//         console.log("1-3");
//         setTimeout(() => {
//             console.log("3-1");
//         });
//     });
// }
// app();

// console.log(1)
// setTimeout(() => {
//     console.log(2)
//     Promise.resolve().then(() => {
//         console.log(3)
//     })
// });
// console.log(4)
// new Promise((resolve, reject) => {
//     console.log(5)
//     resolve()
// }).then(() => {
//     console.log(6)
//     setTimeout(() => {
//         console.log(7)
//     })
// })
// console.log(8)

// setTimeout(() => {
//     console.log(1)
// }, 0)
// console.log(2)
// const p = new Promise((resolve) => {
//     console.log(3)
//     resolve()
// }).then(() => {
//     console.log(4)
// }).then(() => {
//     console.log(5)
// }).then(() => {
//     console.log(7)
// }).then(() => {
//     console.log(8)
// }).then(() => {
//     console.log(9)
// }).then(() => {
//     console.log(10)
// })
// console.log(6)

async function async1() {
    console.log(1);
    await async2();
    console.log(2);
}
async function async2() {
    console.log(3);
}
console.log(4);
setTimeout(function () {
    console.log(5);
});
async1()
new Promise(function (resolve, reject) {
    console.log(6);
    resolve();
}).then(function () {
    console.log(7);
});
console.log(8);