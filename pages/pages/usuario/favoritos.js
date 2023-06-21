import Layout from "@/layout/layout";
import React, { useEffect, useState, useRef } from "react";
import { Toast } from 'primereact/toast';
import { DataView } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
// import { Image } from 'primereact/image';
import { Tag } from 'primereact/tag';
import { Dialog } from 'primereact/dialog';

import { useRouter } from 'next/router';
import { eliminarFavoritos, verFavoritos } from "@/components/mensajesNotificaciones/links";
import axios from "axios";
import { Image } from 'cloudinary-react'

const Favoritos = () => {
  //-->Toast
  const toast = useRef(null);

  // const router = useRouter();
  const [flores, setFlores] = useState([]);
  const [selectedFlor, setSelectedFlor] = useState(null);
  const [confirmationDialogVisible, setConfirmationDialogVisible] = useState(false);
  const [eliminarExitoso, setEliminarExitoso] = useState(false);

  const consultarFavoritos = async () => {
    const token = localStorage.getItem('token')
    const cabecera = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    try {
      const respuesta = await axios.get(verFavoritos, cabecera)
      if (respuesta.status === 200) {
        console.log(respuesta.data.favoritos)
        setFlores(respuesta.data.favoritos)
      }
    } catch (error) { console.log("Error") }
  }

  useEffect(() => {
    consultarFavoritos()
  }, [])

  const getSeverity = (flor) => {
    switch (flor.estatus) {
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

  const eliminar = async () => {
    console.log("Eliminando")
    console.log(selectedFlor)
    const token = localStorage.getItem('token')
    const cabecera = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    try {
      const respuesta = await axios.post(eliminarFavoritos, { nombreProducto: selectedFlor.productoFav }, cabecera)
      if (respuesta.status === 200) {
        consultarFavoritos()
        setSelectedFlor(null);
        setConfirmationDialogVisible(false);
        setEliminarExitoso(true);
        toast.current.show({
          severity: 'success',
          summary: 'Producto eliminado de favoritos',
          detail: 'El producto se ha eliminado de favoritos exitosamente.',
          life: 3000,
        });
      }
      console.log(respuesta)
    } catch (error) { console.log("Error") }
  };

  const confirmarEliminar = (flor) => {
    setSelectedFlor(flor);
    setConfirmationDialogVisible(true);
  };

  const itemTemplate = (flor) => {
    return (
      <div className="col-12">
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
          <Image
            cloudName="dp6uo7fsz" publicId={flor.imgFav}
            className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
            style={{ width: '200px', height: '200px' }}
          />
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start">
              <div className="text-2xl font-bold text-900">{flor.productoFav}</div>
              <div className="mt-8">
                <h5>Descripción: </h5>
                <p>{flor.descrFav}</p>
              </div>
            </div>
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
              <Button
                label="Eliminar" onClick={() => confirmarEliminar(flor)} icon="pi pi-trash" severity="danger"
                aria-label="Favorite" className="font-light ml-2" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout
      title="Favoritos"
      description="Compras del usuario hasta el momento"
    >
      <div className="grid">
        <div className="col-12">
          <Toast ref={toast} />
          <h1>Favoritos</h1>
        </div>
        <div className="col-12">
          {/* {eliminarExitoso && <Message severity="success" text="Producto eliminad0 exitosamente" />} */}
          <div className="card">
            <DataView value={flores} itemTemplate={itemTemplate} />
          </div>
        </div>
      </div>
      <Dialog visible={confirmationDialogVisible} onHide={() => setConfirmationDialogVisible(false)} breakpoints={{ '960px': '75vw' }} header="Eliminar de Favoritos" style={{ width: '30vw' }} footer={
        <div className="p-dialog-footer">
          <Button label="Eliminar" onClick={eliminar} security="danger" />
          <Button label="Cancelar" onClick={() => setConfirmationDialogVisible(false)} className="p-button-text" />
        </div>
      }>

        <p>¿Está seguro de que deseas eliminar el producto {selectedFlor?.nombre} de tus favoritos?</p>
      </Dialog>
    </Layout>
  );
};

export default Favoritos;
