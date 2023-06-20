import Layout from "@/layout/layout"
import React, { useEffect, useState, useRef } from "react";
import { DataView } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { useRouter } from 'next/router';
import axios from "axios";
import {
  carritoVacio, EliminarCarrito
} from '@/components/mensajesNotificaciones/mensajes';
import { Toast } from "primereact/toast";

// --> Libreria de cloudinary
import { Image } from 'cloudinary-react'
import { visualizarCarrito, incrementarProducto, decrementarProducto, eliminarProducto } from "@/components/mensajesNotificaciones/links";

const CarritoCompras = () => {
  //--> Redireccionar
  const router = useRouter();

  const token = localStorage.getItem('token')
  const cabecera = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }


  //->Toast
  const toast = useRef(null);
  // --> Lista de variables
  const [flores, setFlores] = useState([])
  const [vacio, setVacio] = useState('')

  //->FUNCIONES DE LA CONECCION CON LA DB

  //->VER CARRITO
  // useEffect(() => {

  //   axios.get(visualizarCarrito, cabecera).then(res => { setFlores(res.data.carrito); })

  //     .catch(error => {

  //     });
  // }, [flores])

  const consultarCarrito = async () => {
    console.log("Consultando carrito")
    try {
      const respuesta = await axios.get(visualizarCarrito, cabecera)
      if (respuesta.status === 200) {
        setFlores(respuesta.data.carrito)
        console.log(respuesta.data.carrito)
      }
    } catch (error) {
      setVacio("No hay productos en el carrito.")
      toast.current.show({
        severity: 'info',
        summary: 'Información',
        detail: error.response.data.msg,
        life: 3000,
      });
    }
  }


  useEffect(() => {
    consultarCarrito()
  }, [])


  // useEffect(() => {
  //   console.log(flores)
  // }, [flores])

  //->DECREMENTAR

  const decrementarProduct = async (producto) => {
    const token = localStorage.getItem('token')
    const cabecera = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    try {
      const respuesta = await axios.post(decrementarProducto, { nombreProducto: producto.producto_C }, cabecera)
      if (respuesta.status === 200) {
        console.log("Reducido")
      }
      consultarCarrito()
    } catch (error) {
      if (toast.current) {
        toast.current.show({
          severity: 'info',
          summary: 'Información',
          detail: error.response.data.msg,
          life: 3000,
        });
      }


    }
  }


  //->Incrementar producto
  const incrementarProduct = async (producto) => {
    const token = localStorage.getItem('token')
    const cabecera = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    try {
      const respuesta = await axios.post(incrementarProducto, { nombreProducto: producto.producto_C }, cabecera)
      if (respuesta.status === 200) {
        console.log("aumentado")
      }
      consultarCarrito()
    } catch (error) {
      if (toast.current) {
        toast.current.show({
          severity: 'info',
          summary: 'Información',
          detail: error.response.data.msg,
          life: 3000,
        });
      }

    }
  }

  //->Eliminar producto
  const eliminarProduct = async (producto) => {
    //--> Paramatros de la cabecera
    const token = localStorage.getItem('token')
    const cabecera = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    //--> Envio de la peticion
    
    try {
      const confirmacion = window.confirm('¿Está seguro de que deseas eliminar este artículo del carrito?');
      if (confirmacion) {
        const respuesta = await axios.post(eliminarProducto, { nombreProducto: producto.producto_C }, cabecera);
        console.log(respuesta.status);
        if (respuesta.status === 200) {
          toast.current.show({
            severity: 'success',
            summary: 'Mensaje de éxito',
            detail: `${respuesta.data.msg}`,
            life: 3000,
          });
        }
        consultarCarrito();
      }
    } catch (error) {
      console.log(error);
    }
  

    // try {
    //   const respuesta = await axios.post(eliminarProducto, { nombreProducto: producto.producto_C }, cabecera)
    //   console.log(respuesta.status)
    //   if (respuesta.status === 200) {
    //     toast.current.show({
    //       severity: 'success',
    //       summary: 'Mensaje de éxito',
    //       detail: `${respuesta.data.msg}`,
    //       life: 3000,
    //     });
    //   }
    //   consultarCarrito()
    // } catch (error) {
    //   console.log(error)
    // }

  }


  const IrComprar = () => {
    //--> Redireccionar
    if (getTotalPrice() == 0) {
      if (toast.current) {
        toast.current.show({
          severity: 'error',
          summary: 'Error',
          detail: carritoVacio,
          life: 3000,
        });
      }
    } else {
      router.push('/pages/usuario/RealizarPago/realizarpago')
    }

  }



  const getTotalPrice = () => {
    let total = 0;
    flores.forEach((flor) => {

      total += parseFloat(flor.totalParcial_C);
    });

    return total.toFixed(2);
  };


  //->LOCAL STORAGE DEL TOTAL
  useEffect(() => {
    localStorage.setItem('total', JSON.stringify(getTotalPrice()));
  }, [getTotalPrice()]);



  const itemTemplate = (flor) => {
    return (
      <div className="col-12">
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">

          <Image

            className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
            style={{ width: '200px', height: '200px' }}
          />

          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
              <div className="text-2xl font-bold text-900">{flor.producto_C}</div>
              {/*<Rating value={product.rating} readOnly cancel={false}></Rating>*/}
              <div className="flex align-items-center gap-3">

                <Button onClick={() => { decrementarProduct(flor); }} disabled={flor.cantidad_C === 1} icon="pi pi-minus" className="p-button-square" severity="warning"></Button>
                <span className="text-5xl font-semibold">{flor.cantidad_C}</span>

                <Button onClick={() => { incrementarProduct(flor); }} disabled={flor.cantidad_C === 49} icon="pi pi-plus" className="p-button-square" severity="success"></Button>

              </div>
              <h5>Precio unitario:
                {flor.precioProducto === flor.precioDescuento && (
                  <span className="text-2xl font-semibold ">${flor.totalParcial_C / flor.cantidad_C}</span>
                )}


              </h5>
            </div>
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 ">
              <span className="text-3xl font-semibold dan"> Total:
                {flor.precioProducto === flor.precioDescuento && (
                  <span className="text-3xl font-semibold">${(flor.totalParcial_C).toFixed(2)}</span>
                )}


              </span>
              <Button
                onClick={() => { eliminarProduct(flor); }}
                icon="pi pi-times" className="p-button-rounded" severity="danger"></Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout
      title="Carrito"
      description="Compras del usuario hasta el momento"
    >
      <div className="grid">
        <div className="col-12">
          <Toast ref={toast} />
          <h1>Carrito de compras</h1>
        </div>

        {vacio && (<div className="col-8">
          <div className="card">
            <p>{vacio}</p>
          </div>
        </div>)}
        {!vacio && (
          <div className="col-8">
            <div className="card">
              <DataView value={flores} itemTemplate={itemTemplate} />
            </div>
          </div>
        )}


        <div className="col-4">
          <div className="card">
            <div className="flex align-items-center">
              {vacio && (<h2>Subtotal: $0</h2>)}
              {!vacio && (<h2>Subtotal: ${getTotalPrice()}</h2>)}
              {/* // <h2>Subtotal: ${getTotalPrice()}</h2> */}

            </div>
            <div className="flex align-items-left">
              <Button label="Pagar" onClick={IrComprar} severity="success" disabled={vacio} />
            </div>
          </div>
        </div>
      </div>

    </Layout>
  )
}

export default CarritoCompras