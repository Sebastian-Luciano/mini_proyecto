const respuesta = fetch('http://localhost:3000/api/usuarios')
    .then(res => res.json())
    .then(data => {
        // Obtener la referencia al cuerpo de la tabla
        const tablaUsuarios = document.getElementById('tabla-usuarios');

        // Iterar sobre los datos y crear una fila por cada objeto
        data.forEach(usuario => {
            const fila = document.createElement('tr');

            // Crear celdas y agregar los datos
            const celdaId = document.createElement('td');
            celdaId.textContent = usuario.usuario_id;
            fila.appendChild(celdaId);

            const celdaNombre = document.createElement('td');
            celdaNombre.textContent = usuario.nombres;
            fila.appendChild(celdaNombre);

            const celdaApellido = document.createElement('td');
            celdaApellido.textContent = usuario.apellidos;
            fila.appendChild(celdaApellido);

            const celdaDireccion = document.createElement('td');
            celdaDireccion.textContent = usuario.direccion;
            fila.appendChild(celdaDireccion);

            const celdaCorreo = document.createElement('td');
            celdaCorreo.textContent = usuario.correo;
            fila.appendChild(celdaCorreo);

            const celdaDNI = document.createElement('td');
            celdaDNI.textContent = usuario.dni;
            fila.appendChild(celdaDNI);

            const celdaEdad = document.createElement('td');
            celdaEdad.textContent = usuario.edad;
            fila.appendChild(celdaEdad);

            const celdaFechaCreacion = document.createElement('td');
            celdaFechaCreacion.textContent = usuario.fecha_creacion;
            fila.appendChild(celdaFechaCreacion);

            const celdaFechaTelefono = document.createElement('td');
            celdaFechaTelefono.textContent = usuario.telefono;
            fila.appendChild(celdaFechaTelefono);

            // Agrega más celdas según tus datos

            // Agregar la fila a la tabla
            tablaUsuarios.appendChild(fila);
        });
    })
    .catch(error => console.error('Error al obtener los datos:', error));