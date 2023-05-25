import Layout from "@/layout/layout"
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { useRouter } from 'next/router';


const Perfil = () => {

 //--> Variable de redireccinamiento
 const router = useRouter();

  return (
    <Layout
      title="Perfil"
      description="Datos del usuario">
      <div className="grid">
        <div className="col-12">
          <div className="card">
            <h5>Perfil</h5>
            <div className="flex align-items-center flex-wrap">
              <Avatar label="U" size="xlarge" shape="circle" className="flex align-items-center justify-content-center m-2" />
              <p className="flex align-items-center justify-content-center m-2">Hola  <span className="underline">Uriel</span></p>
            </div>

            <div className="mt-4">
              <div className="flex align-items-center flex-wrap my-2">
                <i className="pi pi-home flex align-items-center justify-content-center m-2" style={{ fontSize: '2rem' }}></i>
                <Button label="Inicio" text className="flex align-items-center justify-content-center m-2" />
              </div>
              <div className="flex align-items-center flex-wrap my-2">
                <i className="pi pi-search flex align-items-center justify-content-center m-2" style={{ fontSize: '2rem' }}></i>
                <Button label="Buscar" text className="flex align-items-center justify-content-center m-2" />
              </div>
              <div className="flex align-items-center flex-wrap my-2">
                <i className="pi pi-shopping-cart flex align-items-center justify-content-center m-2" style={{ fontSize: '2rem' }}></i>
                <Button label="Compras" text className="flex align-items-center justify-content-center m-2" />
              </div>
              <div className="flex align-items-center flex-wrap my-2">
                <i className="pi pi-star flex align-items-center justify-content-center m-2" style={{ fontSize: '2rem' }}></i>
                <Button label="Favoritos" text className="flex align-items-center justify-content-center m-2" />
              </div>
              <div className="flex align-items-center flex-wrap my-2">
                <i className="pi pi-clock flex align-items-center justify-content-center m-2" style={{ fontSize: '2rem' }}></i>
                <Button label="Historial" text className="flex align-items-center justify-content-center m-2" />
              </div>
              <div className="flex align-items-center flex-wrap my-2">
                <i className="pi pi-user flex align-items-center justify-content-center m-2" style={{ fontSize: '2rem' }} ></i>
                <Button label="Mi cuenta" text className="flex align-items-center justify-content-center m-2"   onClick={() => { router.push('/pages/usuario/miCuenta') }}  />
              
              </div>
              <div className="flex align-items-center flex-wrap my-2">
                <i className="pi pi-list flex align-items-center justify-content-center m-2" style={{ fontSize: '2rem' }}></i>
                <Button label="Temporadas" text className="flex align-items-center justify-content-center m-2" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Perfil
