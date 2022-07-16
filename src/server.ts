import { Server } from 'socket.io'
import http from 'http'

const server = http.createServer()

const io = new Server(server)

io.on('connection', (socket) => {
  console.log('user connected')
  console.log(socket)
})

server.listen(4000, () => {
  console.log('listening on 4000')
})
