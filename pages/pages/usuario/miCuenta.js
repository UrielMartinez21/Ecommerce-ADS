import Layout from "@/layout/layout"
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { useRouter } from 'next/router';



const miCuenta = () => {
   //--> Variable de redireccinamiento
 const router = useRouter();

  return (
    <Layout
      title="Perfil"
      description="Mi Cuenta">
      <div className="grid">
        <div className="col-12">
          <div className="card">
            <h5>Perfil</h5>
            <div className="flex align-items-center flex-wrap">
              <Avatar label="U" size="xlarge" shape="circle" className="flex align-items-center justify-content-center m-2" />
              <p className="flex align-items-center justify-content-center m-2">Omarcito Gómez</p>
            </div>
            <div className="mt-4">
              <div className="flex align-items-center flex-wrap my-2">
                <i className="pi pi-user-edit flex align-items-center justify-content-center m-2" style={{ fontSize: '2rem' }}></i>
                <Button label="Nombre Elegido" text className="flex align-items-center justify-content-center m-2" onClick={() => { router.push('/pages/usuario/modifDatos/modifNom')}} />
              </div>
              <div className="flex align-items-center flex-wrap my-2">
                <i className="pi pi-lock align-items-center justify-content-center m-2" style={{ fontSize: '2rem' }}></i>
                <Button label="Contraseña" text className="flex align-items-center justify-content-center m-2" onClick={() => { router.push('/pages/usuario/modifDatos/modifContrasena')}} />
              </div>
              <div className="flex align-items-center flex-wrap my-2">
                <i className="pi pi-phone flex align-items-center justify-content-center m-2" style={{ fontSize: '2rem' }}></i>
                <Button label="Número de Teléfono" text className="flex align-items-center justify-content-center m-2" onClick={() => { router.push('/pages/usuario/modifDatos/modifTel')}} />
              </div>
              <div className="flex align-items-center flex-wrap my-2">
                <i className="pi pi-map-marker flex align-items-center justify-content-center m-2" style={{ fontSize: '2rem' }}></i>
                <Button label="Dirección" text className="flex align-items-center justify-content-center m-2" onClick={() => { router.push('/pages/usuario/modifDatos/addDir')}} />
              </div>
              <div className="flex align-items-center flex-wrap my-2">
                <i className="pi pi-credit-card align-items-center justify-content-center m-2" style={{ fontSize: '2rem' }}></i>
                <Button label="Tarjetas" text className="flex align-items-center justify-content-center m-2" onClick={() => { router.push('/pages/usuario/modifDatos/modifTarjetas')}} />
              </div>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default miCuenta
