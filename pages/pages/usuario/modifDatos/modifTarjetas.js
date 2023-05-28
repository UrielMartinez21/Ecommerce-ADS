import Layout from "@/layout/layout"
import React, { useEffect, useState } from "react";
import { Button } from 'primereact/button';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
// import { Rating } from 'primereact/rating';




const cards = () => { 
   //--> Variable de redireccinamiento
 const router = useRouter();

 //--> Variables
 const creditCards = [
  { nombre: "Terminación:", terminacion: 2156 , tipo: "VISA" },
  { nombre: "Terminación: ", terminacion: 3950 , tipo: "MasterCard" },
  { nombre: "Terminación: ", terminacion: 1658 , tipo: "VISA" }
 ]

 const Row = (props) =>{
  const {nombre, terminacion, tipo, delRow, index} = props
  return (
    
    <tr className="mt-5">  
      
      <td>
      <Button size="small"  icon="pi pi-trash"  rounded  severity="danger" onClick={ () => {delRow(index)}} /> 
      </td> 
      <td>
      <i className="pi pi-credit-card align-items-center justify-content-center m-2" style={{ fontSize: '2rem' }}></i>
      </td>
      <td className="text-2 font-bold text-900" >
        {nombre}{terminacion} <br />{tipo}
        </td>
    </tr>
    
  )
 }

 const Table = (props) => {
  const{data, delRow} = props
  console.log(data)
  return(
    <table>
      <tbody>
      
        {data.map((row, index) =>
        <Row key = {  `key-${index}  `} 
        nombre = {row.nombre} 
        delRow = {delRow}
        index = {index}
        terminacion = {row.terminacion} 
        tipo = {row.tipo}
        />
        )}
        
      </tbody>
    </table>
  )
 }

  

  const [rows, setRows] = useState (creditCards)
  const deleteRow = (number) => {
    let copy = [...rows]
    copy = copy.filter(
    (item, index) => number != index 
    )
    setRows(copy)
  }

  return (
 
    <Layout
      title="Tarjetas"
      description="Mi Cuenta" >
      <div className="grid">
        <div className="col-12">
          <div className="card">
            <h3>Tarjetas Guardadas</h3>
            <div className=''> 
            <div className='field'> 
              <Link href="/pages/usuario/miCuenta" className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }} >
               Regresar
              </Link>
              </div>
              </div>
            <Table  data = {rows} 
            delRow = {deleteRow} />
         </div>
        </div>
      </div>
    </Layout>
  )
}

export default cards
