import Layout from "@/layout/layout"
import React, { useEffect, useState } from "react";
import { DataView } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { Tag } from 'primereact/tag';
import { Carousel } from 'primereact/carousel';
import { useRouter } from 'next/router';
import { Dialog } from 'primereact/dialog';
const Favoritos = () => {
  const router = useRouter();
  const [flores, setFlores] = useState([])

  useEffect(() => {
    const datosFlores = [
      {
        Npedido: "1234", precio: 5.90, fecha:"10/10/2002",estado: "Entregado",
        imagen: "https://png.pngtree.com/png-vector/20210710/ourmid/pngtree-close-up-of-rose-simulation-growth-png-image_3580749.jpg", descripcion: "Descripcion de rosa"
      },
      {
        Npedido: "5678", precio: 6.20, fecha:"26/07/2002",estado: "Procesando",
        imagen: "https://w7.pngwing.com/pngs/666/928/png-transparent-tulip-free-content-flower-georgia-bulldogs-leaf-heart-computer-wallpaper.png",
        descripcion: "Descripcion de tulipan"
      },
      {
        Npedido: "910111", precio: 3.50, fecha:"11/03/2004",estado: "Enviado",
        imagen: "https://media.admagazine.com/photos/61eb22cb9b19d943aa117b30/master/w_1600%2Cc_limit/Girasol.jpg",
        descripcion: "Descripcion de girasol"
      },
      {
        Npedido: "121314", precio: 25.23,fecha:"05/06/2012",estado: "Entregado",
        imagen: "https://img1.freepng.es/20180314/vbq/kisspng-bird-echeveria-agavoides-echeveria-setosa-graptope-lotus-design-material-5aa973bd8fb253.3676960215210546535886.jpg", descripcion: "Descripcion de setosa"
      },
      {
        Npedido: "161718", precio: 78.60,fecha:"10/10/2002",estado: "Pedido Confirmado",
        imagen: "https://us.123rf.com/450wm/rprongjai/rprongjai1910/rprongjai191000001/131915934-flores-de-gardenia-sobre-fondo-blanco.jpg?ver=6", descripcion: "Descripcion de gardenia"
      }
    ]
    setFlores(datosFlores)
  }, [])






  const itemTemplate = (flor) => {
    const responsiveOptions = [
        { breakpoint: '1199px', numVisible: 1, numScroll: 1 },
        { breakpoint: '991px', numVisible: 2, numScroll: 1 },
        { breakpoint: '767px', numVisible: 1, numScroll: 1 }
      ];
      const [displayBasic, setDisplayBasic] = useState(false);

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


   

    return (
        <div className="col-12">
        <div className="mt-2" ><span className="text-2xl font-bold text-900">Estado: {flor.estado}</span> </div>
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4 ">
            
        <img className="shadow-2 border-round" src={`${flor.imagen}`} alt={`${flor.Npedido}`} style={{ width: '200px'}}/> 
        
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start ">
              <div ><span className=" font-bold text-900">Numero de pedido:</span> #{flor.Npedido}</div>
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
      </div>
    );
  };

  return (
    <Layout
      title="Compras"
      description="Compras del usuario hasta el momento"
    >
      <div className="grid">
        <div className="col-12">
          <h1>Compras Realizadas</h1>
        </div>
        <div className="col-12">
          <div className="card">
            <DataView value={flores} itemTemplate={itemTemplate} />
          </div>
        </div>
        
      </div>
    </Layout>
  )
}

export default Favoritos