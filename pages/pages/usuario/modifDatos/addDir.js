import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from "@/layout/layout";
//--> Componentes de primeReact
import { Button } from 'primereact/button';
import { useRouter } from 'next/router';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { verDirecciones } from '@/components/mensajesNotificaciones/links';


//--> Componentes propios


const AddLocation = () => {
  //--> Variable de redireccinamiento
  const router = useRouter();

  //--> Mensajes y notificaciones
  const toast = useRef(null);
  const msgs = useRef(null);

  //-----------------------| Lista de variables |-----------------------
  const [direcciones, setDirecciones] = useState([]);

  const consultarDirecciones = async () => {
    console.log('Consultando direcciones')
    const token = localStorage.getItem('token')
    const cabecera = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const respuesta = await axios.get(verDirecciones, cabecera)
    setDirecciones(respuesta.data)
  }


  useEffect(() => {
    consultarDirecciones()
  }, [])

  //-----------------------| Mensajes de advertencia |-----------------------
  const mostrarMensaje = (mensaje) => { msgs.current.show({ severity: 'error', detail: `${mensaje}`, sticky: true, closable: false }) };
  const limpiarMensaje = () => { msgs.current.clear() }

  //-----------------------| Envio |-----------------------
  const [product, setProduct] = useState(null);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);

  const cerrarDialogoEliminarRegistro = () => { setDeleteProductDialog(false) };

  const quitarProducto = () => {
    let _direcciones = direcciones.filter(val => val.calle !== product.calle);
    console.log(_direcciones)
    setDirecciones(_direcciones);
    setDeleteProductDialog(false);
    toast.current.show({ severity: 'success', summary: '¡Listo!', detail: 'Dirección eliminada.', life: 3000 });
  }

  const botonesEliminarRegistro = (
    <>
      <Button label="Sí" icon="pi pi-check" severity="success" onClick={quitarProducto} />
      <Button label="No" icon="pi pi-times" severity="danger" onClick={cerrarDialogoEliminarRegistro} />

    </>
  );


  const confirmarEliminarRegistro = (product) => {
    console.log(product)
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const botonesAccion = (rowData) => {
    return (
      <>
        {/* <Button icon="pi pi-pencil" rounded severity="warning" className="mr-2" onClick={() => editarRegistro(rowData)} /> */}
        <Button icon="pi pi-trash" rounded severity="danger" onClick={() => confirmarEliminarRegistro(rowData)} />
      </>
    );
  };


  return (
    <Layout title="Direcciones" description="Datos del usuario">

      <div className="grid ">
        <div className="col-12">
          <div className="card">
            <Toast ref={toast} />
            <h3 >Mis Direcciones</h3>

            <div className='field'>
              <Link href="/pages/usuario/miCuenta" className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }} >
                Regresar
              </Link>
            </div>

            <Button severity='success' label='Agregar nueva dirección' onClick={() => { router.push('/pages/usuario/modifDatos/modifDir') }} />

            <DataTable
              value={direcciones} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}
              showGridlines header="Direcciones" className="p-datatable-gridlines mt-4"
            >
              <Column field="calle" header="Calle" ></Column>
              <Column field="codigoPostal" header="Código Postal" ></Column>
              <Column field="colonia" header="Colonia" ></Column>
              <Column field="numExt" header="# exterior" ></Column>
              <Column field="numInt" header="# interior" ></Column>
              <Column field="referencia1" header="Referencia 1" ></Column>
              <Column field="referencia2" header="Referencia 2" ></Column>
              <Column header="Editar" body={botonesAccion} exportable={false} style={{ minWidth: '12rem' }} />
            </DataTable>

            <Dialog
              visible={deleteProductDialog} style={{ width: '32rem' }}
              breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={botonesEliminarRegistro}
              onHide={cerrarDialogoEliminarRegistro}
            >
              <div className="confirmation-content">
                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                {product && (
                  <span>
                    ¿Está seguro de eliminar <b>{product.calle}</b>?
                  </span>
                )}
              </div>
            </Dialog>


          </div>
        </div>
      </div>
    </Layout>
  )



}

export default AddLocation
