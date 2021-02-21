import io from 'socket.io-client'

const Socket = io('http://localhost:4000/api', {
    path: "/my-custom-path/"
  })

export default Socket