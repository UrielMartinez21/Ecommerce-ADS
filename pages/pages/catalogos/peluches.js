import React, { useEffect, useState } from "react";
import Layout from "@/layout/layout"
import axios from "axios";
//--> Componentes de PrimeReact
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
// import { Paginator } from 'primereact/paginator';
// import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';

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

  //--> Modo de vista: lista
  const listItem = (peluche) => {
    return (
      <div className="col-12">
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">

          {/* <img
            className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`${peluche.imagen}`}
            alt={`${peluche.nombreProducto}`} style={{ width: '200px', height: '200px' }}
          /> */}
          <Image
            cloudName="dp6uo7fsz" publicId={peluche.imagenProducto[0]}
            className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
            style={{ width: '200px', height: '200px' }}
          />
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
              <div className="text-2xl font-bold text-900">{peluche.nombreProducto}</div>
              {/* <Rating value={peluche.rating} readOnly cancel={false}></Rating> */}
              <div className="flex align-items-center gap-3">
                <Tag value={peluche.statusProducto} severity={getSeverity(peluche)}></Tag>
                <span className="flex align-items-center gap-2">
                  <i className="pi pi-tag"></i>
                  <span className="font-semibold">{peluche.categoriaProducto}</span>
                </span>
              </div>
              <span className="text-2xl font-semibold mt-8">${peluche.precioProducto}</span>
            </div>

            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2 mt-6">
              <Button label="Favoritos" icon="pi pi-heart" rounded severity="help"
                aria-label="Favorite" className="p-button-rounded" />
              <Button label="Agregar" icon="pi pi-shopping-cart" className="p-button-rounded"
                disabled={peluche.statusProducto === 'Agotado'} />
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
            {/* <img
              className="shadow-2 border-round" src={`${peluche.imagen}`} alt={`${peluche.nombreProducto}`}
              style={{ width: '200px', height: '200px' }} /> */}

            <Image
              cloudName="dp6uo7fsz" publicId={peluche.imagenProducto[0]}
              style={{ width: '200px', height: '200px' }}
            />
            <div className="text-2xl font-bold">{peluche.nombreProducto}</div>
            <span className="text-2xl font-bold">${peluche.precioProducto}</span>
            {/* <Rating value={peluche.rating} readOnly cancel={false}></Rating> */}
          </div>

          <div className="flex align-items-center justify-content-between">
            <Button icon="pi pi-heart" rounded severity="help" aria-label="Favorite" className="" />
            <Button label="Detalles" icon="pi pi-search" className=" font-light ml-2" onClick={() => dialogoPeluche(peluche)} />
            <Button
              label="Agregar" icon="pi pi-shopping-cart" className="font-light ml-2 "
              disabled={peluche.statusProducto === 'Agotado'}></Button>
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
              footer={botonesDialogo} style={{ width: '35vw' }}
            >
              <div className="flex justify-content-center">
                {/* <img src={detallesFlor.imagen} style={{ width: '200px', height: '200px' }} /> */}
                <Image
                  cloudName="dp6uo7fsz" publicId={detallesPeluche.imagenProducto[0]}
                  style={{ width: '200px', height: '200px' }}
                />
              </div>
              <div className="mt-5">
                <p className="my-2"><span className="font-semibold text-lg">Nombre: </span>{detallesPeluche.nombreProducto}</p>
                <p className="my-2"><span className="font-semibold text-lg">Precio: </span>${detallesPeluche.precioProducto}</p>
                <p className="my-2"><span className="font-semibold text-lg">
                  Categoría: </span>{detallesPeluche.categoriaProducto}
                </p>
                <p className="my-2"><span className="font-semibold text-lg">Estatus: </span>{detallesPeluche.statusProducto}</p>
                <p className="my-2"><span className="font-semibold text-lg">
                  Descripción: </span>{detallesPeluche.descrProducto}
                </p>
              </div>
            </Dialog>

          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CatalogoPeluches
