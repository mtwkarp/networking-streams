const http = require('http')
const wsock = require('websocket-stream')
const through = require('through2')
const ecstatic = require('ecstatic')

const server = http.createServer(ecstatic(__dirname + '/public'))
server.listen(5001)

wsock.createServer({server}, function (stream) {
    //'stream' is a duplex stream
    stream.pipe(loud()).pipe(stream)
})

function loud() {
    return through(function(buf, enc, next) {
        next(null, buf.toString().toUpperCase())
    })
}