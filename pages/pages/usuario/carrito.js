import Layout from "@/layout/layout"
import React, { useEffect, useState } from "react";
import { DataView } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { Tag } from 'primereact/tag';

import { useRouter } from 'next/router';
const CarritoCompras = () => {
  const router = useRouter();
  const [flores, setFlores] = useState([])

  useEffect(() => {
    const datosFlores = [
      { nombre: "Rosa", precio: 5.90, cantidad: "1", estatus: "Disponible" },
      { nombre: "Tulipan", precio: 6.20, cantidad: "2", estatus: "Agotado" },
      { nombre: "Girasol", precio: 3.50, cantidad: "3", estatus: "Pocos" },
      { nombre: "Setosa", precio: 25.23, cantidad: "2", estatus: "Pocos" },
      { nombre: "Gardenia", precio: 78.60, cantidad: "1", estatus: "Disponible" },
      { nombre: "Versicolor", precio: 84.69, cantidad: "4", estatus: "Agotado" },
    ]
    setFlores(datosFlores)
  }, [])


  const IrComprar = () => {
    //--> Redireccionar
    router.push('/pages/usuario/RealizarPago/realizarpago')

    
  }

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

  const getTotalPrice = () => {
    let total = 0;
    flores.forEach((flor) => {
      total += parseFloat(flor.precio) * parseInt(flor.cantidad);
    });
    return total.toFixed(2);
  };

  const itemTemplate = (flor) => {

    const incrementar = (flor) => {
      const updatedFlores = flores.map((f) => {
        if (f.nombre === flor.nombre) {
          return { ...f, cantidad: (parseInt(f.cantidad) + 1).toString() };
        }
        return f;
      });
      setFlores(updatedFlores);
    };

    const disminuir = (flor) => {
      const updatedFlores = flores.map((f) => {
        if (f.nombre === flor.nombre) {
          const cantidad = parseInt(f.cantidad) - 1;
          const updatedCantidad = cantidad >= 0 ? cantidad.toString() : f.cantidad;
          if (updatedCantidad === "0") {
            return null; // Return null to remove the card from the list
          }
          return { ...f, cantidad: updatedCantidad };
        }
        return f;
      });
      const filteredFlores = updatedFlores.filter((f) => f !== null);
      setFlores(filteredFlores);
    };

    const eliminar = (flor) => {
      const filteredFlores = flores.filter((f) => f.nombre !== flor.nombre);
      setFlores(filteredFlores);
    };

    return (
      <div className="col-12">
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
          <div className="card flex justify-content-center">
            <Image src="https://primefaces.org/cdn/primereact/images/galleria/galleria7.jpg" alt="Image" width="100" />
          </div>
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
              <div className="text-2xl font-bold text-900">{flor.nombre}</div>
              {/*<Rating value={product.rating} readOnly cancel={false}></Rating>*/}
              <div className="flex align-items-center">
                <Tag value={flor.estatus} severity={getSeverity(flor)}></Tag>
              </div>
              <div className="flex align-items-center gap-3">
                <Button onClick={() => disminuir(flor)} icon="pi pi-minus" className="p-button-square" severity="warning"></Button>
                <span className="text-5xl font-semibold">{flor.cantidad}</span>
                <Button onClick={() => incrementar(flor)} icon="pi pi-plus" className="p-button-square" severity="success"></Button>
              </div>
            </div>
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-8">
              <span className="text-5xl font-semibold">${flor.precio}</span>
              <Button onClick={() => eliminar(flor)} icon="pi pi-times" className="p-button-rounded" severity="danger"></Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout
      title="Carrito"
      description="Compras del usuario hasta el momento"
    >
      <div className="grid">
        <div className="col-12">
          <h1>Carrito de compras</h1>
        </div>
        <div className="col-8">
          <div className="card">
            <DataView value={flores} itemTemplate={itemTemplate} />
          </div>
        </div>
        <div className="col-4">
          <div className="card">
            <div className="flex align-items-center">
              <h2>Total: ${getTotalPrice()}</h2>
            </div>
            <div className="flex align-items-left">
              <Button label="Pagar" onClick={IrComprar} severity="success" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CarritoCompras
