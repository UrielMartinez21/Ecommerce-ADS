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
import { consultarHistorial } from "@/components/mensajesNotificaciones/links";
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

    try {
      const respuesta = await axios.get(consultarHistorial, cabecera)
      if (respuesta.status === 200) {
        setOrden(respuesta.data.pedidosEntregados)
        console.log(respuesta.data.pedidosEntregados)


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

  function validarDiferenciaFechas(fecha1, fecha2) {
    const msPorDia = 24 * 60 * 60 * 1000; // Milisegundos en un día
    const fechaInicio = new Date(fecha1);
    const fechaFin = new Date(fecha2);
    const diferencia = Math.abs(fechaFin - fechaInicio); // Diferencia en milisegundos

    const diasDiferencia = Math.floor(diferencia / msPorDia);

    return diasDiferencia;
  }

  const cancelarPedido = async (pedidoId, fecha1, fecha2) => {

    //--> Preparar objeto para enviar
    const token = localStorage.getItem('token')
    const cabecera = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }



    if (validarDiferenciaFechas(fecha1, fecha2) > 2) {
      toast.current.show({
        severity: 'error',
        summary: 'Mensaje de error',
        detail: "El pedido solo puede ser cancelado a los 15 días de haber sido entregado",
        life: 3000,
      });

    } else {
      setTimeout(() => {
        //--> Redireccionar
        router.push('/pages/usuario/reembolsos')
      }, 1000);
    }




  }


  const confirm1 = (datosOrden) => {
    confirmDialog({
      message: `¿Está seguro de solicitar un Reembolso/Devolución del pedido: ${datosOrden.nombrePedido}?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      reject,
      accept: () => cancelarPedido(datosOrden, datosOrden.fechaPedido, datosOrden.fechaEntrega)
    });
  };



  const Puntuar = (datosOrden) => {
    // Guardar datosOrden en el localStorage
    localStorage.setItem('datosOrden', JSON.stringify(datosOrden));
    setTimeout(() => {
      //--> Redireccionar
      router.push('/pages/usuario/valoraProducto')
    }, 1000);

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
            <div className="" ><Button
              className="p-button-help"
              label="Puntuar"
              severity="successr"
              icon="pi pi-comment"
              onClick={() => Puntuar(producto.producto_P)} /></div>


          </div>
          <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">







          </div>






        </div>
      </div>
    </div>

  );




  function formatearFecha(fechaOrden) {
    const fecha = new Date(fechaOrden);
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();

    // Formateo de la fecha en formato "dd-mm-aaaa"
    const fechaFormateada = `${dia < 10 ? '0' + dia : dia}-${mes < 10 ? '0' + mes : mes}-${anio}`;

    return fechaFormateada;
  }

  const itemTemplate = (datosOrden) => {




    return (
      <div className="col-12">
        <div className="shadow-2">
          <div className="col-12 flex">
            <div className="col-2" ><span className="font-semibold  ">Pedido:</span> <p>{datosOrden.nombrePedido}</p></div>
            <Divider layout="vertical" />
            <div className="col-1" ><span className="font-semibold ">Total de compra:</span>${datosOrden.costoTotal} </div>
            <Divider layout="vertical" />
            <div className="col-3" ><span className="font-semibold ">Fecha de Orden:</span>{formatearFecha(datosOrden.fechaPedido)} </div>
            <Divider layout="vertical" />
            <div className="col- font-semibold "><span style={{ color: 'green' }}>Entregado: {formatearFecha(datosOrden.fechaEntrega)} <i className="pi pi-check-circle" style={{ fontSize: '1.5rem' }}></i></span> </div>
            <Divider layout="vertical" />
            <div className="" ><Button
              className="p-button-help"
              label="Devolver"
              severity="danger"
              icon="pi pi-times"
              onClick={() => confirm1(datosOrden)}  // Pasa el ID de pedido a la función cancelarPedido
            // onClick={() => cancelarPedido(datosOrden.nombrePedido)}
            /></div>
          </div>
          <DataView value={datosOrden.detallesPedido} itemTemplate={productoTemplate} />

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
          <h1>Historial</h1>
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


export default MisCompras
