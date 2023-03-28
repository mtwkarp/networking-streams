const log = require('./duplexify.js')

const stream = log('logs')

let n = 0

let iv = setInterval(function () {
    stream.write(Date.now() + '\n')

    if(n++ === 5) clearInterval(iv)
}, 100)