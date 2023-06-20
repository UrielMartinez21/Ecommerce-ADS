import { InputText } from "primereact/inputtext";
import { InputMask } from 'primereact/inputmask';
import { Button } from 'primereact/button';
import React, { useState, useRef } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { Toast } from "primereact/toast";
import axios from 'axios';
import { saveTarjeta } from '@/components/mensajesNotificaciones/links';
const AtencionClientes = () => {

  //--> Mensajes y notificaciones
  const toast = useRef(null);

  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });

  const saveCard = async()=> {

    if (
      state.number === '' ||
      state.expiry === '' ||
      state.cvc === '' ||
      state.name === ''
    ){
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: "Todos los campos deben estar llenos",
        life: 3000,
      });
      return
    } 
    if(state.cvc.length<3){
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: "El cvv debe ser de 3 digitos",
        life: 3000,
      });
      return
    }
     //--> Preparar objeto para enviar
  console.log(state.expiry)
  const token = localStorage.getItem('token')
  const cabecera = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const numbero = state.number.replace(/\s/g, '');
  const objetoEnviar = {
    num: numbero,
    fecha: state.expiry,
    titular: state.name,
    c: state.cvc
    
  }

  //--> Enviar peticion
  try {
    const respuesta = await axios.post(saveTarjeta, objetoEnviar, cabecera)
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
      });}
  }


  //--> Limpiar campos
  setState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });

 
  //--> Notificar estatus despues de validarlo con back-end
  //toast.current.show({ severity: 'success', summary: 'Cambio guardado exitosamente', detail: 'Revisa tu correo', life: 3000 });

}
const handleInputChange = (evt) => {
  const { name, value } = evt.target;

  if (name === 'name' && (/^[a-zA-Z\s]*$/.test(value) || value === '')) {
    setState((prev) => ({ ...prev, [name]: value }));
  }

  if (name === 'cvc' && (/^\d{0,3}$/.test(value) || value === '')) {
    setState((prev) => ({ ...prev, [name]: value }));
  }

  if (
    name === 'expiry' &&
    (/^(0[1-9]|1\d|2\d|3[01])\/([0-9]{2})$/.test(value) || value === '')
  ) {
    setState((prev) => ({ ...prev, [name]: value }));
  }
};

const handleInputNumber = (evt) => {
  const { name, value } = evt.target;
  setState((prev) => ({ ...prev, [name]: value }));
};

const handleInputFocus = (evt) => {
  setState((prev) => ({ ...prev, focus: evt.target.name }));
};

  return (

    

      <div className="grid">
        <div className="col-12 ">
          <div className="lg:flex lg:justify-content-center">
           
        
              <div className="card">

              <Cards
               number={state.number}
              expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus}
            />
              
                <div className="flex justify-content-center my-3">
                  <div className="">
                    <div className="lg:w-full">
                      <label htmlFor="ssn" className="font-bold block">Número de la tarjeta</label>
                      <Toast ref={toast} />
                      <InputMask id="ssn"  name="number" value={state.number} onChange={handleInputNumber} onFocus={handleInputFocus}  mask="9999 9999 9999 9999" className="mb-2 w-full p-3" placeholder="9999-9999-9999-9999"></InputMask>
                      <label htmlFor="titular" className="font-bold block text-900">Nombre del titular</label>
                      <InputText id="titular"   name="name" placeholder="Nombre" value={state.name} onChange={handleInputChange} onFocus={handleInputFocus} className="mb-2 w-full"></InputText>
                    </div>

                    <div className="flex">
                    
                      <div className="w-1/2 mr-2">
                        <label htmlFor="vencimiento" className="font-bold block text-900">Vencimiento</label>
                        <InputMask id="vencimiento"  name="expiry" value={state.expiry} onChange={handleInputChange} onFocus={handleInputFocus}   className="mb-2 w-full p-3" mask="99/99" placeholder="99/99" slotChar="dd/yy"></InputMask>
                      </div>

                      <div className="w-1/2">
                        <label htmlFor="cvv" className="font-bold block text-900">CVV</label>
                        <InputText name="cvc"  value={state.cvc} onChange={handleInputChange} onFocus={handleInputFocus}  id="cvv"  placeholder="CVV" className="mb-2 w-full "></InputText>
                        
                      </div>
                    </div>
                  </div>
                  
                </div>
                
                <Button label="Agregar tarjeta" onClick={saveCard} className='mr-2 w-full p-3' severity="success" size="large" />
                
              </div>
             
              
            </div>
          </div>
        </div>
  
  )
}

export default AtencionClientes;
