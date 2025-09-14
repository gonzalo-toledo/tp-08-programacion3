npm install
npm run dev
--------------------------------------------------------------------------------------------------------------------

CONSIGNA:
📝 Tarea: Crear un CRUD completo para la entidad “Usuarios”
🎯 Objetivo:
Crear una API REST utilizando Express para gestionar una lista de usuarios en memoria. Esta práctica refuerza el uso de rutas, métodos HTTP y manejo de datos con Express.

🧱 Requisitos funcionales:
GET /usuarios
  Devuelve el listado completo de usuarios.

GET /usuarios/:id
  Devuelve un usuario por su ID.
  Si no se encuentra, devolver un error 404.

POST /usuarios
  Recibe un nuevo usuario por req.body.
  El usuario debe tener al menos:
    nombre, email, edad.
  Asignar un id único automáticamente.
  Devolver el usuario creado.

PUT /usuarios/:id
  Actualiza los datos de un usuario existente.
  Validar que el usuario exista antes de modificarlo.
  Devolver el usuario actualizado.

DELETE /usuarios/:id
  Elimina un usuario por ID.
  Devolver mensaje de confirmación.


🧪 Extras (opcional)
Validar que el email no esté vacío ni repetido.
Devolver errores claros si faltan datos obligatorios.
Usar find() para actualizar y eliminar, sin findIndex.


📤 Entrega sugerida
Código funcionando en VSCode (no hace falta subirlo aún).
Probar todos los endpoints con Postman o Thunder Client.
Opcional: grabar un video corto explicando cómo funciona la API.
