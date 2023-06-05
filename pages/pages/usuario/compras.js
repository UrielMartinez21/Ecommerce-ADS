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




  const itemTemplate = (datosOrden) => { 

         
 

    return (
        <div className="col-12">
          <div className="shadow-2">
          <div className="col-12 flex">
          <div className="col-3" ><span className="text-xl font-semibold  ">Pedido: {datosOrden.Npedido}</span> </div>
          <Divider layout="vertical" />
          <div className="col-3" ><span className="text-xl font-semibold ">Fecha de Orden: {datosOrden.fecha}</span> </div>
          <Divider layout="vertical" />
          <div className="col-3" ><span className="text-xl font-semibold ">Total de compra: ${datosOrden.precio}</span> </div>
          <Divider layout="vertical" />
          <div className="col-3" ><Button className="p-button-warning ml-0"  label="Seguir" onClick={() => { router.push('/pages/usuario/seguirCompras') }} icon="pi pi-arrow-circle-right" /></div>
          
        </div>
        <DataView value={datosOrden.productos} itemTemplate={productoTemplate} />
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