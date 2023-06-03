import React, { useState, useRef } from 'react'
import Head from 'next/head';
import Link from 'next/link';
import Layout from "@/layout/layout"
//--> Componentes de primeReact
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import { useRouter } from 'next/router';
import { InputText } from "primereact/inputtext";
import { Avatar } from 'primereact/avatar';
import { Password } from 'primereact/password';

//--> Componentes propios
import { camposVacios, passwordInvalido, passwordsInValidas} from '@/components/mensajesNotificaciones/mensajes';

const ModificarContrasena = () => {
  //--> Variable de redireccinamiento
  const router = useRouter();

  //--> Mensajes y notificaciones
  const toast = useRef(null);
  const msgs = useRef(null);

  //-----------------------| Lista de variables |-----------------------
  //--> Campos de entrada
  const [pass, setPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  //--> Validar envio
  const [estiloPass, setEstiloPass] = useState('')
  const [estiloConfirmPass, setEstiloConfirmPass] = useState('')


  //-----------------------| Mensajes de advertencia |-----------------------
  const mostrarMensaje = (mensaje) => { msgs.current.show({ severity: 'error', detail: `${mensaje}`, sticky: true, closable: false }) };
  const limpiarMensaje = () => { msgs.current.clear() }

  //-----------------------| Envio |-----------------------
  const cambiarContrasena = () => {
      //--> Validar campos llenos
      if ([pass, confirmPass].includes('')) {
        if (!pass) setEstiloPass('p-invalid')
        if (!confirmPass) setEstiloConfirmPass('p-invalid')
        mostrarMensaje(camposVacios)
        setTimeout(() => { limpiarMensaje() }, 3000)
        return
      } else {
        setEstiloPass('')
        setEstiloConfirmPass('')
      }
      //--> Validar password
      if (pass.length < 6) {
        setEstiloPass('p-invalid')
        mostrarMensaje(passwordInvalido)
        setTimeout(() => { limpiarMensaje() }, 3000)
        return
      } else { setEstiloPass('') 
      setEstiloConfirmPass('')
    }
  
      //--> Comprobar passwords iguales
      if (pass !== confirmPass) {
        setEstiloPass('p-invalid')
        setEstiloConfirmPass('p-invalid')
        mostrarMensaje(passwordsInValidas)
        setTimeout(() => { limpiarMensaje() }, 3000)
        return
      } else {
        setEstiloPass('')
        setEstiloConfirmPass('')
      }
  

    //--> Limpiar campos
    setPass('')
    setEstiloConfirmPass('')
    setConfirmPass('')

    //--> Notificar estatus despues de validarlo con back-end
  // toast.current.show({ severity: 'success', summary: `${cambiarContrasena.titulo}`, detail: `${cambiarContrasena.contenido}`, life: 3000 });
 
  }

  const cancelarCambioContrasena = () => {
    //--> Limpiar campos de entrada antes de salir
    setPass('')
    //--> Limpiar estilos de campos de entrada
    setConfirmPass('')

    //--> Redireccionar
    router.push('/pages/usuario/miCuenta')
  }

  return (
    <Layout title="Modificar E-mail" description="Datos del usuario">
      
      <div className="grid">
        <div className="col-12">
          <div className="card">
            <h3>Modificar Contraseña</h3>

            <div className=''> 
            <div className='field col-20 md:col-8'> 
              <Link href="/pages/usuario/miCuenta" className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }} >
               Regresar
              </Link>
              </div>
              </div>
              
              <div className=''>
                <div className='field col-20 md:col-8'>
                 
                <label className="block text-900 text-xl font-medium mb-2">Ingrese su nueva contraseña</label>
                  <Password
                    placeholder='Mínimo 6 caracteres' className={`${estiloPass} p-inputtext-lg`}
                    value={pass} onChange={(e) => setPass(e.target.value)}
                    promptLabel="Crea tu contraseña" 
                  />
                   </div> 
                   </div>

                   <div className=''>
                <div className='field'>
                  <label className="block text-900 text-xl font-medium mb-2">Confirme su contraseña</label>
                 
                  <Password
                    placeholder='Repita su contraseña' className={`${estiloConfirmPass} p-inputtext-lg`}
                    value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} feedback={false}
                  />
                </div>
              </div>

                   <div className='mx-auto' style={{ width: "220px", textAlign: "center" }}>
                     <Messages ref={msgs} />
                     </div>
                     
                     <div className='flex justify-content-evenly my-4'>
                      <Button label="Guardar Cambios" onClick={cambiarContrasena} severity="success" size="large" />
                      <Button label="Cancelar" onClick={cancelarCambioContrasena} severity="danger" size="large" />
                      </div>
                      </div>
          </div>
        </div>
    </Layout>
  )




  
}

export default ModificarContrasena
