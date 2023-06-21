import Layout from '@/layout/layout';
import React, { useEffect, useState, useRef } from "react";
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Tag } from 'primereact/tag';
import { Carousel } from 'primereact/carousel';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from 'next/router';
import { Toast } from 'primereact/toast';
import axios from "axios";
import { Image } from 'cloudinary-react'
import { consultarProducto, Com, valorar } from "@/components/mensajesNotificaciones/links";
const DetallesProducto = () => {
  const router = useRouter();
  const toast = useRef(null);
  const datosOrdenString = localStorage.getItem('datosOrden');
  const objeto = JSON.parse(datosOrdenString);
  const [valoracion, setValoracion] = useState(0);
  const [comentario, setComentario] = useState('');
  const [carrito, setCarrito] = useState([]);
  const [product, setproduct] = useState([]);
  const [name, setname] = useState(datosOrdenString);
  const consultarPro = async () => {

    //--> Preparar objeto para enviar
    const token = localStorage.getItem('token')
    const cabecera = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const respuesta = await axios.post(consultarProducto, { nombreProducto: objeto }, cabecera)
      if (respuesta.status === 200) {
        setproduct(respuesta.data.info)
        setname(respuesta.data.info.imagenProducto[0])
        console.log(respuesta.data.info)
      }
    } catch (error) {

    }
  }


  useEffect(() => {
    consultarPro()
    console.log(datosOrdenString)
  }, []);

  const handleClick = (valor) => {
    setValoracion(valor);
  };


  const handleComentarioChange = (event) => {
    setComentario(event.target.value);
  };





  const handleSubmit = async () => {
    const token = localStorage.getItem('token')
    const cabecera = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    if (comentario.trim() === '' || valoracion === 0) {

      if (toast.current) {
        toast.current.show({
          severity: 'error',
          summary: "Error",
          detail: "Campos vacíos",
          life: 3000,
        });
        return;
      }
    } else {

      try {
        console.log(valoracion)
        console.log(comentario)
        const valor = await axios.post(valorar, { nombreProducto: objeto, valoracion: valoracion }, cabecera)
        const coment = await axios.post(Com, { nombreProducto: objeto, comentario: comentario }, cabecera)
        if (valor.status === 200 && coment.status === 200) {
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
            detail: "Error",
            life: 3000,
          });
        }


      }
    }
    setValoracion(0);
    setComentario('');
  };



  return (
    <Layout title="Detalles del Producto">
      <div className="grid " >
        <div className="col-12">
          <div className="card">
            <div>
              <Toast ref={toast} />
              <h2>Detalles del Producto</h2>
              <div style={{ display: 'flex', alignItems: 'left' }}>
                <div style={{ flex: '1' }}>
                  {/*           
          <Carousel value={imagenesProducto} numVisible={3} numScroll={3}
              responsiveOptions={responsiveOptions} className="custom-carousel" circular
              autoplayInterval={3000} itemTemplate={plantillaImagenes} /> */}


                  <Image
                    cloudName="dp6uo7fsz" publicId={name}
                    className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
                    style={{ width: '200px', height: '200px' }}
                  />

                </div>
                <div style={{ flex: '1', alignItems: 'rigth' }}>

                  <h1> {product.nombreProducto}</h1>
                  <h4 >Precio: $ {product.precioProducto}</h4>
                  <div className="mt-5">
                    <p className="my-2"><span className="font-semibold text-lg">Categoría: </span> {product.categoriaProducto} <br /> <br /></p>
                    <p className="my-2"><span className="font-semibold text-lg">Descripción: </span> <br /> <br />{product.descrProducto}</p>
                    <br />
                    <div className='flex justify-content-evenly my-8'>

                      <div className="mt-3">
                        <p className="font-semibold text-lg ">Valoración actual:</p>
                        <div>
                          {[1, 2, 3, 4, 5].map((valor) => (
                            <span
                              key={valor}
                              onClick={() => handleClick(valor)}
                              style={{
                                cursor: 'pointer',
                                color: valor <= valoracion ? 'gold' : 'gray',
                                fontSize: '40px',
                              }}
                            >
                              {valor <= valoracion ? '★' : '☆'}
                            </span>
                          ))} <span className="font-semibold text-5xl " >{valoracion}</span>
                        </div>

                        <label className="font-semibold text-lg">
                          Comentario:
                          <br />
                          <div className='field col-20 md:col-18'>
                            <InputTextarea
                              value={comentario}
                              onChange={handleComentarioChange}></InputTextarea>
                          </div>
                        </label>
                        <br />
                        <Button type="submit" onClick={handleSubmit} severity="success">Enviar</Button>

                      </div>
                    </div>


                  </div>



                </div>




              </div>

            </div>


          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetallesProducto;
