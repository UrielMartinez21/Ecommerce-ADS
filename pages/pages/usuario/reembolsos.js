import Layout from "@/layout/layout"
import React, { useEffect, useState, useRef } from "react";
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import axios from "axios";
import { mandarDevolucion } from "@/components/mensajesNotificaciones/links";
import { useRouter } from 'next/router';
const MisCompras = () => {
  const router = useRouter();
  const toast = useRef(null);
  const [comentario, setComentario] = useState('');
  const [comentario2, setComentario2] = useState('');



  const handleComentarioChange = (event) => {
    setComentario(event.target.value);
  };

  const handleComentarioChange2 = (event) => {
    setComentario2(event.target.value);
  };

  const cancelarPedido = async () => {
    //--> Preparar objeto para enviar
    const token = localStorage.getItem('token')
    const cabecera = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    if (comentario.trim() === '' || comentario2.trim() === '') {

      if (toast.current) {
        toast.current.show({
          severity: 'error',
          summary: "Error",
          detail: "Campos vacíos",
          life: 3000,
        });
        return;
      }
    } try {
      const respuesta = await axios.post(mandarDevolucion, { nombrePedido: comentario, returnMotif: comentario2 }, cabecera)
      if (respuesta.status === 200) {
        if (toast.current) {
          toast.current.show({
            severity: 'success',
            summary: 'Mensaje de éxito',
            detail: "Solicitud éxitosa",
            life: 3000,
          });
        }
        setTimeout(() => {
          //--> Redireccionar
          router.push('/pages/usuario/perfil')
        }, 1000);


      }

    } catch (error) {
      if (toast.current) {
        toast.current.show({
          severity: 'error',
          summary: "Error",
          detail: "Ya existe una solicitud de reembolso",
          life: 3000,
        });
      }
      setTimeout(() => {
        //--> Redireccionar
        router.push('/pages/usuario/perfil')
      }, 1000);

    }

  }

  return (
    <Layout
      title="Reembolsos"
      description="Reembolsos y devoluciones"
    >
      <div className="grid overflow-hidden">
        <div className="col-12">
          <h1>Reembolsos\Devoluciones</h1>
        </div>
        <Toast ref={toast} />
        <div className="col-12">

          <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4 ">


            <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-5">
              <div className="flex flex-column align-items-center sm:align-items-start ">

                <div className="mt-4">
                  <label htmlFor="motivo" className='flex align-items-center font-semibold'>Ingresa el id del pedido</label>
                  <InputTextarea rows={1} cols={1} className="w-full" value={comentario} onChange={handleComentarioChange} ></InputTextarea>
                  <label htmlFor="motivo" className='flex align-items-center font-semibold'>Escribe el motivo del Reembolso/Devolución</label>
                  <div className='field col-20 md:col-18'>
                    <InputTextarea rows={5} cols={50} className="w-full" value={comentario2} onChange={handleComentarioChange2} ></InputTextarea>
                  </div>


                  <Button onClick={cancelarPedido} className="w-full justify-content-center" severity="success">Enviar</Button>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </Layout>
  )
}


export default MisCompras
