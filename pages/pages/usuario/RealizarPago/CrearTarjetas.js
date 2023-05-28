import { InputText } from "primereact/inputtext";
import { InputMask } from 'primereact/inputmask';
import { Button } from 'primereact/button';
import React, { useState, useRef } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
const AtencionClientes = () => {
  const [nombre, setNombre] = useState('');


  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    
    setState((prev) => ({ ...prev, [name]: value }));
  }

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  }


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
              <form>
                <div className="flex justify-content-center my-3">
                  <div className="">
                    <div className="lg:w-full">
                      <label htmlFor="ssn" className="font-bold block">Número de la tarjeta</label>
                      <InputMask id="ssn"  name="number" value={state.number} onChange={handleInputChange} onFocus={handleInputFocus}  mask="9999 9999 9999 9999" className="mb-2 w-full p-3" placeholder="9999-9999-9999-9999"></InputMask>
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
                        <InputText name="cvc" value={state.cvc} onChange={handleInputChange} onFocus={handleInputFocus}  id="cvv"  placeholder="CVV" className="mb-2 w-full "></InputText>
                        
                      </div>
                    </div>
                  </div>
                  
                </div>
                
                <Button label="Agregar tarjeta" className='mr-2 w-full p-3' severity="success" size="large" />
                </form>
              </div>
             
              
            </div>
          </div>
        </div>
  
  )
}

export default AtencionClientes;
