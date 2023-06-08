import Layout from "@/layout/layout"
import React, { useEffect, useState } from "react";
import { DataView } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { Tag } from 'primereact/tag';
import { Timeline } from 'primereact/timeline';

import { useRouter } from 'next/router';
import 'primeicons/primeicons.css';
const Seguimiento = () => {
    const router = useRouter();


    const events = [
        { status: 'Ordenado', date: '15/10/2020',hora:'10:30pm' ,icon: 'pi pi-shopping-cart',imagen: "https://s.cornershopapp.com/product-images/2343555.jpg?versionId=xPvvkAxaVapD_aHU1QfX81cIZDBccvis"},
        { status: 'Compra autorizada', date: '15/10/2020',hora:'10:30pm' , icon: 'pi pi-cog', },
        { status: 'Enviado', date: '15/10/2020',hora:'10:30pm' , icon: 'pi pi-truck', color: '#FF9800' },
        { status: 'Entregado', date: '16/10/2020',hora:'10:30pm' , icon: 'pi pi-check-circle', color: '#607D8B' }
    ];

    const customizedContent = (event) => {
        return (
          <div className='card  shadow-3'>
              <h4 className=""> <i className={event.icon}></i> {event.status}</h4>
              <h6 className="mt-0">{event.date}</h6>
              <h6 className="mt-0">{event.hora}</h6>
              {event.status === 'Ordenado' && (
                <div>
              <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 mb-5 block xl:block mx-auto border-round" src={`${event.imagen}`} style={{ width: '150px', height: '150px' }} />
              <Button className="p-button-warning"  label="Ver Detalles" onClick={() => { router.push('/pages/usuario/miscompras') }} icon="pi pi-arrow-circle-right" />
                </div>
              )}
              
               <h6>Información</h6>
               <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
            </div>
        );
      };

      const customizedMarker = (event) => {
        
        return (
         <div>
            
            <Button icon={event.icon}  style={{ pointerEvents: 'none', cursor: 'not-allowed' }} rounded severity></Button>
           
          
        </div>
        );
      };
    
    
  return (
    
    <Layout
      title="Seguimiento"
      description="Seguimiento de pedido"
    >
     
     <div className="grid">
        <div className="col-12">
          <h1>Seguimiento de pedido</h1>
        </div>
        <div className="col-12">
        <Button label="Volver"  link onClick={() => { router.push('/pages/usuario/compras') } }
                  icon="pi pi-angle-left" iconPos="left" />
        <div className='flex justify-content-center'>
                <h5 className="text">ID de compra: #12345</h5>
        </div>
        
        <Timeline value={events} align="alternate" className="customized-timeline"  content={customizedContent}  marker={customizedMarker} />

          
        </div>
        
      </div>
    </Layout>
  )
}

export default Seguimiento
