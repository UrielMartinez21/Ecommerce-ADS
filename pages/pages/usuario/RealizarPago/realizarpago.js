import React, { useState } from 'react'
import Layout from '@/layout/layout'
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Carousel } from 'primereact/carousel';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import { RadioButton } from 'primereact/radiobutton';
import 'primeicons/primeicons.css';
import { useRouter } from 'next/router';
import Link from 'next/link';
import RegistrarTarjeta from '../RealizarPago/CrearTarjetas';
import RegistrarDir from '../RealizarPago/CrearDir';
const RealizarPago = () => {

  const router = useRouter();
  const IrCarrito = () => {
    //--> Redireccionar
    router.push('/pages/usuario/carrito')

    
  }


    const [tarjeta, setTarjeta] = useState(0)
    const [direccion, setDireccion] = useState(0)
    const tarjetas = [
        { card: "Tarjeta 1"},
        { card: "Tarjeta 2"},
        { card: "Tarjeta 3"},
        { card: "Tarjeta 4"},
      ]

      const direcciones = [
        { address: "direccion 1"},
        { address: "direccion 2"},
        { address: "direccion 3"},
        { address: "direccion 4"},
      ]
  
    /*VARIABLES PARA DETERMINAR LA FECHA DE ENTREGA */
    const today = new Date(); // Obtener la fecha actual


    const [displayBasic, setDisplayBasic] = useState(false);
    const [displaycard, setDisplaycard] = useState(false);
    const [displayadd, setDisplayadd] = useState(false);

    
    const [date, setDate] = useState(null);
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 3);

    
  
    ///////////////////////////////////////////////////////

    const onClick = () => {
        setDisplayBasic(true);
       
      };

      const onClick2 = () => {
        setDisplaycard(true);
        
      };

      
      const onClick3 = () => {
        setDisplayadd(true);
        
      };
    const onHide = () => {
      setDisplayBasic(false);
      
    };

    const onHide2 = () => {
        setDisplaycard(false);
       
      };

    const onHide3 = () => {
        setDisplayadd(false);
       
      };

   

      /*CARRUSEL DEL APARTADO DE VER */
    const responsiveOptions = [
        { breakpoint: '1199px', numVisible: 1, numScroll: 1 },
        { breakpoint: '991px', numVisible: 2, numScroll: 1 },
        { breakpoint: '767px', numVisible: 1, numScroll: 1 }
      ];

    const productos = [
        { temporada: "Invierno"},
        { temporada: "Primavera"},
        { temporada: "Otoño"},
        { temporada: "Año nuevo"},
        { temporada: "San valentin"},
      ]


    const plantillaTemporada = (temporada) => {
    return (
      <div className=" surface-border border-round m-1 text-center py-5 ">
        <div className="">
          {<img className="w-10 shadow-2 border-round" src={`https://media.admagazine.com/photos/61eb22cb9b19d943aa117b30/master/w_1600%2Cc_limit/Girasol.jpg`}/>
             }
        </div>
        <div>

         
        </div>
      </div>
    );
  };

