import Layout from "@/layout/layout"
import React, { useEffect, useState } from "react";
import { DataView } from 'primereact/dataview';
import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
const Favoritos = () => {
  const router = useRouter();
  const [Ordenes, setOrden] = useState([])

  useEffect(() => {
    const datosOrden = [
      {
        Npedido: "1234", precio: 5.90, fecha:"10/10/2002",estado: "Entregado",
        productos: [
          {nombre: "Rosa",
          cantidad:"1",
          total:"$11",
          imagen:"https://minisomx.vtexassets.com/arquivos/ids/218097/Peluche-Miniso-Unicornio-Felpa-Rosa-16x28-cm-1-12948.jpg?v=637952098028100000"},
         
        ],
       
        
      },
      {
        Npedido: "5678", precio: 6.20, fecha:"26/07/2002",estado: "Procesando",
        productos: [
          {nombre: "Rosa",
          cantidad:"1",
          total:"$11",
          imagen:"https://media.admagazine.com/photos/61eb22cb9b19d943aa117b30/master/w_1600%2Cc_limit/Girasol.jpg"},
          {nombre: "Tulipan",
          cantidad:"4",
          total:"$15",
          imagen:"https://m.media-amazon.com/images/I/41dFyXgb9sL._SL500_.jpg"},
          
        ]
        
      },
      {
        Npedido: "161718", precio: 78.60,fecha:"10/10/2002",estado: "Pedido Confirmado",
        productos: [
          {nombre: "Rosa",
          cantidad:"1",
          total:"$11",
          imagen:"https://http2.mlstatic.com/D_NQ_NP_2X_778361-MLM69281757162_052023-F.webp"}
        ]
  
      }
    ]
    setOrden(datosOrden)
  }, [])



  const productoTemplate = (producto) => (
    <div className="col-12">

    <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4 ">
      <img className="w-9 sm:w-16rem xl:w-10rem  border-round" src={producto.imagen} />
      
      <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-5">
        <div className="flex flex-column align-items-center sm:align-items-start ">
          <div className="">Producto: {producto.nombre}</div>
          <span className="">Total: {producto.total}</span>
          <span className="">Cantidad: {producto.cantidad}</span>
        
        
        
            
        </div>
        
       
 
      </div>
    </div>
  </div>

  );




    const productos = [
        { temporada: "Rosa",cantidad:"1",total:"$11"},
        { temporada: "Tulipan",cantidad:"4",total:"$15"},
        { temporada: "Girasol",cantidad:"3",total:"$190"},
        { temporada: "Bella",cantidad:"5",total:"$204"},
        { temporada: "Piña",cantidad:"6",total:"$10"},
      ]
      const renderFooter = () => {
        return (
          <div className="dialog-footer">
            <Button label="Cerrar" onClick={ onHide} />
          </div>
        );
      };
      const onHide = () => {
        setDisplayBasic(false);
        
      };
      const onClick = () => {
        setDisplayBasic(true);
       
      };
    const plantillaTemporada = (temporada) => {
        return (
          <div className=" surface-border border-round m-1 text-center py-5 ">
            <div className="">
              {<img className="w-10 shadow-2 border-round" src={`https://media.admagazine.com/photos/61eb22cb9b19d943aa117b30/master/w_1600%2Cc_limit/Girasol.jpg`}/>
                 }
                 <h5 className="mt-0 mb-0">Producto: {temporada.temporada}</h5>
                 <h6 className="mt-0 mb-0">Cantidad: {temporada.cantidad}</h6>
                <h6 className="mt-0 mb-0 ">Total: {temporada.total}</h6>
                
            </div>
            <div>
            </div>
          </div>
        );
      };


  const itemTemplate = (datosOrden) => { 

         
 

    return (
        <div className="col-12">

        <div className="mt-2" ><span className="text-2xl font-bold text-900">Estado: {flor.estado}</span> </div>
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4 ">
            
        <img className="shadow-2 border-round" src={`${flor.imagen}`} alt={`${flor.Npedido}`} style={{ width: '200px'}}/> 
        
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start ">
              <div ><span className=" font-bold text-900">Número de pedido:</span> #{flor.Npedido}</div>
              <div ><span className=" font-bold text-900">Total:</span> ${flor.precio}</div>
              <div ><span className=" font-bold text-900">Pedido realizado:</span> {flor.fecha}</div>
              {/* <Rating value={flor.rating} readOnly cancel={false}></Rating> */}
              <Button label="Detalles" onClick={() => onClick('displayBasic')}  className="mt-2" icon="pi pi-external-link"   />
              <Dialog visible={displayBasic} style={{ width: '50vw' }} footer={renderFooter('displayBasic')} onHide={() => onHide('displayBasic')}>
                <h4 className='font-bold  text-center '>Productos de la compra #{flor.Npedido} </h4>
               <Carousel value={productos} autoplayInterval={4000} numVisible={3} numScroll={2} orientation="horizontally" verticalViewPortHeight="300px" itemTemplate={plantillaTemporada} /> 
                </Dialog>
                
            </div>
             
            <div className="flex sm:flex-column align-items-center sm:align-items-center gap-4 sm:gap-4">
              {/* <span className="text-2xl font-semibold">${flor.precio}</span> */}
              
              <Button className="p-button-warning"  label="Seguimiento" icon="pi pi-arrow-circle-right" />
              <Button className="p-button-info"  label="Devoluciones" icon="pi pi-replay" />
              <Button className="p-button-help"  label="Opinión" disabled={flor.estado != 'Entregado'} icon="pi pi-thumbs-up-fill" />
                
            
              
            </div>
          </div>
        </div>
        <div className="mb-3"></div>
        
        
        
         
      
      </div>
    );
  };

  return (
    <Layout
      title="Compras"
      description="Compras del usuario hasta el momento"
    >
      <div className="grid overflow-hidden">
        <div className="col-12">
          <h1>Mis compras</h1>
        </div>
        <div className="col-12">
          <div className="">
            <DataView value={Ordenes} itemTemplate={itemTemplate} />
          </div>
        </div>
        
      </div>
    </Layout>
  )
}

export default Favoritos