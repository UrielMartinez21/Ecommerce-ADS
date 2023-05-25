import React, { useState, useRef, useEffect, use } from 'react';
import Head from 'next/head';
import AppConfig from '@/layout/AppConfig';
//--> Componentes de primeReact
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import { InputText } from "primereact/inputtext";
import { useRouter } from 'next/router';
//--> Componentes propios
import { temporizador } from '@/helpers/funciones';
import { tokenInvalido, campoVacio } from '@/components/mensajesNotificaciones/mensajes';
import { cuentaConfirmada, envioToken } from '@/components/mensajesNotificaciones/notificaciones';

const Token = () => {
  //--> Variable de redireccinamiento
  const router = useRouter();

  //--> Mensajes y notificaciones
  const toast = useRef(null);
  const msgs = useRef(null);

  //-----------------------| Lista de variables |-----------------------
  //--> Temporizador
  const [tiempo, setTiempo] = useState(300)
  const [verTiempo, setVerTiempo] = useState('')
  //--> Token
  const [token, setToken] = useState('')
  const [estiloToken, setEstiloToken] = useState('')

  //-----------------------| Cuenta regresiva |-----------------------
  useEffect(() => {
    const cuentaRegresiva = setInterval(() => {
      if (tiempo !== 0) {
        let tiempoRestante = tiempo - 1
        setTiempo(tiempoRestante)
        setVerTiempo(temporizador(tiempoRestante))
      }
    }, 1000);
    return () => clearInterval(cuentaRegresiva);
  }, [tiempo]);

  //-----------------------| Mensajes de advertencia |-----------------------
  const mostrarMensaje = (mensaje) => { msgs.current.show({ severity: 'error', detail: `${mensaje}`, sticky: true, closable: false }) };
  const limpiarMensaje = () => { msgs.current.clear() }

  //-----------------------| Funciones principales |-----------------------
  const confirmarUsuario = () => {
    //--> Validar token vacio
    if (!token) {
      setEstiloToken('p-invalid')
      mostrarMensaje(campoVacio)
      setTimeout(() => { limpiarMensaje() }, 3000)
      return
    } else { setEstiloToken('') }

    //--> Validar token invalido
    if (token.length < 6) {
      setEstiloToken('p-invalid')
      mostrarMensaje(tokenInvalido)
      setTimeout(() => { limpiarMensaje() }, 3000)
      return
    } else { setEstiloToken('') }

    //--> Limpiar campo y estilo
    setToken('')
    setEstiloToken('')

    //--> Detener temporizador
    setTiempo(0)
    //--> Notificar estatus despues de validarlo con back-end
    toast.current.show(
      { severity: 'success', summary: `${cuentaConfirmada.titulo}`, detail: `${cuentaConfirmada.contenido}`, life: 3000 }
    );

    //--> Redireccionar
    // router.push('/')
  }

  const reenviarToken = () => {
    //--> Reiniciar temporizador
    setTiempo(300)

    //--> Notificar estatus despues de validarlo con back-end
    toast.current.show({ severity: 'success', summary: `${envioToken.titulo}`, detail: `${envioToken.contenido}`, life: 3000 })

    //--> Reenviar token

  }


  //---------------------------| Valor que regresara |---------------------------
  return (
    <>
      <Head>
        <title>Jardín del Edén - Token</title>
        <meta charSet="UTF-8" />
        <meta name="description" content="El usuario confirmara su cuenta creada" />
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

      <div className='flex h-screen'>
        <Toast ref={toast} />
        <div className="xl:col-6 md:col-7 sm:col-offset-6 m-auto">
          <div className="card ">

            <p className='text-center text-6xl font-bold'>Confirma tu cuenta</p>
            <p className='text-xl text-center'>¡Gracias por elejir Jardin de Eden!</p>
            <p className='text-justify'>
              Verifique su correo electrónico el e-mail con el asunto  <span className='text-cyan-500 font-semibold'>Correo verificación de cuenta</span> el cual que contiene el código de confirmación, es posible que el mensaje haya sido enviado a la carpeta SPAM o similar.
            </p>

            <div className='flex justify-content-center mt-6'>
              <div className="p-inputgroup" style={{ width: "380px" }}>
                <InputText placeholder={`Código de confirmación. Tiempo: ${verTiempo}`} className={`${estiloToken}`}
                  value={token} onChange={(e) => setToken(e.target.value)} disabled={tiempo === 0} />
                <Button label='Confirmar' onClick={confirmarUsuario} disabled={tiempo === 0} />
              </div>
            </div>

            <div className='mx-auto' style={{ width: "380px", textAlign: "center" }}>
              <Messages ref={msgs} />
            </div>

            <p className='text-justify mt-5'>
              Si no puede encontrar el mensaje indicado puede utilizar alguna de las opciones que se muestran a continuación.
            </p>

            <div className='flex justify-content-start mt-4'>
              <div className='flex flex-column'>
                <Button label='Enviar nuevo código' severity="danger" className='font-bold mb-2' text onClick={reenviarToken} />
                <Button
                  label='Cancelar' severity="danger" className='font-bold' text
                  onClick={() => router.push('/pages/pantallainicio/crearcuenta')} />
              </div>
            </div>

          </div>
        </div>
        <AppConfig />
      </div>
    </>
  )
}

export default Token
