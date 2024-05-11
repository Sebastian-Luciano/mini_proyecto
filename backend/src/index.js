import http from 'node:http'
import { exportToFile, getUsuarios, importFromFile, index } from './controller.js'

const server = http.createServer(async (req, res) => {
  const origin = req.headers.origin

  // CORS
  const corsPermitidos = ['http://127.0.0.1:5500']

  if (corsPermitidos.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }

  const url = req.url
  const method = req.method

  if (method === 'GET') {
    switch (url) {
      case '/':
        index(res)
        break
      case '/api/usuarios':
        getUsuarios(res)
        break
      case '/api/usuarios/export':
        exportToFile(res)
        break
      case '/api/usuarios/import':
        importFromFile(res)
        break
      default:
        res.statusCode = 404
        res.end('No se encontró la ruta')
        break
    }
  }
})

server.listen(3000, () =>
  console.log('Servidor en ejecución en http://localhost:3000')
)
