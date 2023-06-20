import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link';
import Layout from "@/layout/layout"
//--> Componentes de primeReact
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import { useRouter } from 'next/router';
import { InputText } from "primereact/inputtext";
import { Avatar } from 'primereact/avatar';
import { Toast } from 'primereact/toast';

//--> Componentes propios
import { camposVacios, formatoNombre } from '@/components/mensajesNotificaciones/mensajes';
import axios from 'axios';
import { modificarNombre } from '@/components/mensajesNotificaciones/links';

const ModificarNombre = () => {
  //--> Variable de redireccinamiento
  const router = useRouter();

  //--> Mensajes y notificaciones
  const toast = useRef(null);
  const msgs = useRef(null);

  //-----------------------| Lista de variables |-----------------------
  const [nombre, setNombre] = useState('')
  const [apellidos, setApellido] = useState('')
  //--> Validar envio
  const [estiloNombre, setEstiloNombre] = useState('')
  const [estiloApellido, setEstiloApellido] = useState('')

  //-----------------------| Mensajes de advertencia |-----------------------
  const mostrarMensaje = (mensaje) => { msgs.current.show({ severity: 'error', detail: `${mensaje}`, sticky: true, closable: false }) };
  const limpiarMensaje = () => { msgs.current.clear() }

  // --> Leer localstorage
  useEffect(() => {
    const nombreCompleto = localStorage.getItem('nombre')
    setNombre(nombreCompleto.split(' ')[0])
    setApellido(nombreCompleto.split(' ')[1])
  }, [])

  //-----------------------| Envio |-----------------------
  const cambiarNombre = async () => {
    //--> Validar campos vacios
    if ([nombre, apellidos].includes('')) {
      if (!nombre) setEstiloNombre('p-invalid')
      if (!apellidos) setEstiloApellido('p-invalid')
      mostrarMensaje(camposVacios)
      setTimeout(() => { limpiarMensaje() }, 3000)
      return
    } else {
      setEstiloNombre('')
      setEstiloApellido('')
    }
    //--> Validar formato
    if (/^\d*$/.test(nombre, apellidos)) {
      setEstiloNombre('p-invalid')
      setEstiloApellido('p-invalid')
      mostrarMensaje(formatoNombre)
      setTimeout(() => { limpiarMensaje() }, 3000)
      return
    } else {
      setEstiloNombre('')
      setEstiloApellido('')
    }

    //--> Preparar objeto para enviar
    const token = localStorage.getItem('token')
    const cabecera = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const objetoEnviar = {
      nombre: nombre,
      apellido: apellidos
    }
    //--> Enviar peticion
    try {
      const respuesta = await axios.post(modificarNombre, objetoEnviar, cabecera)
      // console.log(respuesta)
      // console.log(`${nombre} ${apellidos}`)
      if (respuesta.status === 200) {
        localStorage.setItem('nombre', `${nombre} ${apellidos}`)
        toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Nombre modificado', life: 3000 });
        setTimeout(() => {
          //--> Redireccionar
          router.push('/pages/usuario/miCuenta')
        }, 3000);
      }
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudo modificar el nombre', life: 3000 });
    }
    //--> Limpiar campos
    setNombre('')
    setApellido('')
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
          <Toast ref={toast} />
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
