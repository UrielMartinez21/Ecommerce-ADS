import React, { useState, useRef } from 'react'
import Head from 'next/head';
import AppConfig from '@/layout/AppConfig';
import axios from 'axios';
//--> Componentes de primeReact
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Messages } from 'primereact/messages';
import { useRouter } from 'next/router';
import { InputText } from "primereact/inputtext";

//-->Imagenes 
import Image from 'next/image';
import loto from '../../../imagenes/login/principal2.png';


import back from '../../../public/images/background.gif';
//--> Componentes propios
import { camposVacios, emailInvalido, passwordInvalido, passwordsInValidas } from '@/components/mensajesNotificaciones/mensajes';
import { errorCrearUsuario, usuarioCreado } from '@/components/mensajesNotificaciones/notificaciones';
import { nuevoUsuario } from '@/components/mensajesNotificaciones/links';


const CrearCuenta = () => {
  //--> Variable de redireccinamiento
  const router = useRouter();

  //--> Mensajes y notificaciones
  const toast = useRef(null);
  const msgs = useRef(null);

  //-----------------------| Lista de variables |-----------------------
  //--> Campos de entrada
  const [email, setEmail] = useState('')
  const [nombre, setNombre] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  //--> Validar envio
  const [estiloEmail, setEstiloEmail] = useState('')
  const [estiloNombre, setEstiloNombre] = useState('')
  const [estiloPassword, setEstiloPassword] = useState('')
  const [estiloConfirmPass, setEstiloConfirmPass] = useState('')

  //-----------------------| Expresion regular |-----------------------
  const validarEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/

  //-----------------------| Mensajes de advertencia |-----------------------
  const mostrarMensaje = (mensaje) => { msgs.current.show({ severity: 'error', detail: `${mensaje}`, sticky: true, closable: false }) };
  const limpiarMensaje = () => { msgs.current.clear() }

  //-----------------------| Envio |-----------------------
  const crearUsuario = async () => {
    //--> Validar campos llenos
    if ([email, nombre, password, confirmPassword].includes('')) {
      if (!email) setEstiloEmail('p-invalid')
      if (!nombre) setEstiloNombre('p-invalid')
      if (!password) setEstiloPassword('p-invalid')
      if (!confirmPassword) setEstiloConfirmPass('p-invalid')
      mostrarMensaje(camposVacios)
      setTimeout(() => { limpiarMensaje() }, 3000)
      return
    } else {
      setEstiloEmail('')
      setEstiloNombre('')
      setEstiloPassword('')
      setEstiloConfirmPass('')
    }

    //--> Validar email
    if (!validarEmail.test(email)) {
      setEstiloEmail('p-invalid')
      mostrarMensaje(emailInvalido)
      setTimeout(() => { limpiarMensaje() }, 3000)
      return
    } else { setEstiloEmail('') }

    //--> Validar password
    if (password.length < 6) {
      setEstiloPassword('p-invalid')
      mostrarMensaje(passwordInvalido)
      setTimeout(() => { limpiarMensaje() }, 3000)
      return
    } else { setEstiloPassword('') }

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

    try {
      const objetoCrearUsuario = { nombreCliente: nombre, emailCliente: email, passwordCliente: password }
      await axios.post(nuevoUsuario, objetoCrearUsuario)
      //--> Limpiar campos
      setEmail('')
      setNombre('')
      setPassword('')
      setEstiloConfirmPass('')
      //--> Notificar estatus despues de validarlo con back-end
      toast.current.show({ severity: 'success', summary: `${usuarioCreado.titulo}`, detail: `${usuarioCreado.contenido}`, life: 3000 });
      setTimeout(() => { router.push('/pages/pantallainicio/token') }, 1000);
    } catch (error) {
      toast.current.show({ severity: 'success', summary: `${errorCrearUsuario.titulo}`, detail: `${errorCrearUsuario.contenido}`, life: 3000 });
    }

  }

  const cancelarCreacion = () => {
    //--> Limpiar campos de entrada antes de salir
    setNombre('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')

    //--> Limpiar estilos de campos de entrada
    setEstiloEmail('')
    setEstiloNombre('')
    setEstiloPassword('')
    setEstiloConfirmPass('')

    //--> Redireccionar
    router.push('/')


  }

  return (
    <>

      <Head>
        <title>Jardin del Eden - Crear usuario</title>
        <meta charSet="UTF-8" />
        <meta name="description" content="El usuario podra darse de alta en el sistema" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta property="og:type" content="website"></meta>
        <meta property="og:title" content="Sakai by PrimeReact | Free Admin Template for NextJS"></meta>
        <meta property="og:url" content="https://www.primefaces.org/sakai-react"></meta>
        <meta property="og:description" content="The ultimate collection of design-agnostic, flexible and accessible React UI Components." />
        <meta property="og:image" content="https://www.primefaces.org/static/social/sakai-nextjs.png"></meta>
        <meta property="og:ttl" content="604800"></meta>
        <link rel="icon" href={`/favicon.ico`} type="image/x-icon"></link>
      </Head>
      <Image src={back} priority={true} className="z-0" style={{ width: '100vw', height: '100vh', filter: 'blur(1px)', position: 'absolute' }} alt="Mi imagen" />
      <div className='flex h-screen  overflow-auto '>

        <Toast ref={toast} />

        <div className="z-1">
          <div className={`scalein animation-duration-1000  xl:col-6 md:col-7 sm:col-offset-6 m-auto`}>
            <div className='card  shadow-5'>

              <Image src={loto} priority={true} style={{ width: '18%', height: '13%', marginLeft: '40%' }} alt="Mi imagen" />
              <h1 className={`font-bold text-center`}>Crear cuenta</h1>



              <div className="card-container mx-auto text-center ">
                <div className='field'>
                  <label htmlFor="nombreCompleto" className="block text-900  ">Tu nombre</label>
                  <InputText
                    id="nombreCompleto" placeholder="Nombre y apellidos"
                    className={`${estiloNombre} w-full p-3 md:w-25rem `}
                    value={nombre} onChange={(e) => { setNombre(e.target.value) }} />
                </div>
                <div className='field'>
                  <label htmlFor="email" className="block text-900 ">Correo electrónico</label>
                  <InputText
                    id="email" placeholder="Correo activo" className={`${estiloEmail} w-full p-3 md:w-25rem`}
                    value={email} onChange={(e) => { setEmail(e.target.value) }} />
                </div>

                <div className='field'>
                  <label className="block text-900 ">Contraseña</label>
                  <Password
                    id="password" placeholder='Mínimo 6 caracteres' inputClassName={`w-full p-3 md:w-25rem`} className={`${estiloPassword}`}
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    promptLabel="Crea tu contraseña" weakLabel="Debil" mediumLabel="Medio" strongLabel="Fuerte"
                  />
                </div>
                <div className='field'>
                  <label className="block text-900 ">Confirmar contraseña</label>
                  <Password
                    id="cpassword" placeholder='Repite tu contraseña' inputClassName={`w-full p-3 md:w-25rem`} className={`${estiloConfirmPass} `}
                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} feedback={false}
                  />
                </div>

                <div className='mx-auto' style={{ width: "200px", textAlign: "center" }}>
                  <Messages ref={msgs} />
                </div>

                <div className='flex justify-content-center mb-2'>
                  <Button label="Aceptar" className='mr-2 w-full p-3 md:w-13rem' onClick={crearUsuario} severity="success" size="large" />
                  <Button label="Cancelar" className='mr-2 w-full p-3 md:w-13rem' onClick={cancelarCreacion} severity="danger" size="large" />

                </div>
              </div>

              <div className='flex justify-content-center'>
                <p className='mt-3'>¿Ya tienes una cuenta?</p>
                <Button label="Iniciar Sesión" className='mx-2' link onClick={cancelarCreacion}
                  icon="pi pi-angle-right" iconPos="right" />
              </div>

            </div>

          </div>

        </div>

        <div>

          <AppConfig />
        </div>

      </div>


    </>
  )

}

export default CrearCuenta