/*La variable SelectedDate determina la fecha elegida */
  const [selectedDate, setSelectedDate] = useState( maxDate.toLocaleDateString() );
  
  const onDateSelect = (e) => {
    const selectedValue = e.value ? e.value.toLocaleDateString() : '';
    setSelectedDate(selectedValue);
    setDate(e.value);
  };
  const [ingredient,setIngredient] = useState('Date');

  const renderFooter = () => {
      return (
        <div className="dialog-footer">
          <Button label="Cerrar" onClick={ onHide} />
        </div>
      );
    };

    const renderFooter2 = () => {
        return (
          <div className="dialog-footer">
            <Button label="Cerrar" onClick={ onHide2} />
          </div>
        );
      };

      const renderFooter3 = () => {
        return (
          <div className="dialog-footer">
            <Button label="Cerrar" onClick={ onHide3} />
          </div>
        );
      };

  return (
    <Layout
      title="Pagar"
      description="Soltar el cash"
    >
      <div className="grid">
        <div className="col-12 ">
          <h4>Realizar Pago <i className="pi pi-dollar"></i></h4>
          <div className='lg:flex lg:justify-content-between '>
            <div className='lg:col-7 md:col-12 mb-5'>
              <div className='card'> <h4>Elija su forma de pago</h4>
              
              <div className='flex justify-content-between my-3'>
              
                  <label htmlFor="tamaño" className='flex align-items-center font-semibold'>Elegir  tarjeta</label>
                  <Dropdown
                    inputId="tamaño" value={tarjeta} onChange={(e) => setTarjeta(e.value)} placeholder='Tarjetas'
                    options={tarjetas} optionLabel="card" optionValue='card' className="w-full md:w-14rem" />
                    <Button   label="" icon="pi pi-plus"  onClick={() => onClick2('displaycard')}  rounded severity="help" aria-label="Favorite" className="p-button-rounded"  />
                    <Dialog header="Agregar tarjeta" visible={displaycard} style={{ width: 'auto' }} footer={renderFooter2('displaycard')} onHide={() => onHide2('displaycard')}>
                    <RegistrarTarjeta />
                    </Dialog>
              
                </div>
                </div>
                
              <div className='card'> <h4>Elegir dirección</h4>
              <div className='flex justify-content-between my-3'>
                  <label htmlFor="tamaño" className='flex align-items-center font-semibold'>Escoja una dirección</label>
                  <Dropdown
                    inputId="tamaño" value={direccion} onChange={(e) => setDireccion(e.value)} placeholder='Direcciones'
                    options={direcciones} optionLabel="address" optionValue='address' className="w-full md:w-14rem" />
                    <Button   label="" icon="pi pi-plus" onClick={() => onClick3('displayadd')}  rounded severity="help" aria-label="Favorite" className="p-button-rounded"  />
                    <Dialog header="Agregar Dirección" visible={displayadd} style={{ width: 'auto' }} footer={renderFooter3('displayadd')} onHide={() => onHide3('displayadd')}>
                    <RegistrarDir />    
                    </Dialog>
                </div>
              </div>




              <div className='card'>
                <h4>Fecha de entrega</h4>
                <div className="gap-3">
                    <div className="align-items-center">
                    <RadioButton inputId="Date" name="Fecha programada" value="Date" onChange={(e) => {setIngredient(e.value); setSelectedDate(maxDate.toLocaleDateString());
                }}
                checked={ingredient === 'Date'}/>


                    <label htmlFor="chooseDate" className="ml-2">Fecha estimada: {maxDate.toLocaleDateString()} </label>
                    </div>
                    <div className="align-items-center">
                        <RadioButton inputId="ingredient2" name="Elegir fecha" value="Elegir" onChange={(e) => setIngredient(e.value)} checked={ingredient === 'Elegir'} />
                        <label htmlFor="ingredient2" className="ml-2">Elegir fecha</label>
                        
                        {ingredient !== 'Date' ? (
                        <div>
                        
                        <Calendar value={date} onChange={onDateSelect} showIcon minDate={maxDate}/>
                        </div>
                    ) : null}
                
                    </div>
                    
                </div>
                </div>


            </div>
            
                
 
                
            <div className='lg:col-5 md:col-12'>

            <div className='card'>
                <p className='font-bold text-2xl'>Total a pagar: </p>
              
              <div className='flex justify-content-around'>
                <Button label="Pagar" severity="success" rounded size="large" className='w-5' />
                
                <Button label="Cancelar" onClick={IrCarrito} severity="danger" rounded size="large" className='w-5' />
              
            </div>
              </div>
              <div className='card'>
                
                <h3 className='font-bold  text-center'>Operacion</h3>
                
                <Dialog visible={displayBasic} style={{ width: '50vw' }} footer={renderFooter('displayBasic')} onHide={() => onHide('displayBasic')}>
                <h4 className='font-bold  text-center '>Productos</h4>
               <Carousel value={productos} autoplayInterval={4000} numVisible={3} numScroll={2} orientation="horizontally" verticalViewPortHeight="300px" itemTemplate={plantillaTemporada} /> 
                </Dialog>

               
                
                <p><span className='font-bold'>Pedido:</span> #1234</p>
                <div className='flex'>
                <p><span className='font-bold'>Contenido:</span> </p>
                <p className="font-medium underline ml-2 text-right cursor-pointer"  onClick={() => onClick('displayBasic')} >Ver</p>
                </div>
                
                <p> <span className='font-bold '>Fecha de entrega: </span> {selectedDate}</p>
                <p> <span className='font-bold '>Costo: </span> $1000000</p>
                <p> <span className='font-bold '>Envio: </span> $1,000,00</p>
                <p className='text-center  text-2xl'> <span className='font-bold '>Total: </span> Un chingo</p>
                
                
                
                
              </div>
              
            </div>
          


          </div>

        </div>
      </div>
    </Layout>
  )
}

export default RealizarPago