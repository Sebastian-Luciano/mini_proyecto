import { pool } from './db.js'
import fs from 'node:fs/promises'
import path from 'node:path'

export async function index (res) {
  try {
    // Leer el contenido del archivo 'index.html' de la carpeta 'public'
    const ruta = await fs.readFile('./public/index.html', 'utf-8')
    // Configurar el encabezado de la respuesta HTTP con el código 200 (OK) y el tipo de contenido 'text/html'
    res.writeHead(200, { 'Content-Type': 'text/html' })

    // Enviar el contenido del archivo 'index.html' como respuesta
    res.end(ruta)
  } catch (err) {
    res.statusCode = 500
    res.end('Error al leer el archivo index.html')
  }
}

export async function getUsuarios (res) {
  try {
    // Ejecuta la consulta SQL para obtener todos los usuarios
    const resultado = await pool.query('SELECT * FROM usuarios')
    // Accede al primer elemento del resultado, que contiene los datos de los usuarios
    const data = resultado[0]
    // Convierte los datos de los usuarios a una cadena JSON
    const dataString = JSON.stringify(data)
    // Configura el encabezado de la respuesta HTTP como JSON
    res.writeHead(200, { 'Content-Type': 'application/json' })
    // Envía los datos de los usuarios como respuesta HTTP
    res.end(dataString)
  } catch (error) {
    // Captura cualquier error que pueda ocurrir durante la ejecución del código
    console.error('Error al obtener los usuarios:', error)

    // Envía una respuesta HTTP con un código de error y un mensaje
    res.writeHead(500, { 'Content-Type': 'text/plain' })
    res.end('Error al obtener los usuarios')
  }
}

export async function exportToFile (res) {
  try {
    // Obtener los datos de los usuarios desde la base de datos
    const [rows] = await pool.query('SELECT usuario_id, nombres, apellidos, direccion, correo, dni, edad, DATE_FORMAT(fecha_creacion, "%Y-%m-%d") AS fecha_creacion, telefono FROM usuarios')

    // Construir el encabezado y las filas del archivo CSV
    const csvRows = [
      ['id', 'nombres', 'apellidos', 'direccion', 'correo', 'dni', 'edad', 'fecha_creacion', 'telefono'].join(','), // Encabezado
      ...rows.map(row => [row.usuario_id, row.nombres, row.apellidos, row.direccion, row.correo, row.dni, row.edad, row.fecha_creacion, row.telefono].join(',')) // Filas de datos
    ]
    const csvContent = csvRows.join('\n')

    // Guardar los datos en un archivo
    await fs.writeFile('usuarios.csv', csvContent)

    // Configurar el encabezado de respuesta para indicar que es un archivo CSV
    res.setHeader('Content-Type', 'text/csv')
    res.setHeader('Content-Disposition', 'attachment; filename="usuarios.csv"')

    // Enviar el contenido del archivo CSV como respuesta
    res.statusCode = 200
    res.end(csvContent)
  } catch (err) {
    console.error('Error al exportar el archivo CSV:', err)
    res.statusCode = 500
    res.end('Error al exportar el archivo CSV')
  }
}

export async function importFromFile (res) {
  try {
    // Obtiene la ruta absoluta al archivo 'usuarios.csv'
    const ruta = path.resolve('./usuarios.csv')
    // Lee el contenido del archivo como texto
    const contenido = await fs.readFile(ruta, 'utf-8')
    // Divide el contenido por líneas nuevas
    const filas = contenido.split('\n')
    // Filtra las filas vacías
    const filasFiltradas = filas.filter(fila => fila !== '')
    // Elimina la primera fila (encabezados de columna)
    filasFiltradas.shift()
    // Recorre cada fila filtrada
    filasFiltradas.forEach(async fila => {
      const columnas = fila.split(',')
      const correo = columnas[4]
      const edad = parseInt(columnas[6])
      const telefono = columnas[8]

      // validacion de correo con @
      if (!correo.includes('@')) {
        console.log('No se un correo valido')
        return
      }

      // Validacion de edad (mayor a 0) y numero
      if (isNaN(edad) || edad <= 0) {
        console.log('No es una edad válida')
        return
      }

      // validacion de telefono ( solo numero y guiones)
      const telefonoRegex = /^[\d-]+$/
      if (!telefonoRegex.test(telefono)) {
        console.log('No es un número de telefono valido')
        return
      }

      try {
        // Inserta los datos en la tabla 'usuarios'
        await pool.execute('INSERT INTO usuarios(usuario_id, nombres, apellidos, direccion, correo, dni, edad, fecha_creacion, telefono) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?', columnas)
      } catch (error) {
        console.log('No se insertó la fila: ', columnas[0])
      }
    })
    // Configura el encabezado de la respuesta HTTP como JSON
    res.writeHead(200, { 'Content-Type': 'application/json' })
    // Crea un objeto de mensaje y lo convierte a JSON
    const resString = JSON.stringify({ message: 'Filas insertadas' })

    // Envía la respuesta HTTP
    res.end(resString)
  } catch (error) {
    // Captura cualquier error que pueda ocurrir durante la ejecución del código
    console.error('Error al procesar el archivo:', error)

    // Envía una respuesta HTTP con un código de error y un mensaje
    res.writeHead(500, { 'Content-Type': 'text/plain' })
    res.end('Error al procesar el archivo')
  }
}
