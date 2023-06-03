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


//--> Componentes propios
import { camposVacios, contactoInvalido} from '@/components/mensajesNotificaciones/mensajes';

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

  const ladas = [
    { name: '1+787', code: '1+787' },
    { name: '+51', code: '+51' },
    { name: '+52', code: '+52' },
    { name: '+53', code: '+53' },
    { name: '+54', code: '+54' },
    { name: '+56', code: '+56' },
    { name: '+86', code: '+86' },
    { name: '+506', code: '+506' }
]
 
  //--> Validar envio
  
  const [estiloPhone, setEstiloPhone] = useState('')
  const [estiloPhoneLadas, setEstiloPhoneLadas] = useState('')

  //-----------------------| Mensajes de advertencia |-----------------------
  const mostrarMensaje = (mensaje) => { msgs.current.show({ severity: 'error', detail: `${mensaje}`, sticky: true, closable: false }) };
  const limpiarMensaje = () => { msgs.current.clear() }

  //-----------------------| Envio |-----------------------
  const changePhone = () => {
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
  
    //--> Limpiar campos
    setPhone('')
    setPhoneLadas('')
   
    //--> Notificar estatus despues de validarlo con back-end
    //toast.current.show({ severity: 'success', summary: 'Cambio guardado exitosamente', detail: 'Revisa tu correo', life: 3000 });
 
  }

  const cancelChengePhone= () => {
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

            <div className=''> 
            <div className='field'> 
              <Link href="/pages/usuario/miCuenta" className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }} >
               Regresar
              </Link>
              </div>
              </div>

              <div className='p-fluid grid'>

              <div className="field col-20 md:col-2">
                        <label htmlFor="dropdown" className="block text-800 text-xl font-medium mb-5">Lada</label>
                        <Dropdown inputId="dropdown" value={phoneL} options={ladas} onChange={(e) => setPhoneLadas(e.value)} optionLabel="name" className="p-invalid" />
                    </div>

                <div className='field col-12 md:col-4'>
                 
                <label className="block text-900 text-xl font-medium mb-4">Ingrese su número de teléfono:</label>
                  <InputText  placeholder='' className={`${estiloPhone} p-inputtext-lg`}
                    value={phone} onChange={(e) => setPhone(e.target.value)} />
                   </div> 
                   </div>

                   <div className='mx-auto' style={{ width: "220px", textAlign: "center" }}>
                     <Messages ref={msgs} />
                     </div>
                     
                     <div className='flex justify-content-evenly my-4'>
                      <Button label="Guardar Cambios" onClick={changePhone} severity="success" size="large" />
                      <Button label="Cancelar" onClick={cancelChengePhone} severity="danger" size="large" />
                      </div>
                      </div>
          </div>
        </div>
    </Layout>
  )

}

export default ModificarTelefono
