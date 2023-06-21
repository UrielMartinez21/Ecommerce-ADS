import Layout from "@/layout/layout"
import React, { useEffect, useState } from "react";
import { Button } from 'primereact/button';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import axios from "axios";
import { verTarjetas } from "@/components/mensajesNotificaciones/links";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const Cards = () => {
  const router = useRouter();
  //-----------------------| Lista de variables |-----------------------
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [tarjetas, setTarjetas] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [rows, setRows] = useState([
    { nombre: "Terminación:", terminacion: 2156, tipo: "VISA" },
    { nombre: "Terminación: ", terminacion: 3950, tipo: "MasterCard" },
    { nombre: "Terminación: ", terminacion: 1658, tipo: "VISA" }
  ]);


  const consultarTarjetas = async () => {
    console.log('Consultando tarjetas...')
    const token = localStorage.getItem('token')
    const cabecera = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const respuesta = await axios.get(verTarjetas, cabecera)
    setTarjetas(respuesta.data)
    // console.log(respuesta.data)
  }

  useEffect(() => { consultarTarjetas() }, [])

  const confirmDelete = (row) => {
    setSelectedRow(row);
    setShowConfirmDialog(true);
  };

  const deleteRow = () => {
    const index = rows.indexOf(selectedRow);
    if (index !== -1) {
      const updatedRows = [...rows];
      updatedRows.splice(index, 1);
      setRows(updatedRows);
      //  toast.current.show({ severity: 'success', summary: 'Success', detail: 'Row deleted', life: 3000 });
    }
    setShowConfirmDialog(false);
  };

  const cancelDelete = () => {
    setShowConfirmDialog(false);
  };

  const renderFooter = () => {
    return (
      <>
        <Button severity="success" label="Aceptar" icon="pi pi-check" onClick={deleteRow} />
        <Button severity="danger" label="Cancelar" icon="pi pi-times" onClick={cancelDelete} className="p-button-secondary" />
      </>
    );
  };

  return (
    <Layout title="Tarjetas" description="Mi Cuenta">
      <div className="grid">
        <div className="col-12">
          <div className="card">
            <h3>Tarjetas Guardadas</h3>
            <div className=''>
              <div className='field'>
                <Link href="/pages/usuario/miCuenta" className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}>
                  Regresar
                </Link>
              </div>
            </div>


            <DataTable
              value={tarjetas} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}
              showGridlines className="p-datatable-gridlines mt-4"
            >
              <Column field="titularTarjeta" header="Titular" ></Column>
              {/* <Column field="fechaVencimiento" header="Fecha vencimiento" ></Column> */}
              <Column field="numTarjeta" header="Número de tarjeta" ></Column>
            </DataTable>



            {/* <table>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={`key-${index}`} className="mt-5">
                    <td>
                      <Button size="small" icon="pi pi-trash" rounded severity="danger" onClick={() => confirmDelete(row)} />
                    </td>
                    <td>
                      <i className="pi pi-credit-card align-items-center justify-content-center m-2" style={{ fontSize: '2rem' }}></i>
                    </td>
                    <td className="text-2 font-bold text-900">
                      {row.nombre}{row.terminacion} <br />{row.tipo}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> */}



          </div>
        </div>
      </div>
      <ConfirmDialog visible={showConfirmDialog} onHide={() => setShowConfirmDialog(false)} message="¿Está seguro que desea eliminar esta tarjeta?" footer={renderFooter()} />

    </Layout>
  )
}

export default Cards