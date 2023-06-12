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


//--> Componentes propios
import { camposVacios} from '@/components/mensajesNotificaciones/mensajes';

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
  const saveLocation = () => {
      //--> Validar campos llenos
      if ([colonia,calle,cPostal,nExt,calleUno].includes('')) {
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
      }
      //--> Validar password
   
  

    //--> Limpiar campos
       setEstiloColonia('')
        setEstiloCalle('')
        setEstiloNExt('')
        setEstiloPostal('')
        setEstiloCalleUno('')
    //--> Notificar estatus despues de validarlo con back-end
 //   toast.current.show({ severity: 'success', summary: `${usuarioCreado.titulo}`, detail: `${usuarioCreado.contenido}`, life: 3000 });
 
  }



  return (  
      <div className="grid ">
        <div className="col-12">
          <div className="card">
            

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

              <div className= "p-fluid grid">

              <div className='field col-18 md:col-5'>
                 
                 <label className="block text-900 text-xl font-medium mb-1">Código Postal: </label>
                   <InputText
                     placeholder='' className={`${setEstiloCPostal} p-inputtext-lg`}
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
                 <div className= "field col-18 md:col-6">    
                <label className="block text-800 text-xl font-medium mb-4"> Calle 1:  </label>
                  <InputText
                    placeholder='Ingrese calle uno' className={`${estiloCalleUno} p-inputtext-lg`}
                    value={calleUno} onChange={(e) => setCalleUno(e.target.value)} />
                   </div>               
                   </div>

                   <div className="p-fluid grid">

                   <div className= "field col-18 md:col-6">    
                <label className="block text-800 text-xl font-medium mb-4"> Calle 2:  </label>
                  <InputText
                    placeholder='Ingrese calle dos' className={`${estiloCalleDos} p-inputtext-lg`}
                    value={calleDos} onChange={(e) => setCalleDos(e.target.value)} />
                   </div>       
                   </div>          


                   <div className="p-fluid grid">
                <div className='field col-20 md:col-10'>
                 
                <label className="block text-900 text-xl font-medium mb-5">Ingrese otras especificaciones: </label>
                <InputTextarea id="especificaciones" value={indicaciones}
                 onChange={(e) => setIndicaciones(e.value)} rows={4} className="p-invalid" />
                  
                   </div> 
                   </div>

                   <div className='mx-auto' style={{ width: "220px", textAlign: "center" }}>
                     <Messages ref={msgs} />
                     </div>
                     
                     <div className='flex justify-content-evenly my-4'>
                      <Button label="Guardar Cambios" onClick={saveLocation} severity="success" size="large" />
                      </div>
                      </div>
          </div>
        </div>
  )




  
}

export default ChangeLocation
