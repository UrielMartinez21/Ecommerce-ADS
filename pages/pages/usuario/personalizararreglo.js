import React, { useEffect, useState } from 'react'
import Layout from '@/layout/layout'
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import axios from 'axios';
import { verFloresBack, verPeluchesBack } from '@/components/mensajesNotificaciones/links';
import { Image } from 'cloudinary-react'

const PersonalizarArreglo = () => {
  const [flor, setFlor] = useState(0)
  const [diseño, setDiseño] = useState(0);
  const [tamaño, setTamaño] = useState(0)
  const [extra, setExtra] = useState(0)

  const [objetoFlor, setObjetoFlor] = useState(null)
  const [objetoPeluche, setObjetoPeluche] = useState(null)


  const [listaFlores, setListaFlores] = useState([])
  const [listaPeluches, setListaPeluches] = useState([])

  const consultarFlores = async () => {
    //--> Preparar objeto para enviar
    const token = localStorage.getItem('token')
    const cabecera = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    //--> Enviar objeto
    try {
      const datos = await axios.get(verFloresBack, cabecera)
      console.log(datos.data.fleurs)
      setListaFlores(datos.data.fleurs)
    } catch (error) { console.log(error) }
  }

  const consultarPeluches = async () => {
    //--> Preparar objeto para enviar
    const token = localStorage.getItem('token')
    const cabecera = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    //--> Enviar objeto
    try {
      const datos = await axios.get(verPeluchesBack, cabecera)
      setListaPeluches(datos.data.plushies)
    } catch (error) { console.log(error) }
  }

  useEffect(() => {
    consultarFlores()
    consultarPeluches()
  }, [])

  useEffect(() => {
    console.log(extra)
  }, [extra])

  useEffect(() => {
    if (flor) {
      const objeto = listaFlores.filter(f => f.precioDescuento === flor)
      setObjetoFlor(objeto[0])
      // console.log(objeto[0].imagenProducto[0])
    }
  }, [flor])

  useEffect(() => {
    if (extra) {
      const objeto = listaPeluches.filter(p => p.precioDescuento === extra)
      setObjetoPeluche(objeto[0])
      // console.log(objeto[0].imagenProducto[0])
    }
  }, [extra])


  const diseños = [
    { tipo: 'Individual', valor: 90 },
    { tipo: 'San valentin', valor: 100 },
    { tipo: 'Buchon', valor: 150 },
    { tipo: 'Cumpleaños', valor: 90 },
  ];

  const tamaños = [
    { tipo: "Pequeño", valor: 1 },
    { tipo: "Chico", valor: 3 },
    { tipo: "Mediano", valor: 5 },
    { tipo: "Grande", valor: 7 },
  ]

  return (
    <Layout
      title="Personalización"
      description="Personalizar arreglo de flores del usuario"
    >
      <div className="grid">
        <div className="col-12">
          <h4>Diseña tu arreglo</h4>
          <div className='lg:flex lg:justify-content-between '>
            <div className='lg:col-7 md:col-12'>
              {objetoFlor && (
                <div className='card'>
                  <Image
                    cloudName="dp6uo7fsz" publicId={objetoFlor.imagenProducto[0]}
                    className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
                    style={{ width: '200px', height: '200px' }}
                  />
                </div>
              )}
              {!objetoFlor && (
                <div className='card'>No ha seleccionado alguna flor.</div>
              )}

              {objetoPeluche && (
                <div className='card'>
                  <Image
                    cloudName="dp6uo7fsz" publicId={objetoPeluche.imagenProducto[0]}
                    className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
                    style={{ width: '200px', height: '200px' }}
                  />
                </div>
              )}
              {!objetoPeluche && (
                <div className='card'>No ha seleccionado algún peluche.</div>
              )}
              {/* <div className='card'>Foto de peluche</div> */}
            </div>

            <div className='lg:col-5 md:col-12'>
              <div className='card'>
                <h5 className='text-center'>Barra de personalización</h5>
                <div className='flex justify-content-between my-3'>
                  <label htmlFor="diseño" className='flex align-items-center font-semibold'>Diseño: </label>
                  <Dropdown
                    inputId="diseño" value={diseño} onChange={(e) => setDiseño(e.value)} placeholder='Elija  un diseño'
                    options={diseños} optionLabel="tipo" optionValue='valor' className="w-full md:w-14rem" />
                </div>

                <div className='flex justify-content-between my-3'>
                  <label htmlFor="tamaño" className='flex align-items-center font-semibold'>Tamaño:</label>
                  <Dropdown
                    inputId="tamaño" value={tamaño} onChange={(e) => setTamaño(e.value)} placeholder='Elija un tamaño'
                    options={tamaños} optionLabel="tipo" optionValue='valor' className="w-full md:w-14rem" />
                </div>
                <div className='flex justify-content-between my-3'>

                  <label htmlFor="flor" className='flex align-items-center font-semibold'>Tipo de flor:</label>
                  <Dropdown
                    inputId="flor" value={flor} onChange={(e) => setFlor(e.value)} placeholder='Tipo de flor'
                    options={listaFlores} optionLabel="nombreProducto" optionValue='precioDescuento' className="w-full md:w-14rem" />
                </div>
                <div className='flex justify-content-between my-3'>
                  <label htmlFor="extra" className='flex align-items-center font-semibold'>Peluche:</label>
                  <Dropdown
                    inputId="extra" value={extra} onChange={(e) => setExtra(e.value)} placeholder='Peluche (opcional)'
                    options={listaPeluches} optionLabel="nombreProducto" optionValue='precioDescuento'
                    className="w-full md:w-14rem" />
                </div>
              </div>
              <div className='card'>
                <p className='font-bold text-2xl'>Total a pagar: ${`${diseño + (tamaño * flor) + extra}`}</p>
              </div>
              <div className='flex justify-content-around'>
                <Button label="Pagar" severity="success" rounded size="large" className='w-5' />
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  )
}

export default PersonalizarArreglo
