import Layout from '@/layout/layout';
import React, { useEffect, useState } from "react";
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Tag } from 'primereact/tag';
import { Carousel } from 'primereact/carousel';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const DetallesProducto = () => {
  const [valoracion, setValoracion] = useState(0);
  const [comentario, setComentario] = useState('');
  const [carrito, setCarrito] = useState([]);
  const producto = {
    nombre: 'Peluches BT21',
    precio: 30.29, 
    categoria: "Para ella", 
    estatus: "pocos",
    descripcion: "Estos peluches son fabricados con materiales de alta calidad, lo que les brinda una suavidad y textura agradable al tacto. Además, vienen en diferentes tamaños para adaptarse a tus preferencias, desde peluches pequeños y portátiles hasta peluches grandes y abrazables.", 
    precio: 9.99,
  };

  const imagenes = {
    ...producto,
    imagen1: 'https://cf.shopee.com.mx/file/84a9d7f34a124c38aba7eb0fb64ad09b',
    imagen2: 'https://down-mx.img.susercontent.com/file/a0473f8b79655b5ed35735f226a4a8a3',
    imagen3: 'https://pbs.twimg.com/media/FEyAYZkWUAApa6q.jpg',
  };

  const imagenesProducto = [
    { imageP: 'https://cf.shopee.com.mx/file/84a9d7f34a124c38aba7eb0fb64ad09b'  },
    { imageP: 'https://down-mx.img.susercontent.com/file/a0473f8b79655b5ed35735f226a4a8a3' },
    { imageP: 'https://pbs.twimg.com/media/FEyAYZkWUAApa6q.jpg' },
  ]

  const responsiveOptions = [
    { breakpoint: '100px', numVisible: 1, numScroll: 1 },
    { breakpoint: '100px', numVisible: 2, numScroll: 1 },
    { breakpoint: '100px', numVisible: 3, numScroll: 1 }
  ];

  const handleClick = (valor) => {
    setValoracion(valor);
  };


  const handleComentarioChange = (event) => {
    setComentario(event.target.value);
  };

 
  
  const handleAñadirCarrito = () => {
    setCarrito([...carrito, producto]);
  };


  //--> Indicar estado del producto
  const getSeverity = (producto) => {
    switch (producto.estatus) {
      case 'disponible':
        return 'success';

      case 'pocos':
        return 'warning';

      case 'agotado':
        return 'danger';

      default:
        return null;
    }
  };
 
  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes enviar la valoración y el comentario al servidor o realizar otra lógica de procesamiento
    console.log(`Valoración: ${valoracion}`);
    console.log(`Comentario: ${comentario}`);
    setValoracion(0);
    setComentario('');
  };


  const plantillaImagenes = (imageP) => {
    return (
      <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
        <div className="mb-3">
        </div>
        <div>
        <img src={imageP.imageP} style={{ width: '470px', height: '490px' }} />
        </div>
      </div>
    );
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };


  return (
   <Layout  title="Detalles del Producto">
    <div className="grid " >
        <div className="col-12">
          <div className="card">
         <div>
        <h2>Detalles del Producto</h2>
      <div style={{ display: 'flex' , alignItems: 'left'}}>
        <div style={{ flex: '1' }}>
          {/*           
          <Carousel value={imagenesProducto} numVisible={3} numScroll={3}
              responsiveOptions={responsiveOptions} className="custom-carousel" circular
              autoplayInterval={3000} itemTemplate={plantillaImagenes} /> */}
              

        <img src={imagenes.imagen2} style={{ width: '470px', height: '490px' }} />
           
           
        </div>
        <div style={{ flex: '1', alignItems: 'rigth' }}>
        
        <h1> {producto.nombre}</h1>  
        <h4 >Precio: $ {producto.precio}</h4>
        <div className="mt-5">
                <p className="my-2"><span className="font-semibold text-lg">Categoría: </span> {producto.categoria} <br/> <br/></p>
                <p className="my-2"><span className="font-semibold text-lg">Descripción: </span> <br/> <br/>{producto.descripcion}</p>
                <br/>
                <Tag value={producto.estatus} severity={getSeverity(producto)}></Tag>
              </div>
              
        
        
          <div className='flex justify-content-evenly my-8'>
          <Button label = "Añadir al carrito" severity="success" size="large" onClick={handleAñadirCarrito} icon="pi pi-cart-plus"/>
          </div>
        </div>
        
      </div>
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

        <form onSubmit={handleSubmit}>
          <label  className="font-semibold text-lg">
            Comentario:
            <br />
            <div className='field col-20 md:col-18'>
            <InputTextarea 
              value={comentario}
              onChange={handleComentarioChange}></InputTextarea>
            </div>
          </label>
          <br />
          <Button type="submit" severity="success">Enviar</Button>
        </form>
      </div>
    </div>
    
  </div>
 </div>
    </div>
   </Layout>
  );
};

export default DetallesProducto;
