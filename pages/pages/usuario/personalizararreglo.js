import React, { useState } from 'react'
import Layout from '@/layout/layout'
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';

const PersonalizarArreglo = () => {
  const [flor, setFlor] = useState(0)
  const [diseño, setDiseño] = useState(0);
  const [tamaño, setTamaño] = useState(0)
  const [extra, setExtra] = useState(0)

  const flores = [
    { tipo: "Girasol", valor: 10 },
    { tipo: "Rosa", valor: 12 },
    { tipo: "Gardenia", valor: 14 },
    { tipo: "Setosa", valor: 16 },
  ]

  const diseños = [
    { tipo: 'Individual', valor: 1 },
    { tipo: 'San valentin', valor: 2 },
    { tipo: 'Buchon', valor: 3 },
    { tipo: 'Cumpleaños', valor: 4 },
  ];

  const tamaños = [
    { tipo: "Pequeño", valor: 5 },
    { tipo: "Chico", valor: 10 },
    { tipo: "Mediano", valor: 15 },
    { tipo: "Grande", valor: 20 },
  ]

  const peluches = [
    { tipo: "Oso", valor: 50 },
    { tipo: "Jirafa", valor: 60 },
    { tipo: "Tiburon", valor: 70 },
    { tipo: "Panda", valor: 80 },
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
              <div className='card'>Foto de arreglo</div>
              <div className='card'>Foto de peluche</div>
            </div>

            <div className='lg:col-5 md:col-12'>
              <div className='card'>
                <h5 className='text-center'>Barra de personalizacion</h5>
                <div className='flex justify-content-between my-3'>
                  <label htmlFor="diseño" className='flex align-items-center font-semibold'>Escoge un diseño</label>
                  <Dropdown
                    inputId="diseño" value={diseño} onChange={(e) => setDiseño(e.value)} placeholder='Escoje un diseño'
                    options={diseños} optionLabel="tipo" optionValue='valor' className="w-full md:w-14rem" />
                </div>
                <div className='flex justify-content-between my-3'>
                  <label htmlFor="tamaño" className='flex align-items-center font-semibold'>Escoge un tamaño</label>
                  <Dropdown
                    inputId="tamaño" value={tamaño} onChange={(e) => setTamaño(e.value)} placeholder='Escoje un tamaño'
                    options={tamaños} optionLabel="tipo" optionValue='valor' className="w-full md:w-14rem" />
                </div>
                <div className='flex justify-content-between my-3'>
                  <label htmlFor="flor" className='flex align-items-center font-semibold'>Escoge un tipo de flor</label>
                  <Dropdown
                    inputId="flor" value={flor} onChange={(e) => setFlor(e.value)} placeholder='Escoje un tipo de flor'
                    options={flores} optionLabel="tipo" optionValue='valor' className="w-full md:w-14rem" />
                </div>
                <div className='flex justify-content-between my-3'>
                  <label htmlFor="extra" className='flex align-items-center font-semibold'>Escoge un peluche</label>
                  <Dropdown
                    inputId="extra" value={extra} onChange={(e) => setExtra(e.value)} placeholder='Escoje un peluche'
                    options={peluches} optionLabel="tipo" optionValue='valor' className="w-full md:w-14rem" />
                </div>
              </div>
              <div className='card'>
                <p className='font-bold text-2xl'>Total a pagar: ${`${diseño + tamaño + flor + extra}`}</p>
              </div>
              <div className='flex justify-content-around'>
                <Button label="Guardar" severity="info" rounded size="large" className='w-5' />
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
