import React, { useContext } from 'react';
// import ReactDOM from 'react-dom'
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {flowerTulip} from '@fortawesome/free-solid-svg-icons';
// import { IoIosBasket} from "react-icons/io";



// import Link from 'next/link';

const AppMenu = () => {
  const { layoutConfig } = useContext(LayoutContext);


  const model = [
    {
      label: 'Inicio',
      items: [{ label: ' Ver Jardín del Edén', icon: "IoIosBasket", to: '/pages/dashboard' }]
    },
    {
      label: 'Catálogos',
      items: [
        { label: 'Flores', to: '/pages/catalogos/flores' },
        { label: 'Peluches', icon: "fa-light fa-teddy-bear", to: '/pages/catalogos/peluches' },

        {
          label: 'Eventos', icon: 'pi pi-fw pi-bookmark',
          items: [{ label: 'Amor & Aniversario', icon: 'pi pi-fw pi-heart-fill', to: '/pages/catalogos/Eventos/amorAniv' },
          { label: 'Agradecimiento', to: '/pages/catalogos/Eventos/agradece' },
          { label: 'Bodas', to: '/pages/catalogos/Eventos/Boda' },
          { label: 'Baby Shower', to: '/pages/catalogos/Eventos/babyShower' },
          { label: 'Cumpleaños', to: '/pages/catalogos/Eventos/cumple' },
          { label: 'Condolencias', to: '/pages/catalogos/Eventos/condolencias' },
          { label: 'Graduación', to: '/pages/catalogos/Eventos/graduacion' },
          {
            label: 'Regalos',
            items: [{ label: 'Para él', to: '/pages/catalogos/Eventos/paraEl' },
            { label: 'Para ella', to: '/pages/catalogos/Eventos/paraElla' }]
          },]
        },
        { label: 'Ofertas', icon: 'pi pi-fw pi-tags', to: '/pages/catalogos/ofertas' },
        { label: 'Temporada', icon: 'pi pi-fw pi-tag', to: '/pages/catalogos/temporada' }
      ]
    },
    {
      label: 'Usuario',
      items: [
        { label: 'Personalizar arreglo', icon: 'pi pi-fw pi-gift', to: '/pages/usuario/personalizararreglo' },
        { label: 'Mis Compras', icon: 'pi pi-fw pi-shopping-bag', to: '/pages/usuario/compras' },
        { label: 'Mis favoritos', icon: 'pi pi-fw pi-heart', to: '/pages/usuario/valoraProducto' },
        { label: 'Valorar Productos', icon: 'pi pi-fw pi-star', to: '/pages/usuario/valoraProducto' },
        { label: 'Atención al cliente', icon: 'pi pi-fw pi-comments', to: '/pages/seguimientoPedidos/valoraProducto' },
      ]
    }

  ];

  return (
    <MenuProvider>
      <ul className="layout-menu">


        {model.map((item, i) => {
          return !item.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
        })}

        {/* <Link href="https://www.primefaces.org/primeblocks-react" target="_blank" style={{ cursor: 'pointer' }}>
          <img alt="Prime Blocks" className="w-full mt-3" src={`/layout/images/banner-primeblocks${layoutConfig.colorScheme === 'light' ? '' : '-dark'}.png`} />
        </Link> */}

      </ul>
    </MenuProvider>
  );
};

export default AppMenu;
