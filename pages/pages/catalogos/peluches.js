import React, { useEffect, useState,useRef } from "react";
import Layout from "@/layout/layout"
import axios from "axios";
//--> Componentes de PrimeReact

//import { Button } from 'primereact/button';
//import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { agregarProducto } from "@/components/mensajesNotificaciones/links";
// import { Paginator } from 'primereact/paginator';
// import { Rating } from 'primereact/rating';

import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Dialog } from 'primereact/dialog';

import { Toast } from 'primereact/toast';
import {
  carritoadd
} from '@/components/mensajesNotificaciones/mensajes';

import { Carousel } from 'primereact/carousel';
import { InputText } from 'primereact/inputtext';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';


// --> Libreria de cloudinary
import { Image } from 'cloudinary-react'
import { mostrarPeluches } from "@/components/mensajesNotificaciones/links";


const CatalogoPeluches = () => {
  //----------------| Lista de variables |----------------
  const [peluches, setPeluches] = useState([])
  const [layout, setLayout] = useState('grid');
  //-->Detalles de peluche
  const [detallesPeluche, setDetallesPeluche] = useState({
    nombreProducto: '',
    descripcionProducto: '',
    precioProducto: '',
    categoriaProducto: '',
    statusProducto: '',
    imagenProducto: []
  })
  const [mostrarDialog, setMostrarDialog] = useState(false)
  //--> Buscador
  const [buscador, setBuscador] = useState('')

  //--> Ejecucion en segundo planos
  useEffect(() => {
    axios.get(mostrarPeluches).then(res => { setPeluches(res.data.plushies) })
  }, [])

  //--> Indicar estado del peluche
  const getSeverity = (peluche) => {
    switch (peluche.statusProducto) {
      case 'Disponible':
        return 'success';

      case 'Pocos':
        return 'warning';

      case 'Agotado':
        return 'danger';

      default:
        return null;
    }
  };


   //-->Toast
   const toast = useRef(null);
   const showToast = () => {
     toast.current.show({ severity: 'success', summary: 'Mensaje de éxito', detail:carritoadd });
   };
 
 

//--> Indicar estado de favoritos

//-->Carrito de Compras para peluches
const ShoppingCarrito = localStorage.getItem('carrito');
const productoCarrito = JSON.parse(ShoppingCarrito);
const [car, setCar] = useState(productoCarrito || []);


const ShoppingCar = (data) => {
  data.cantidad=1
  const { nombreProducto } = data;
 
  const nuevaFlor = peluches.find((flor) => flor.nombreProducto === nombreProducto);
  if (nuevaFlor) {
    const productoExistente = car.find((p) => p.nombreProducto === nombreProducto);
    if (productoExistente) {
      productoExistente.cantidad += 1;
      {showToast}
      setCar([...car]); // Actualizar el estado del carrito con la cantidad modificada
    } else {
      {showToast}
      setCar([...car, nuevaFlor]); // Agregar el producto al carrito
    }
  }
    
};
useEffect(() => {
  localStorage.setItem('carrito', JSON.stringify(car));
  console.log(car)
}, [car]);


const AgregarCarrito = async (peluche) => {
  
  const token = localStorage.getItem('token')
    const cabecera = {
      headers: {
        Authorization: `Bearer ${token}`
      }}
  try {

    
    const respuesta = await axios.post(agregarProducto, {nombreProducto: peluche.nombreProducto},cabecera)
    if (respuesta.status === 200) {
      if (toast.current) {
        toast.current.show({
          severity: 'success',
          summary: 'Mensaje de exito',
          detail: carritoadd,
          life: 3000, 
        });}
    }
  } catch (error) {
    if (toast.current) {
      toast.current.show({
        severity: 'info',
        summary: 'Información',
        detail: error.response.data.msg,
        life: 3000, 
      });}
   
  }
}

  //--> Modo de vista: lista
  const listItem = (peluche) => {
    return (
      <div className="col-12">
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
          <Image
            cloudName="dp6uo7fsz" publicId={peluche.imagenProducto[0]}
            className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
            style={{ width: '200px', height: '200px' }}
          />
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
              <div className="text-2xl font-bold text-900">{peluche.nombreProducto}</div>
              <div className="flex align-items-center gap-3">
                <Tag value={peluche.statusProducto} severity={getSeverity(peluche)}></Tag>
                <span className="flex align-items-center gap-2">
                  <i className="pi pi-tag"></i>
                  <span className="font-semibold">{peluche.categoriaProducto}</span>
                </span>
              </div>

              {peluche.precioProducto === peluche.precioDescuento && (
                <span className="text-2xl font-semibold mt-8">${peluche.precioProducto}</span>
              )}

              {peluche.precioProducto !== peluche.precioDescuento && (
                <div className="mt-8">
                  <span className="text-2xl font-semibold line-through">${peluche.precioProducto}</span>
                  <span className="text-2xl font-semibold ml-6">${peluche.precioDescuento}</span>
                </div>
              )}
              <Rating value={peluche.valoracionGlobal} readOnly cancel={false}></Rating>
            </div>

            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2 mt-6">
              <Button label="Favoritos" icon="pi pi-heart" rounded severity="help"
                aria-label="Favorite" className="p-button-rounded" />
              <Button label="Agregar" icon="pi pi-shopping-cart" className="p-button-rounded" severity="success"
                disabled={peluche.statusProducto === 'Agotado'}  onClick={() => {AgregarCarrito(peluche)}} />
                 <Toast ref={toast} />
              <Button label="Detalles" icon="pi pi-external-link" className="p-button-rounded"
                onClick={() => dialogoPeluche(peluche)} />
            </div>

          </div>
        </div>
      </div>
    );
  };

  //--> Modo de vista: grid
  const gridItem = (peluche) => {
    return (
      <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
        <div className="p-4 border-1 surface-border surface-card border-round">

          <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <div className="flex align-items-center gap-2">
              <i className="pi pi-tag"></i>
              <span className="font-semibold">{peluche.categoriaProducto}</span>
            </div>
            <Tag value={peluche.statusProducto} severity={getSeverity(peluche)}></Tag>
          </div>

          <div className="flex flex-column align-items-center gap-3 py-5">
            <Image
              cloudName="dp6uo7fsz" publicId={peluche.imagenProducto[0]}
              style={{ width: '200px', height: '200px' }}
            />
            <div className="text-2xl font-bold">{peluche.nombreProducto}</div>

            {peluche.precioProducto === peluche.precioDescuento && (
              <span className="text-2xl font-bold">${peluche.precioProducto}</span>
            )}

            {peluche.precioProducto !== peluche.precioDescuento && (
              <div>
                <span className="text-2xl font-bold mx-5 line-through">
                  ${peluche.precioProducto}
                </span>
                <span className="text-2xl font-bold mx-5">
                  ${peluche.precioDescuento}
                </span>
              </div>
            )}
            <Rating value={peluche.valoracionGlobal} readOnly cancel={false}></Rating>
          </div>
          <div className="flex align-items-center justify-content-between">
            <Button icon="pi pi-heart" rounded severity="help" aria-label="Favorite" className="" />
            <Button label="Detalles" icon="pi pi-search" className=" font-light ml-2" onClick={() => dialogoPeluche(peluche)} />
            <Button
              label="Agregar" icon="pi pi-shopping-cart" className="font-light ml-2 " severity="success"
              disabled={peluche.statusProducto === 'Agotado'}  onClick={() => {AgregarCarrito(peluche)}}></Button>
               <Toast ref={toast} />
          </div>

        </div>
      </div>
    );
  };

  //--> Cambiar modo de vista
  const itemTemplate = (peluche, layout) => {
    if (!peluche) { return }

    if (layout === 'list') return listItem(peluche);
    else if (layout === 'grid') return gridItem(peluche);
  };

  const iniciarBusqueda = () => {
    let peluchesFiltrados
    peluchesFiltrados = peluches.filter(peluche => buscador == peluche.nombreProducto)
    if (peluchesFiltrados.length === 0) {
      peluchesFiltrados = peluches.filter(peluche => buscador === peluche.categoriaProducto)
    }
    if (peluchesFiltrados.length === 0) {
      peluchesFiltrados = peluches.filter(peluche => buscador === peluche.statusProducto)
    }
    if (peluchesFiltrados.length === 0) {
      peluchesFiltrados = peluches.filter(peluche => buscador == peluche.precioProducto)
    }
    setPeluches(peluchesFiltrados)
  }

  const limpiarBusqueda = () => {
    setBuscador("")
    axios.get(mostrarPeluches).then(res => { setPeluches(res.data.plushies) })
  }

  //--> Barra para cambiar modo de vista
  const header = () => {
    return (
      <div className="flex justify-content-between">
        <div className="p-inputgroup w-4">
          <Button icon="pi pi-search" onClick={iniciarBusqueda} />
          <InputText placeholder="Buscar por categoría o nombre de producto" value={buscador} onChange={e => setBuscador(e.target.value)} />
          <Button icon="pi pi-times" onClick={limpiarBusqueda} disabled={buscador ? false : true} />
        </div>

        <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
      </div>
    );
  };

  //----------------| Funciones para dialogo |----------------
  const dialogoPeluche = (peluche) => {
    setMostrarDialog(true)
    setDetallesPeluche(peluche)
  }

  const cerrarDialogo = () => {
    setMostrarDialog(false)
    // setDetallesPeluche({})
  }

  const botonesDialogo = (
    <><Button label="Cerrar" icon="pi pi-times" onClick={cerrarDialogo} className="p-button-text" /></>
  )

  //----------------| Imagenes de dialogo |----------------
  const responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  const plantillaImagenes = (producto) => {
    return (
      <div className="flex justify-content-center">
        <div className="mb-3">
          <Image
            cloudName="dp6uo7fsz" publicId={producto}
            style={{ width: '150px', height: '150px' }}
          />
        </div>
      </div>
    );
  };

  //----------------| Valor que regresara |----------------
  return (
    <Layout
      title="Peluches"
      description="Acceso al catalogo de Peluches"
    >
      <div className="grid">
        <div className="col-12">
          <div className="card">

            <h5>Peluches</h5>
            <DataView value={peluches} itemTemplate={itemTemplate} layout={layout} header={header()} />

            <Dialog
              header={`Detalles de ${detallesPeluche.nombreProducto}`}
              visible={mostrarDialog} onHide={cerrarDialogo}
              footer={botonesDialogo} style={{ width: '50vw' }}
            >
              <div className="flex justify-content-center">
                <Carousel
                  value={detallesPeluche.imagenProducto} numVisible={1} numScroll={1} responsiveOptions={responsiveOptions}
                  itemTemplate={plantillaImagenes} />
              </div>
              <div className="mt-5">
                <p className="my-2"><span className="font-semibold text-lg">Nombre: </span>{detallesPeluche.nombreProducto}</p>
                <p className="my-2"><span className="font-semibold text-lg">Precio: </span>${detallesPeluche.precioProducto}</p>
                {detallesPeluche.precioProducto !== detallesPeluche.precioDescuento && (
                  <p className="my-2">
                    <span className="font-semibold text-lg">Precio con descuento: </span>${detallesPeluche.precioDescuento}
                  </p>
                )}
                <p className="my-2"><span className="font-semibold text-lg">Categoría: </span>{detallesPeluche.categoriaProducto}</p>
                <p className="my-2"><span className="font-semibold text-lg">Estatus: </span>{detallesPeluche.statusProducto}</p>
                <p className="my-2"><span className="font-semibold text-lg">Descripción: </span>{detallesPeluche.descrProducto}</p>
              </div>
            </Dialog>


          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CatalogoPeluches
