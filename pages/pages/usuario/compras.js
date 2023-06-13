import Layout from "@/layout/layout";
import React, { useEffect, useState } from "react";
import { DataView } from 'primereact/dataview';
import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Carousel } from 'primereact/carousel';

const Compras = () => {
  const router = useRouter();
  const [Ordenes, setOrden] = useState([]);
  const [displayBasic, setDisplayBasic] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  useEffect(() => {
    const datosOrden = [
      {
        Npedido: "1234",
        precio: 5.90,
        fecha: "10/10/2002",
        estado: "Entregado",
        productos: [
          {
            nombre: "Rosa",
            cantidad: "1",
            total: "$11",
            imagen: "https://minisomx.vtexassets.com/arquivos/ids/218097/Peluche-Miniso-Unicornio-Felpa-Rosa-16x28-cm-1-12948.jpg?v=637952098028100000"
          }
        ]
      },
      {
        Npedido: "5678",
        precio: 6.20,
        fecha: "26/07/2002",
        estado: "Procesando",
        productos: [
          {
            nombre: "Rosa",
            cantidad: "1",
            total: "$11",
            imagen: "https://media.admagazine.com/photos/61eb22cb9b19d943aa117b30/master/w_1600%2Cc_limit/Girasol.jpg"
          },
          {
            nombre: "Tulipan",
            cantidad: "4",
            total: "$15",
            imagen: "https://m.media-amazon.com/images/I/41dFyXgb9sL._SL500_.jpg"
          }
        ]
      },
      {
        Npedido: "161718",
        precio: 78.60,
        fecha: "10/10/2002",
        estado: "Entregado",
        productos: [
          {
            nombre: "Rosa",
            cantidad: "1",
            total: "$11",
            imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_778361-MLM69281757162_052023-F.webp"
          }
        ]
      }
    ];
    setOrden(datosOrden);
  }, []);

  //-------------|Cancelar Pedido cuando han pasado menos de 10 minutos desde el cobro|---------------
  const handleCancelOrder = (order) => {
    const tenMinutesInMillis = 600000; // 10 minutes in milliseconds
    const orderDate = new Date(order.fecha).getTime();
    const currentDate = new Date().getTime();

    if (currentDate - orderDate < tenMinutesInMillis) {
      setSelectedOrder(order);
      setShowCancelDialog(true);
    } else {
      // Más de 10 min
      console.log("Orden cancelada:", order.Npedido);
    }
  };

  const confirmCancelOrder = () => {
    // Menos de  10 min
    console.log("Orden cancelada:", selectedOrder.Npedido);
    setShowCancelDialog(false);
  };

  const cancelCancelOrder = () => {
    setShowCancelDialog(false);
  };

  const productoTemplate = (producto) => (
    <div className="col-12">
      <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
        <img className="w-9 sm:w-16rem xl:w-10rem border-round" src={producto.imagen} alt={producto.nombre} />
        <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-5">
          <div className="flex flex-column align-items-center sm:align-items-start">
            <div>Producto: {producto.nombre}</div>
            <span>Total: {producto.total}</span>
            <span>Cantidad: {producto.cantidad}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const plantillaProducto = (producto) => {
    return (
      <div className="surface-border border-round m-1 text-center py-5">
        <div>
          <img className="w-10 shadow-2 border-round" src={producto.imagen} alt={producto.nombre} />
          <h5 className="mt-0 mb-0">Producto: {producto.nombre}</h5>
          <h6 className="mt-0 mb-0">Cantidad: {producto.cantidad}</h6>
          <h6 className="mt-0 mb-0">Total: {producto.total}</h6>
        </div>
        <div></div>
      </div>
    );
  };

  const renderFooter = () => {
    return (
      <div className="dialog-footer">
        <Button label="Cerrar" onClick={onHide} />
      </div>
    );
  };

  const onHide = () => {
    setDisplayBasic(false);
  };

  const onClick = (order) => {
    setSelectedOrder(order);
    setDisplayBasic(true);
  };

  const itemTemplate = (order) => {
    return (
      <div className="col-12">
        <div className="mt-2">
          <span className="text-2xl font-bold text-900">Estado: {order.estado}</span>
        </div>
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
          {order.productos.map((producto) => (
            <img
              key={producto.nombre}
              className="shadow-2 border-round"
              src={producto.imagen}
              alt={producto.nombre}
              style={{ width: '200px' }}
            />
          ))}
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start">
              <div>
                <span className="font-bold text-900">Número de pedido:</span> #{order.Npedido}
              </div>
              <div>
                <span className="font-bold text-900">Total:</span> ${order.precio}
              </div>
              <div>
                <span className="font-bold text-900">Pedido realizado:</span> {order.fecha}
              </div>
              <Button label="Detalles" onClick={() => onClick(order)} className="mt-2" icon="pi pi-external-link" />
              <Dialog
                visible={displayBasic && selectedOrder === order}
                style={{ width: '50vw' }}
                footer={renderFooter}
                onHide={onHide}
              >
                <h4 className="font-bold text-center">Productos de la compra #{order.Npedido}</h4>
                <Carousel
                  value={order.productos}
                  autoplayInterval={4000}
                  numVisible={3}
                  numScroll={2}
                  orientation="horizontal"
                  verticalViewPortHeight="300px"
                  itemTemplate={plantillaProducto}
                />
              </Dialog>
            </div>
            <div className="flex sm:flex-column align-items-center sm:align-items-center gap-4 sm:gap-4">
              <span className="text-2xl font-semibold">${order.precio}</span>
              <Button className="p-button-warning" label="Seguimiento" icon="pi pi-arrow-circle-right"  onClick={() => { router.push('/pages/usuario/seguirCompras') }}  />
              <Button className="p-button-help" label="Cancelar" severity="danger" icon="pi pi-times" />
            </div>
          </div>
        </div>
        <div className="mb-3"></div>
      </div>
    );
  };

  return (
    <Layout title="Compras" description="Compras del usuario hasta el momento">
      <div className="grid overflow-hidden">
        <div className="col-12">
          <h1>Mis compras</h1>
        </div>
        <div className="col-12">
          <div className="">
            <DataView value={Ordenes} itemTemplate={itemTemplate} />
          </div>
        </div>
      </div>


      <Dialog
        visible={showCancelDialog}
        onHide={cancelCancelOrder}
        header="Confirmar cancelación"
        footer={
          <div>
            <Button label="Confirmar" onClick={confirmCancelOrder} severity="sucess" />
            <Button label="Cancelar" onClick={cancelCancelOrder} severity="danger" />
            
          </div>
        }
      >
        <p>
          ¿Está seguro de que desea cancelar el pedido <strong>{selectedOrder?.Npedido}</strong>? Esta acción no se puede deshacer.
        </p>
      </Dialog>



    </Layout>
  );
};

export default Compras;


