const dgram = require('dgram')
const wait = require('waait')
const commandsDelay = require('./commandDelays')
const PORT = 8889
const HOST = '192.168.10.1'

const drone = dgram.createSocket('udp4')
drone.bind(PORT)

drone.on('message', (message) => {
  console.log(`Message ==> ${message}`)
})

function handleError (err) {
  if (err) console.log(`Error ==> ${err}`)
}

const commands = ['command', 'battery?', 'takeoff', 'land']

let i = 0
async function go () {
  const command = commands[i]
  const delay = commandsDelay[command]
  console.log(`running ==> ${command}`)
  drone.send(command, 0, command.length, PORT, HOST, handleError)
  await wait(delay)
  i += 1
  if (i < commands.length) {
    return go()
  }
}

go()
