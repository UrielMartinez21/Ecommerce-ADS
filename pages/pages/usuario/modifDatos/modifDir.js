import React, { useState, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from "@/layout/layout";
//--> Componentes de primeReact
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import { useRouter } from 'next/router';
import { InputText } from "primereact/inputtext";
import { Avatar } from 'primereact/avatar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';


import axios from 'axios';
import { saveDir } from '@/components/mensajesNotificaciones/links';

//--> Componentes propios
import { camposVacios, formatoCodigoPostal } from '@/components/mensajesNotificaciones/mensajes';

const ChangeLocation = () => {
  //--> Variable de redireccinamiento
  const router = useRouter();

  //--> Mensajes y notificaciones
  const toast = useRef(null);
  const msgs = useRef(null);

  //-----------------------| Lista de variables |-----------------------
  //--> Campos de entrada
  const [colonia, setColonia] = useState('')
  const [calle, setCalle] = useState('')
  const [cPostal, setCPostal] = useState('')
  const [nExt, setNExt] = useState('')
  const [nInt, setNInt] = useState('')
  const [calleUno, setCalleUno] = useState('')
  const [calleDos, setCalleDos] = useState('')
  const [indicaciones, setIndicaciones] = useState('')
  //--> Validar envio

  const [estiloColonia, setEstiloColonia] = useState('')
  const [estiloCalle, setEstiloCalle] = useState('')
  const [estiloPostal, setEstiloCPostal] = useState('')
  const [estiloExt, setEstiloNExt] = useState('')
  const [estiloInt, setEstiloNInt] = useState('')
  const [estiloCalleUno, setEstiloCalleUno] = useState('')
  const [estiloCalleDos, setEstiloCalleDos] = useState('')
  const [estiloIndicaciones, setEstiloIndicaciones] = useState('')

  //-----------------------| Mensajes de advertencia |-----------------------
  const mostrarMensaje = (mensaje) => { msgs.current.show({ severity: 'error', detail: `${mensaje}`, sticky: true, closable: false }) };
  const limpiarMensaje = () => { msgs.current.clear() }

  //-----------------------| Envio |-----------------------
  const saveLocation = async () => {
    //--> Validar campos llenos
    if ([colonia, calle, cPostal, nExt, calleUno].includes('')) {
      if (!colonia) setEstiloColonia('p-invalid')
      if (!calle) setEstiloCalle('p-invalid')
      if (!nExt) setEstiloNExt('p-invalid')
      if (!cPostal) setEstiloCPostal('p-invalid')
      if (!calleUno) setEstiloCalleUno('p-invalid')
      mostrarMensaje(camposVacios)
      setTimeout(() => { limpiarMensaje() }, 3000)
      return
    } else {
      setEstiloColonia('')
      setEstiloCalle('')
      setEstiloNExt('')
      setEstiloCPostal('')
      setEstiloCalleUno('')
      setEstiloIndicaciones('')
    }


    if (!/^\d{5}$/.test(cPostal)) {
      setEstiloCPostal('p-invalid')
      mostrarMensaje(formatoCodigoPostal)
      setTimeout(() => { limpiarMensaje() }, 3000)
      return
    } else {
      setEstiloCPostal('')
    }
    if (!/^\d+$/.test(nExt)) {
      setEstiloNExt('p-invalid')
      mostrarMensaje(formatoCodigoPostal)
      setTimeout(() => { limpiarMensaje() }, 3000)
      return
    } else {
      setEstiloNExt('')
    }

    if (nInt !== '' && !/^\d+$/.test(nInt)) {
      setEstiloNInt('p-invalid')
      mostrarMensaje(formatoCodigoPostal)
      setTimeout(() => { limpiarMensaje() }, 3000)
      return
    } else {
      setEstiloNInt('')
    }


    const token = localStorage.getItem('token')
    const cabecera = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const objetoEnviar = {
      col: colonia,
      cal: calle,
      cp: cPostal,
      nInt: nInt,
      nExt: nExt,
      calle1: calleUno,
      calle2: calleDos,
      adicionales: indicaciones

    }

    //--> Enviar peticion
    try {
      const respuesta = await axios.post(saveDir, objetoEnviar, cabecera)
      if (respuesta.status === 200) {
        toast.current.show({ severity: 'success', summary: 'Éxito', detail: respuesta.data.msg, life: 3000 });
      }

    } catch (error) {
      if (toast.current) {
        toast.current.show({
          severity: 'Error',
          summary: 'error',
          detail: error.response.data.msg,
          life: 3000,
        });
      }
    }




    //--> Limpiar campos
    setEstiloColonia('')
    setEstiloCalle('')
    setEstiloNExt('')
    setEstiloCPostal('')
    setEstiloCalleUno('')
    setEstiloCalleDos('')
    setEstiloIndicaciones('')


    setColonia('')
    setCalle('')
    setNExt('')
    setNInt('')
    setCPostal('')
    setCalleUno('')
    setCalleDos('')
    setIndicaciones('')
    //--> Notificar estatus despues de validarlo con back-end
    //   toast.current.show({ severity: 'success', summary: `${usuarioCreado.titulo}`, detail: `${usuarioCreado.contenido}`, life: 3000 });





    //--> Redireccionar
    setTimeout(() => {
      router.push('/pages/usuario/modifDatos/addDir')
    }, 3000);
  }


  const cancelChangeLocation = () => {
    //--> Limpiar campos de entrada antes de salir
    setColonia('')
    setCalle('')
    setNExt('')
    setNInt('')
    setCPostal('')
    setCalleUno('')
    setCalleDos('')
    setIndicaciones('')

    //--> Limpiar estilos de campos de entrada
    setEstiloColonia('')
    setEstiloCalle('')
    setEstiloNExt('')
    setCPostal('')
    setEstiloNInt('')
    setEstiloCalleUno('')
    setEstiloIndicaciones('')
    setEstiloCalleDos('')

    //--> Redireccionar

    router.push('/pages/usuario/modifDatos/addDir')

  }

  return (
    <Layout title="Modificar Dirección" description="Datos del usuario">

      <div className="grid ">
        <Toast ref={toast} />
        <div className="col-12">
          <div className="card">
            <h3>Agregar dirección</h3>
            <div className='flex align-items-rigth flex-wrap'>
              <div className='field'>
                <Link href="/pages/usuario/modifDatos/addDir" className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }} >
                  Regresar
                </Link>
              </div>
            </div>
            <div className="p-fluid grid">
              <div className='field col-18 md:col-6'>
                <label className="block text-900 text-xl font-medium mb-4">Calle:</label>
                <InputText
                  placeholder='' className={`${estiloCalle} p-inputtext-lg`}
                  value={calle} onChange={(e) => setCalle(e.target.value)} />
              </div>
            </div>

            <div className="p-fluid grid">
              <div className='field col-18 md:col-6'>
                <label className="block text-900 text-xl font-medium mb-4">Colonia: </label>
                <InputText
                  placeholder='' className={`${estiloColonia} p-inputtext-lg`}
                  value={colonia} onChange={(e) => setColonia(e.target.value)}
                />
              </div>
            </div>

            <div className="p-fluid grid">

              <div className='field col-18 md:col-5'>

                <label className="block text-900 text-xl font-medium mb-1">Código Postal: </label>
                <InputText
                  placeholder='' className={`${estiloPostal} p-inputtext-lg`}
                  value={cPostal} onChange={(e) => setCPostal(e.target.value)} />

              </div>

              <div className='field col-18 md:col-2'>

                <label className="block text-900 text-xl font-medium mb-1">No. Exterior</label>
                <InputText
                  placeholder='' className={`${estiloExt} p-inputtext-lg`}
                  value={nExt} onChange={(e) => setNExt(e.target.value)} />

              </div>

              <div className='field col-18 md:col-2'>

                <label className="block text-900 text-xl font-medium mb-1">No. Interior</label>
                <InputText
                  placeholder='' className={`${estiloInt} p-inputtext-lg`}
                  value={nInt} onChange={(e) => setNInt(e.target.value)} />
              </div>

            </div>


            <div className=''>
              <label className="block text-900 text-xl font-medium mb-4">Entre que calles se encuentra:  </label>

            </div>
            <div className="p-fluid grid">
              <div className="field col-18 md:col-6">
                <label className="block text-800 text-xl font-medium mb-4"> Calle 1:  </label>
                <InputText
                  placeholder='Ingrese calle uno' className={`${estiloCalleUno} p-inputtext-lg`}
                  value={calleUno} onChange={(e) => setCalleUno(e.target.value)} />
              </div>
            </div>

            <div className="p-fluid grid">

              <div className="field col-18 md:col-6">
                <label className="block text-800 text-xl font-medium mb-4"> Calle 2:  </label>
                <InputText
                  placeholder='Ingrese calle dos' className={`${estiloCalleDos} p-inputtext-lg`}
                  value={calleDos} onChange={(e) => setCalleDos(e.target.value)} />
              </div>
            </div>


            <div className="p-fluid grid">
              <div className='field col-20 md:col-10'>

                <label className="block text-900 text-xl font-medium mb-5">Ingrese otras especificaciones: </label>
                <InputTextarea id="especificaciones" value={indicaciones} className={`${estiloIndicaciones} p-inputtext-lg`}
                  onChange={(e) => setIndicaciones(e.value)} rows={4} />

              </div>
            </div>

            <div className='mx-auto' style={{ width: "220px", textAlign: "center" }}>
              <Messages ref={msgs} />
            </div>

            <div className='flex justify-content-evenly my-4'>
              <Button label="Guardar Cambios" onClick={saveLocation} severity="success" size="large" />
              <Button label="Cancelar" onClick={cancelChangeLocation} severity="danger" size="large" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )





}

export default ChangeLocation
