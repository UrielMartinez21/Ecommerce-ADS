import React, { useEffect, useState,useRef } from "react";
import Layout from "@/layout/layout"
import axios from "axios";
//--> Componentes de PrimeReact
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Carousel } from 'primereact/carousel';
import { InputText } from 'primereact/inputtext';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { mostrarFlores } from "@/components/mensajesNotificaciones/links";
import { Toast } from 'primereact/toast';
import { agregarProducto ,agregarFavorito} from "@/components/mensajesNotificaciones/links";
import {
  carritoadd
} from '@/components/mensajesNotificaciones/mensajes';
import { Rating } from 'primereact/rating';
// --> Libreria de cloudinary
import { Image } from 'cloudinary-react'



const CatalogoFlores = () => {
  //----------------| Lista de variables |----------------
  const [flores, setFlores] = useState([])
  const [layout, setLayout] = useState('grid');
  //-->Detalles de flor
  const [detallesFlor, setDetallesFlor] = useState({
    nombreProducto: '',
    descripcionProducto: '',
    precioProducto: '',
    categoriaProducto: '',
    statusProducto: '',
    imagenProducto: [],
  
  })
  const [mostrarDialog, setMostrarDialog] = useState(false)
  //--> Buscador
  const [buscador, setBuscador] = useState('')

  //--> Ejecucion en segundo planos
  useEffect(() => {
    axios.get(mostrarFlores).then(res => {
      setFlores(res.data.fleurs)
      // console.log(res.data.fleurs)
    })
  }, [])

  //--> Indicar estado de la flor
  const getSeverity = (flor) => {
    switch (flor.statusProducto) {
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
 


   // Nuevo estado para controlar si un producto es favorito o no
   const [favoritos, setFavoritos] = useState([]);

   // Función para cambiar el estado de favorito de un producto
   const toggleFavorito = (flor) => {
     if (esFavorito(flor)) {
       // Si ya es favorito, se elimina de la lista de favoritos
       const nuevosFavoritos = favoritos.filter((item) => item.id !== flor.id);
       setFavoritos(nuevosFavoritos);
     } else {
       // Si no es favorito, se agrega a la lista de favoritos
       const nuevosFavoritos = [...favoritos, flor];
       setFavoritos(nuevosFavoritos);
     }
   };
 
   // Función para verificar si un producto es favorito
   const esFavorito = (flor) => {
     return favoritos.some((item) => item.id === flor.id);
   };
 


 //-->Carrito de Compras para flores
const AgregarCarrito = async (flor) => {
  const token = localStorage.getItem('token')
    const cabecera = {
      headers: {
        Authorization: `Bearer ${token}`
      }}
  try {

    
    const respuesta = await axios.post(agregarProducto, {nombreProducto: flor.nombreProducto},cabecera)
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


//-->Carrito de Compras para flores
const AgregarFavorito = async (flor) => {
  const token = localStorage.getItem('token')
    const cabecera = {
      headers: {
        Authorization: `Bearer ${token}`
      }}
  try {

    
    const respuesta = await axios.post(agregarFavorito, {nombreProducto: flor.nombreProducto},cabecera)
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
  const listItem = (flor) => {
    return (
      <div className="col-12">
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
          <Image
            cloudName="dp6uo7fsz" publicId={flor.imagenProducto[0]}
            className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
            style={{ width: '200px', height: '200px' }}
          />
          <div
            className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4"
          >
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
              <div className="text-2xl font-bold text-900">{flor.nombreProducto}</div>
              <div className="flex align-items-center gap-3">
                <Tag value={flor.statusProducto} severity={getSeverity(flor)}></Tag>
                <span className="flex align-items-center gap-2">
                  <i className="pi pi-tag"></i>
                  <span className="font-semibold">{flor.categoriaProducto}</span>
                </span>
              </div>

              {flor.precioProducto === flor.precioDescuento && (
                <span className="text-2xl font-semibold mt-8">${flor.precioProducto}</span>
              )}

              {flor.precioProducto !== flor.precioDescuento && (
                <div className="mt-8">
                  <span className="text-2xl font-semibold line-through">${flor.precioProducto}</span>
                  <span className="text-2xl font-semibold ml-6">${flor.precioDescuento}</span>
                </div>
              )}
              <Rating value={flor.valoracionGlobal} readOnly cancel={false}></Rating>
            </div>

            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2 mt-6">
            <Button
          label="Favoritos"
          icon={esFavorito(flor) ? "pi pi-heart" : "pi pi-heart-fill"}
          rounded
          severity="help"
          aria-label="Favorite"
          className="p-button-rounded"
          onClick={() => toggleFavorito(flor)}
        />
              <Button label="Agregar" icon="pi pi-shopping-cart" className="font-light ml-2 " severity="success" disabled={flor.estatusProducto === 'Agotado'} onClick={() => {AgregarCarrito(flor)}}/>
              <Toast ref={toast} />
              <Button label="Detalles" icon="pi pi-external-link" className="p-button-rounded"
                onClick={() => dialogoFlor(flor)} />
            </div>

          </div>
        </div>
      </div>
    );
  };

  //--> Modo de vista: grid
  const gridItem = (flor) => {
    return (
      <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
        <div className="p-4 border-1 surface-border surface-card border-round">

          <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <div className="flex align-items-center gap-2">
              <i className="pi pi-tag"></i>
              <span className="font-semibold">{flor.categoriaProducto}</span>
            </div>
            <Tag value={flor.statusProducto} severity={getSeverity(flor)}></Tag>
          </div>

          <div className="flex flex-column align-items-center gap-3 py-5">
            <Image
              cloudName="dp6uo7fsz" publicId={flor.imagenProducto[0]}
              style={{ width: '200px', height: '200px' }}
            />
            <div className="text-2xl font-bold">{flor.nombreProducto}</div>
            {flor.precioProducto === flor.precioDescuento && (
              <span className="text-2xl font-bold">${flor.precioProducto}</span>
            )}

            {flor.precioProducto !== flor.precioDescuento && (
              <div>
                <span className="text-2xl font-bold mx-5 line-through">
                  ${flor.precioProducto}
                </span>
                <span className="text-2xl font-bold mx-5">
                  ${flor.precioDescuento}
                </span>
              </div>
            )}


            <Rating value={flor.valoracionGlobal} readOnly cancel={false}></Rating>
          </div>

          <div className="flex align-items-center justify-content-between">
          <Button
          icon={esFavorito(flor) ? "pi pi-heart-fill" : "pi pi-heart"}
          rounded
          severity="help"
          className="p-button-rounded"
          onClick={() => {toggleFavorito(flor); AgregarFavorito(flor)}}
        />
            <Button label="Detalles" icon="pi pi-search" className=" font-light ml-2" onClick={() => dialogoFlor(flor)} />
            <Button label="Agregar" icon="pi pi-shopping-cart" className="font-light ml-2 " severity="success" disabled={flor.estatus === 'Agotado'} onClick={() => {AgregarCarrito(flor)}}/>
              <Toast ref={toast} />
          </div>

        </div>
      </div>
    );
  };

  //--> Cambiar modo de vista
  const itemTemplate = (flor, layout) => {
    if (!flor) { return }

    if (layout === 'list') return listItem(flor);
    else if (layout === 'grid') return gridItem(flor);
  };

  const iniciarBusqueda = () => {
    let floresFiltradas
    floresFiltradas = flores.filter(flor => buscador == flor.nombreProducto)
    if (floresFiltradas.length === 0) { floresFiltradas = flores.filter(flor => buscador === flor.categoriaProducto) }
    if (floresFiltradas.length === 0) { floresFiltradas = flores.filter(flor => buscador === flor.statusProducto) }
    if (floresFiltradas.length === 0) { floresFiltradas = flores.filter(flor => buscador == flor.precioProducto) }
    setFlores(floresFiltradas)
  }

  const limpiarBusqueda = () => {
    setBuscador("")
    axios.get(mostrarFlores).then(res => { console.log(res.data.fleurs); setFlores(res.data.fleurs) })
  }

  //--> Barra para cambiar modo de vista
  const header = () => {
    return (
      <div className="flex justify-content-between">
        <div className="p-inputgroup w-4">
          <Button icon="pi pi-search" onClick={iniciarBusqueda} />
          <InputText placeholder="Buscar por categoría o nombre de producto" value={buscador}
            onChange={e => setBuscador(e.target.value)} />
          <Button icon="pi pi-times" onClick={limpiarBusqueda} disabled={buscador ? false : true} />
        </div>

        <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
      </div>
    );
  };

  //----------------| Funciones para dialogo |----------------
  const dialogoFlor = (flor) => {
    setMostrarDialog(true)
    setDetallesFlor(flor)
  }

  const cerrarDialogo = () => {
    setMostrarDialog(false)
    // setDetallesFlor({})
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
            style={{ width: '200px', height: '200px' }}
          />
        </div>
      </div>
    );
  };

  //----------------| Valor que regresara |----------------
  return (
    <Layout
      title="Flores"
      description="Acceso al catálogo de flores"
    >
      <div className="grid">
        <div className="col-12">
          <div className="card">

            <h5>Flores</h5>
            <DataView value={flores} itemTemplate={itemTemplate} layout={layout} header={header()} />

            <Dialog
              header={`Detalles de ${detallesFlor.nombreProducto}`}
              visible={mostrarDialog} onHide={cerrarDialogo}
              footer={botonesDialogo} style={{ width: '46vw' }}
            >
              <div className="flex justify-content-center">
                <Carousel
                  value={detallesFlor.imagenProducto} numVisible={1} numScroll={1} responsiveOptions={responsiveOptions}
                  itemTemplate={plantillaImagenes} />
              </div>
              <div className="mt-5">
                <p className="my-2"><span className="font-semibold text-lg">Nombre: </span>{detallesFlor.nombreProducto}</p>
                <p className="my-2"><span className="font-semibold text-lg">Precio: </span>${detallesFlor.precioProducto}</p>
                {detallesFlor.precioProducto !== detallesFlor.precioDescuento && (
                  <p className="my-2">
                    <span className="font-semibold text-lg">Precio con descuento: </span>${detallesFlor.precioDescuento}
                  </p>
                )}
                <p className="my-2"><span className="font-semibold text-lg">Categoría: </span>{detallesFlor.categoriaProducto}</p>
                <p className="my-2"><span className="font-semibold text-lg">Estatus: </span>{detallesFlor.statusProducto}</p>
                <p className="my-2"><span className="font-semibold text-lg">Descripción: </span>{detallesFlor.descrProducto}</p>
              </div>
            </Dialog>

          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CatalogoFlores