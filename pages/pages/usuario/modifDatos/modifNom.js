import React, { useState, useRef } from 'react'
import Link from 'next/link';
import Layout from "@/layout/layout"
//--> Componentes de primeReact
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import { useRouter } from 'next/router';
import { InputText } from "primereact/inputtext";
import { Avatar } from 'primereact/avatar';

//--> Componentes propios
import { camposVacios, formatoNombre} from '@/components/mensajesNotificaciones/mensajes';

const ModificarNombre = () => {
  //--> Variable de redireccinamiento
  const router = useRouter();

  //--> Mensajes y notificaciones
  const toast = useRef(null);
  const msgs = useRef(null);

  //-----------------------| Lista de variables |-----------------------
  //--> Campos de entrada

  //--> Campos de entrada
 
  const [nombre, setNombre] = useState('')
  const [apellidos, setApellido] = useState('')

  //--> Validar envio

  const [estiloNombre, setEstiloNombre] = useState('')
  const [estiloApellido, setEstiloApellido] = useState('')

  //-----------------------| Mensajes de advertencia |-----------------------
  const mostrarMensaje = (mensaje) => { msgs.current.show({ severity: 'error', detail: `${mensaje}`, sticky: true, closable: false }) };
  const limpiarMensaje = () => { msgs.current.clear() }

  //-----------------------| Envio |-----------------------
  const cambiarNombre = () => {
    
    if ([ nombre, apellidos].includes('')) {
        if (!nombre) setEstiloNombre('p-invalid')
        if (!apellidos) setEstiloApellido('p-invalid')
        mostrarMensaje(camposVacios)
        setTimeout(() => { limpiarMensaje() }, 3000)
        return
      } else {
        setEstiloNombre('')
        setEstiloApellido('')
      }
  
      if (/[a-zA-Z]/.test(nombre, apellidos)) {
        setEstiloNombre('p-invalid')
        setEstiloApellido('p-invalid')
        mostrarMensaje(formatoNombre)
        setTimeout(() => { limpiarMensaje() }, 3000)
        return
      } else {
        setEstiloNombre('')
        setEstiloApellido('')
      }
  
      

    //--> Limpiar campos
    setNombre('')
    setApellido('')
    //--> Notificar estatus despues de validarlo con back-end
    //toast.current.show({ severity: 'success', summary: `${cambiarNombre.titulo}`, detail: `${cambiarNombre.contenido}`, life: 3000 });
 
  }

  const cancelarCambioNombre = () => {
    
     setNombre('')
     setApellido('')

    //--> Redireccionar
    router.push('/pages/usuario/miCuenta')
  }

  return (
    <Layout title="Modificar E-mail" description="Datos del usuario">
      
      <div className="grid">
        <div className="col-12">
          <div className="card">
            <h3>Modificar Nombre</h3>

            <div className=''> 
            <div className='field'> 
              <Link href="/pages/usuario/miCuenta" className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }} >
               Regresar
              </Link>
              </div>
              </div>

              
              <div className=''>
                <div className='field'>
                  <label htmlFor="nombreCompleto" className="block text-900 text-xl font-medium mb-2">Nombre</label>
                  <InputText
                    id="nombreCompleto" placeholder="Nombre"
                    className={`${estiloNombre} p-inputtext-lg`}
                    value={nombre} onChange={(e) => { setNombre(e.target.value) }} />
                </div>
              </div>

              <div className=''>
                <div className='field'>
                  <label htmlFor="apellidos" className="block text-900 text-xl font-medium mb-2">Apellidos</label>
                  <InputText
                    id="apellidos" placeholder="Apellido(s)"
                    className={`${estiloApellido} p-inputtext-lg`}
                    value={apellidos} onChange={(e) => { setApellido(e.target.value) }} />
                </div>
              </div>

                   <div className='mx-auto' style={{ width: "220px", textAlign: "center" }}>
                     <Messages ref={msgs} />
                     </div>
                     
                     <div className='flex justify-content-evenly my-4'>
                      <Button label="Guardar Cambios" onClick={cambiarNombre} severity="success" size="large" />
                      <Button label="Cancelar" onClick={cancelarCambioNombre} severity="danger" size="large" />
                      </div>
                      </div>
          </div>
        </div>
    </Layout>
  )




  
}

export default ModificarNombre
