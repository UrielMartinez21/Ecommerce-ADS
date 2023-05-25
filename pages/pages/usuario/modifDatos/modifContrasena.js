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
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  //--> Validar envio
  const [estiloPassword, setEstiloPassword] = useState('')
  const [estiloConfirmPass, setEstiloConfirmPass] = useState('')



  //-----------------------| Mensajes de advertencia |-----------------------
  const mostrarMensaje = (mensaje) => { msgs.current.show({ severity: 'error', detail: `${mensaje}`, sticky: true, closable: false }) };
  const limpiarMensaje = () => { msgs.current.clear() }

  //-----------------------| Envio |-----------------------
  const cambiarContrasena = () => {
      //--> Validar campos llenos
      if ([password, confirmPassword].includes('')) {
        if (!password) setEstiloPassword('p-invalid')
        if (!confirmPassword) setEstiloConfirmPass('p-invalid')
        mostrarMensaje(camposVacios)
        setTimeout(() => { limpiarMensaje() }, 3000)
        return
      } else {
        setEstiloPassword('')
        setEstiloConfirmPass('')
      }
      //--> Validar password
      if (password.length < 6) {
        setEstiloPassword('p-invalid')
        mostrarMensaje(passwordInvalido)
        setTimeout(() => { limpiarMensaje() }, 3000)
        return
      } else { setEstiloPassword('') 
      setEstiloConfirmPass('')
    }
  
      //--> Comprobar passwords iguales
      if (password !== confirmPassword) {
        setEstiloPassword('p-invalid')
        setEstiloConfirmPass('p-invalid')
        mostrarMensaje(passwordsInValidas)
        setTimeout(() => { limpiarMensaje() }, 3000)
        return
      } else {
        setEstiloPassword('')
        setEstiloConfirmPass('')
      }
  

    //--> Limpiar campos
    setPassword('')
    setEstiloConfirmPass('')

    //--> Notificar estatus despues de validarlo con back-end
 //   toast.current.show({ severity: 'success', summary: `${usuarioCreado.titulo}`, detail: `${usuarioCreado.contenido}`, life: 3000 });
 
  }

  const cancelarCambioContrasena = () => {
    //--> Limpiar campos de entrada antes de salir
    setEmail('')
    //--> Limpiar estilos de campos de entrada
    setEstiloEmail('')

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

            <div className="flex align-items-center flex-wrap">
              <Avatar label="O" size="xlarge" shape="circle" className="flex align-items-center justify-content-center m-2" />
              <p className="flex align-items-center justify-content-center m-2">Hola  <span className="underline">Omarcito</span></p>
            </div>
              
              <div className=''>
                <div className='field col-20 md:col-8'>
                 
                <label className="block text-900 text-xl font-medium mb-2">Ingrese su nueva contraseña</label>
                  <Password
                    placeholder='Mínimo 6 caracteres' className={`${estiloPassword} p-inputtext-lg`}
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    promptLabel="Crea tu contraseña" weakLabel="Debil" mediumLabel="Medio" strongLabel="Fuerte"
                  />
                   </div> 
                   </div>

                   <div className=''>
                <div className='field'>
                  <label className="block text-900 text-xl font-medium mb-2">Confirme su contraseña</label>
                  <Password
                    placeholder='Repita tu contraseña' className={`${estiloConfirmPass} p-inputtext-lg`}
                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} feedback={false}
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
