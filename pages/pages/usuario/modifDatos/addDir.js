import React, { useState, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from "@/layout/layout";
//--> Componentes de primeReact
import { Button } from 'primereact/button';
import { useRouter } from 'next/router';


//--> Componentes propios


const AddLocation = () => {
  //--> Variable de redireccinamiento
  const router = useRouter();

  //--> Mensajes y notificaciones
  const toast = useRef(null);
  const msgs = useRef(null);

  //-----------------------| Lista de variables |-----------------------
  //--> Campos de entrada

  //-----------------------| Mensajes de advertencia |-----------------------
  const mostrarMensaje = (mensaje) => { msgs.current.show({ severity: 'error', detail: `${mensaje}`, sticky: true, closable: false }) };
  const limpiarMensaje = () => { msgs.current.clear() }

  //-----------------------| Envio |-----------------------
  



  return (
    <Layout title="Direcciones" description="Datos del usuario">
      
      <div className="grid ">
        <div className="col-12">
          <div className="card">
            <h3 >Mis Direcciones</h3>

            <div className='field'> 
              <Link href="/pages/usuario/miCuenta" className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }} >
               Regresar
              </Link>
              </div>

            <Button severity='success' label='Agregar nueva dirección' onClick={() => { router.push('/pages/usuario/modifDatos/modifDir')}} />

            </div>
          </div>
        </div>
    </Layout>
  )


  
}

export default AddLocation
