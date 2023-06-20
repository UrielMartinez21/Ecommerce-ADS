//--> Crear usuario
export const nuevoUsuario = "http://localhost:4000/api/cliente"
export const validarToken = "http://localhost:4000/api/cliente/confirmar/"

//--> Iniciar sesion
export const iniciarSesion = "http://localhost:4000/api/cliente/iniSes"

//--> Resetear password
export const resetearPassword = "http://localhost:4000/api/cliente/olvide-password"
export const tokenResetearPassword = "http://localhost:4000/api/cliente/olvide-password/"
export const cambiarPassword = "http://localhost:4000/api/cliente/olvide-password/"

// --> Catalogo flores
export const mostrarFlores = "http://localhost:4000/api/productos/mostrarFlores"

// --> Catalogo peluches
export const mostrarPeluches = "http://localhost:4000/api/productos/mostrarPeluches"


//----DATOS USUARIO-------
// --> Cambiar nombre
export const modificarNombre = "http://localhost:4000/api/cliente/modificar/username"
//->Modificar contraseña
export const ModificarContrasena = "http://localhost:4000/api/cliente/modificar/password"
//->Modificar Telefono
export const modificarTel = "http://localhost:4000/api/cliente/modificar/telefono"
//->AgregarTarjeta
export const saveTarjeta = "http://localhost:4000/api/cliente/modificar/tarjeta"
//->AgregarDirección
export const saveDir = "http://localhost:4000/api/cliente/modificar/direccion"



//---CARRITO DE COMPRAS-----
//-> Agregar Producto
export const agregarProducto = "http://localhost:4000/api/cliente/carrito/agregarProducto"
//-> Incrementar Producto
export const incrementarProducto = "http://localhost:4000/api/cliente/carrito/incrementarProducto"
//-> Decrementar Producto
export const decrementarProducto = "http://localhost:4000/api/cliente/carrito/decrementarProducto"
//-> Eliminar Producto
export const eliminarProducto = "http://localhost:4000/api/cliente/carrito/eliminarProducto"
//-> Vaciar Carrito
export const vaciarCarrito = "http://localhost:4000/api/cliente/carrito/vaciarCarrito"
//--> Visualizar Carrito
export const visualizarCarrito = "http://localhost:4000/api/cliente/carrito/visualizarCarrito"
//-->Agregar a favorito
export const agregarFavorito = "http://localhost:4000/api/cliente/interaccionPro/agregarFavoritos"


//-->Funciones consulta
export const consultarTarjeta = "http://localhost:4000/api/cliente/interaccionPed/verTarjetas"
export const consultarDir = "http://localhost:4000/api/cliente/interaccionPed/verDirecciones"

//--> Personalizar producto
export const verFloresBack = "http://localhost:4000/api/cliente/interaccionPro/verFlores"
export const verPeluchesBack = "http://localhost:4000/api/cliente/interaccionPro/verPeluches"