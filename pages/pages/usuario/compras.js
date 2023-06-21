import Layout from "@/layout/layout"
import React, { useEffect, useState, useRef } from "react";
import { DataView } from 'primereact/dataview';
import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import { Divider } from 'primereact/divider';
import { Image } from 'cloudinary-react'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import axios from "axios";
import { consultarPedidos, quitarPedido } from "@/components/mensajesNotificaciones/links";
import { formatearFecha } from "@/helpers/funciones";
const MisCompras = () => {
  const toast = useRef(null);
  const router = useRouter();
  const [Ordenes, setOrden] = useState([])
  const [Articulo, setArticulos] = useState([])
  const [vacio, setVacio] = useState('')
  //--> Preparar objeto para enviar
  const token = localStorage.getItem('token')
  const cabecera = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  //-->Consultar Elementos de la DB
  const consultarCommpras = async () => {

    console.log("Consultando Compras")
    try {
      const respuesta = await axios.get(consultarPedidos, cabecera)
      if (respuesta.status === 200) {
        console.log(respuesta.data)
        setOrden(respuesta.data.pedidosCliente)
        console.log(respuesta.data.pedidosCliente[0].detallesPedido)


      }
    } catch (error) {
      setVacio("No hay compras.")
      console.log("Error")
    }
  }


  useEffect(() => {
    consultarCommpras()
  }, [])



  //-->Variables de mensajes
  const [visible, setVisible] = useState(false);




  const reject = () => {

  }

  const cancelarPedido = async (pedidoId, fecha) => {
    try {


      const currentDate = new Date();
      const targetDate = new Date(fecha);
      const difference = currentDate.getTime() - targetDate.getTime();
      const minutesPassed = Math.floor(difference / (1000 * 60));

      if (minutesPassed >= 5) {
        toast.current.show({
          severity: 'error',
          summary: 'Lo sentimos',
          detail: "El pedido solo puede ser cancelado a los 5 minutos de haberlo pedido",
          life: 3000,
        });

      } else {

        const respuesta = await axios.post(quitarPedido, { nombrePedido: pedidoId }, cabecera)
        if (respuesta.status === 200) {
          if (toast.current) {
            toast.current.show({
              severity: 'success',
              summary: 'Mensaje de éxito',
              detail: respuesta.data.msg,
              life: 3000,
            });
          }


        }
      }
      consultarCommpras()
    } catch (error) {
      consultarCommpras()
      if (toast.current) {
        toast.current.show({
          severity: 'error',
          summary: 'Información',
          detail: error.response.data.msg,
          life: 3000,
        });
      }
    }
  }


  const confirm1 = (datosOrden) => {
    confirmDialog({
      message: `¿Está seguro de que desea cancelar el pedido ${datosOrden.nombrePedido}? Esta acción no se puede deshacer.`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      reject,
      accept: () => cancelarPedido(datosOrden.nombrePedido, datosOrden.fechaPedido)
    });
  };








  const productoTemplate = (producto) => (
    <div className="col-12">

      <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4 ">
        <Image
          cloudName="dp6uo7fsz" publicId={producto.img_P}
          className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
          style={{ width: '200px', height: '200px' }}
        />
        <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-5">
          <div className="flex flex-column align-items-center sm:align-items-start ">
            <div className="">Producto: {producto.producto_P}</div>
            <span className="">Cantidad: {producto.cantidad_P}</span>
            <span className="">Total Parcial: {producto.totalParcial_P}</span>


          </div>
          <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">







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
            <div className="col-3" ><span className=" font-semibold  ">Pedido:</span><p>{datosOrden.nombrePedido}</p> </div>
            <Divider layout="vertical" />
            <div className="col-2" ><span className="font-semibold ">Fecha de Orden:</span> <p>{formatearFecha(datosOrden.fechaPedido)}</p></div>
            <div className="col-2" ><span className="font-semibold ">Fecha de entrega:</span> <p>{formatearFecha(datosOrden.fechaEntrega)}</p></div>
            <Divider layout="vertical" />
            <div className="col-2" ><span className="font-semibold ">Total de compra: </span>${datosOrden.costoTotal}</div>

          </div>

          <DataView value={datosOrden.detallesPedido} itemTemplate={productoTemplate} />
          <div className="flex justify-content-evenly pb-2">
            <div className="col-1" ><Button className="p-button-warning" label="Seguir" onClick={() => { router.push('/pages/usuario/seguirCompras') }} /></div>
            <div className="col-1" ><Button
              className="p-button-help"
              label="Cancelar"
              severity="danger"
              icon="pi pi-times"
              onClick={() => confirm1(datosOrden)}  // Pasa el ID de pedido a la función cancelarPedido
            // onClick={() => cancelarPedido(datosOrden.nombrePedido)}
            /></div>
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
      <Toast ref={toast} />
      <div className="grid overflow-hidden">
        <div className="col-12">
          <h1>Mis Compras</h1>
        </div>
        {vacio && (<div className="col-8">
          <div className="card">
            <p>{vacio}</p>
          </div>
        </div>)}
        {!vacio &&
          <div className="col-12">
            <div className="">
              <DataView value={Ordenes} itemTemplate={itemTemplate} />
            </div>
          </div>
        }
      </div>
    </Layout>
  )
}


export default MisCompras

