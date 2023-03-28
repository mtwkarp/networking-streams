const websocket = require('websocket-stream')
const through = require('through2')
const stream = websocket('ws://' + location.host)
const html = require('yo-yo')
const root = document.body.appendChild(document.createElement('div'))

const output = []
update()

stream.pipe(through(function(buf, enc, next) {
    output.push(buf.toString())
    next()
    update()
}))
function update() {
    html.update(root, html`
        <div>
            <form onsubmit=${onsubmit}>
                <input type="text" name="msg">
            </form>
            <pre>${output.join('')}</pre>
        </div>
    `)

    function onsubmit(ev) {
        ev.preventDefault()
        stream.write(this.elements.msg.value + '\n')
        this.reset()
    }
}