
var usuario = document.getElementById('usuario').value;
var contrasena = document.getElementById('contrasena').value;

function enviarDatos() {
  // Obtener valores de los campos
  var usuario = document.getElementById('usuario').value;
  var contrasena = document.getElementById('contrasena').value;

  // Validar si los campos están vacíos
  if (usuario.trim() === '' || contrasena.trim() === '') {
    alert('Por favor, completa todos los campos');
    return; // Detener la ejecución si los campos están vacíos
  }

  // Construir el objeto de datos
  var datos = {
    correo: usuario,
    clave: contrasena
  };

  // URL de la API (ajusta según tu configuración)
  var apiUrl = 'http://localhost:3000/api/enviar-datos';

  // Configurar la solicitud Fetch
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Respuesta de la API:', data);
    // Puedes realizar acciones adicionales con la respuesta de la API aquí
  })
  .catch(error => {
    console.error('Error al enviar datos a la API:', error);
    // Puedes manejar errores aquí
  });

  // setTimeout(() => {
  //   errorMessage.style.display = 'block';
  // }, 2000);
}

const passwordInput = document.getElementById('contrasena');

passwordInput.addEventListener('input', function() {
  // Oculta el mensaje de error cuando el usuario comienza a escribir
  errorMessage.style.display = 'none';
});