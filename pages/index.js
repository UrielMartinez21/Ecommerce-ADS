import React, { useContext, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import AppConfig from '@/layout/AppConfig';

import axios from 'axios';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { LayoutContext } from '@/layout/context/layoutcontext';

import * as components from './components';
import Image from 'next/image';
import myImage from '../imagenes/login/loto.jpg';
import myImage1 from '../imagenes/login/flower1.jpeg';
import loto from '../imagenes/login/principal1.png';
import styles from '../styles/styles.module.css';
import { logueado, restablecerPass } from '@/components/mensajesNotificaciones/notificaciones';



export default function Home() {
  //--> Uso de contexto
  const { layoutConfig } = useContext(LayoutContext);

  //--> Mensajes y notificaciones
  const toast = useRef(null);

  //----------------| Lista de variables |----------------
  const [signIn, toggle] = useState(true);
  // --> Campos de entrada
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [emailrecuperar, setEmailrecuperar] = useState('')
  //--> Estilos
  const [estiloEmail, setEstiloEmail] = useState('')
  const [estiloPassword, setEstiloPassword] = useState('')
  const [estiloEmailRec, setEstiloEmailRec] = useState('')
  const [mensajeAdvertencia, setMensajeAdvertencia] = useState('')

  const router = useRouter();
  const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

  const validarEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
  //--> Envio de datos
  const validarEnvio = async () => {
    if ([email, password].includes('')) {
      setEstiloEmail('p-invalid')
      setEstiloPassword('p-invalid')
      setMensajeAdvertencia("Todos los campos son obligatorios")
      setTimeout(() => { setMensajeAdvertencia('') }, 3000)
      return
    } else {
      setEstiloEmail('')
      setEstiloPassword('')
    }
    if (!validarEmail.test(email)) {
      setEstiloEmail('p-invalid')
      setMensajeAdvertencia("El email no es valido")
      setTimeout(() => { setMensajeAdvertencia('') }, 3000)
      return
    } else { setEstiloEmail('') }
    if (password.length < 6) {
      setEstiloPassword('p-invalid')
      setMensajeAdvertencia("La contraseña es muy corta")
      setTimeout(() => { setMensajeAdvertencia('') }, 3000)
      return
    } else { setEstiloPassword('') }
    setMensajeAdvertencia('')
    router.push('/pages/dashboard')
    //--> Validar envio a back-end
    // try {
    //   const respuesta = await axios.post("http://localhost:4000/api/usuarios/login", { email: email, password: password })
    //   if (respuesta.status === 200) {
    //     toast.current.show({ severity: 'success', summary: `${logueado.titulo}`, life: 3000 });
    //     setTimeout(() => { router.push('/pages/dashboard') }, 1000)
    //   }
    // } catch (error) {
    //   toast.current.show({
    //     severity: 'error', summary: "Lo sentimos", detail: "Ocurrio un error", life: 3000
    //   });
    // }
  }


  const validarEnvio2 = () => {
    if ([emailrecuperar].includes('')) {
      setEstiloEmailRec('p-invalid')
      setMensajeAdvertencia("Todos los campos son obligatorios")
      setTimeout(() => { setMensajeAdvertencia('') }, 3000)
      return
    } else { setEstiloEmailRec('') }
    if (!validarEmail.test(emailrecuperar)) {
      setEstiloEmailRec('p-invalid')
      setMensajeAdvertencia("El email no es valido")
      setTimeout(() => { setMensajeAdvertencia('') }, 3000)
      return
    } else { setEstiloEmailRec('') }
    // --> Limpiar variables
    setMensajeAdvertencia('')
    setEmailrecuperar('')
    // --> Informar estatus 
    toast.current.show({
      severity: 'success', summary: `${restablecerPass.titulo}`, detail: `${restablecerPass.contenido}`, life: 3000
    });
  }


  //---------------------------| Valor que regresara |---------------------------
  return (
    <>
      <Head>
        <title>Jardin del Eden</title>
        <meta charSet="UTF-8" />
        <meta name="description" content="Jardin del eden, una pagina para comprar flores" />
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


      <components.Container className={`card m-auto mt-8 ${styles.card}`} >
        <Toast ref={toast} />
        <components.SignUpContainer className={`card ${styles.card}`} signinIn={signIn}>
          <components.Form  >


            <h1 className={`font-bold text-center`}>Recuperar contraseña</h1>
            <components.Parrafo>Ingresa el correo asociado a tu cuenta</components.Parrafo>
            <label htmlFor="email1" className="block text-900 ">Email</label>
            <InputText
              inputid="email1" value={emailrecuperar} onChange={(e) => setEmailrecuperar(e.target.value)}
              type="text" placeholder="Email address" className={`block text-900  mb-2 w-full p-3  ${estiloEmailRec}`}
            />

            <Button label="Enviar" className="w-full p-3 text-xl" title="enviar" onClick={validarEnvio2} />
            {mensajeAdvertencia && (<p className='font-bold text-center bg-red-600 text-white mt-4 py-2'>{mensajeAdvertencia}</p>)}
            <components.Anchor onClick={() => toggle(true)}  >Iniciar Sesión</components.Anchor>


          </components.Form  >
        </components.SignUpContainer>


        <components.SignInContainer className={`card ${styles.card}`} signinIn={signIn}>

          <components.Form >
            <Image src={loto} className={styles['logo']} alt="Mi imagen" priority={true} />
            <h1 className={`font-bold text-center`}>Iniciar Sesión</h1>

            <label htmlFor="email1" className="block text-900 ">Correo</label>
            <InputText
              inputid="email1" value={email} onChange={(e) => setEmail(e.target.value)}
              type="text" placeholder="Correo electrónico" className={`block text-900  mb-2 w-full p-3  ${estiloEmail}`}
            />

            <label htmlFor="password1" className="block text-900 ">Contraseña</label>
            <Password
              inputid="password1" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña"
              feedback={false} className="w-full " inputClassName={`w-full p-3 md:w-30rem  ${estiloPassword}`} />

            <components.Parrafo onClick={() => toggle(false)} className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}>¿Olvidaste tu contraseña?</components.Parrafo>
            <Button label="Iniciar Sesion" className="w-full p-3 mb-3 text-xl" onClick={validarEnvio} />

            {mensajeAdvertencia && (<p className='font-bold text-center bg-red-600 text-white mt-4 py-2'>{mensajeAdvertencia}</p>)}




            <components.Parrafo>¿Eres Nuevo?</components.Parrafo>
            <div className="flex align-items-center">
              <Link
                href="/pages/pantallainicio/crearcuenta"
                className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}
              >Crear cuenta</Link>
            </div>

          </components.Form>
        </components.SignInContainer>




        <components.OverlayContainer signinIn={signIn}>
          <components.Overlay signinIn={signIn}>

            <components.leftOverLayPanel signinIn={signIn}>
              <components.GhostButton onClick={() => toggle(true)}>Iniciar Sesión</components.GhostButton>
            </components.leftOverLayPanel>


            <components.RightOverLayPanel signinIn={signIn}>
              <components.Title>Bienvenido de nuevo!</components.Title>
              <components.Title2>Jardín del Edén</components.Title2>

            </components.RightOverLayPanel >
            <Image src={myImage1} className={styles['my-image']} alt="Mi imagen" priority={true} />
            <Image src={myImage} className={styles['my-image']} alt="Mi imagen" priority={true} />
          </components.Overlay>
        </components.OverlayContainer>


      </components.Container>
      <AppConfig />






    </>

  )
}

