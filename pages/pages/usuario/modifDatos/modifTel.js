import React, { useState, useRef } from 'react'
import Link from 'next/link';
import Layout from "@/layout/layout"
//--> Componentes de primeReact
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import { Toast } from 'primereact/toast';
import { useRouter } from 'next/router';
import { InputText } from "primereact/inputtext";
import { Avatar } from 'primereact/avatar';
import { Dropdown } from 'primereact/dropdown';
import axios from 'axios';
import { modificarTel } from '@/components/mensajesNotificaciones/links';
//--> Componentes propios
import { camposVacios, contactoInvalido } from '@/components/mensajesNotificaciones/mensajes';

const ModificarTelefono = () => {
  //--> Variable de redireccinamiento
  const router = useRouter();

  //--> Mensajes y notificaciones
  const toast = useRef(null);
  const msgs = useRef(null);

  //-----------------------| Lista de variables |-----------------------
  //--> Campos de entrada

  const [phone, setPhone] = useState('')
  const [phoneL, setPhoneLadas] = useState(null);



  //--> Validar envio

  const [estiloPhone, setEstiloPhone] = useState('')
  const [estiloPhoneLadas, setEstiloPhoneLadas] = useState('')

  //-----------------------| Mensajes de advertencia |-----------------------
  const mostrarMensaje = (mensaje) => { msgs.current.show({ severity: 'error', detail: `${mensaje}`, sticky: true, closable: false }) };
  const limpiarMensaje = () => { msgs.current.clear() }

  //-----------------------| Envio |-----------------------
  const changePhone = async () => {
    //--> Validar campos llenos
    //--> Validar campos llenos
    if ([phone, phoneL].includes('')) {
      if (!phone) setEstiloPhone('p-invalid')
      if (!phoneL) setEstiloPhoneLadas('p-invalid')
      mostrarMensaje(camposVacios)
      setTimeout(() => { limpiarMensaje() }, 3000)
      return
    } else {
      setEstiloPhone('')
      setEstiloPhoneLadas('')
    }
    //--> Validar phone
    if (phone.length !== 10) {
      setEstiloPhone('p-invalid')
      mostrarMensaje(contactoInvalido)
      setTimeout(() => { limpiarMensaje() }, 3000)
      return
    } else {
      setEstiloPhone('')
    }

    if (/[a-zA-Z]/.test(phone)) {
      setEstiloPhone('p-invalid')
      mostrarMensaje(contactoInvalido)
      setTimeout(() => { limpiarMensaje() }, 3000)
      return
    } else {
      setEstiloPhone('')
    }

    //--> Preparar objeto para enviar
    const token = localStorage.getItem('token')
    const cabecera = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const objetoEnviar = {
      telefono: phone,

    }

    //--> Enviar peticion
    try {
      const respuesta = await axios.post(modificarTel, objetoEnviar, cabecera)
      if (respuesta.status === 200) {
        toast.current.show({ severity: 'success', summary: 'Éxito', detail: respuesta.data.msg, life: 3000 });
        setTimeout(() => {
          //--> Redireccionar
          router.push('/pages/usuario/miCuenta')
        }, 3000);
      }

    } catch (error) {
      if (toast.current) {
        toast.current.show({
          severity: 'info',
          summary: 'Información',
          detail: error.response.data.msg,
          life: 3000,
        });
      }
    }


    //--> Limpiar campos
    setPhone('')
    setPhoneLadas('')

    //--> Notificar estatus despues de validarlo con back-end
    //toast.current.show({ severity: 'success', summary: 'Cambio guardado exitosamente', detail: 'Revisa tu correo', life: 3000 });

  }

  const cancelChengePhone = () => {
    //--> Limpiar campos de entrada antes de salir
    setPhone('')
    //--> Limpiar estilos de campos de entrada
    setEstiloPhone('')

    //--> Redireccionar
    router.push('/pages/usuario/miCuenta')
  }

  return (
    <Layout title="Modificar Teléfono" description="Datos del usuario">

      <div className="grid">
        <div className="col-12">
          <div className="card">
            <h3  >Modificar mi número de teléfono</h3>
            <Toast ref={toast} />
            <div className=''>
              <div className='field'>
                <Link href="/pages/usuario/miCuenta" className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }} >
                  Regresar
                </Link>
              </div>
            </div>

            <div className='p-fluid grid'>


              <div className='field col-12 md:col-4'>

                <label className="block text-900 text-xl font-medium mb-4">Ingrese su número de teléfono:</label>
                <InputText placeholder='' className={`${estiloPhone} p-inputtext-lg`}
                  value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
            </div>

            <div className='mx-auto' style={{ width: "220px", textAlign: "center" }}>
              <Messages ref={msgs} />
            </div>

            <div className='flex justify-content-center'>
              <Button label="Guardar Cambios" className='mr-5' onClick={changePhone} severity="success" size="large" />
              <Button label="Cancelar" onClick={cancelChengePhone} severity="danger" size="large" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )

}

export default ModificarTelefono
