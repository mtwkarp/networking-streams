const net = require('net')
const rpc = require('rpc-stream')

net.createServer(function(stream) {
    stream.pipe(rpc({
        hello: function(name, cb) {
            cb(null, 'howdy' + name)
        }
    })).pipe(stream)
}).listen(5001)