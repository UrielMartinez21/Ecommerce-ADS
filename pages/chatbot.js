import React from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot from 'react-simple-chatbot';
import styles from '../styles/styles.module.css';



export default function bot() {
const otherFontTheme = {
  background: '#f5f8fb',
  fontFamily: 'Arial',
  fontFamily: 'Helvetica Neue',
 
  headerBgColor: '#ff998d',
  headerFontColor: '#d72d3b',

  headerFontColor: '#fff',
  botBubbleColor: 'rgb(255, 93, 106)',
  botFontColor: '#fff',

  
};
const steps=[{
  id:'saludo',
  message:'Hola, bienvenido a Soporte al Cliente, ¿En qué te puedo ayudar?',  
  trigger:'opciones' 
},
{
  id:'opciones',
  options:[{value: "Flores Populares       ",label: "1. Flores Populares       ",trigger:"Populares"},
           {value: "Cuidado de Flores      ",label: "2. Cuidado de Flores      ",trigger:"Cuidado"},
           {value: "Flores que Ofrecemos   ",label: "3. Flores que Ofrecemos   ",trigger:"Ofrecemos"},
           {value: "Duración de las flores ",label: "4. Duración de las flores ",trigger:"Duracion"},
           {value: "Reembolsos/Devoluciones",label: "5. Reembolsos/Devoluciones",trigger:"RD"},
           {value: "Envíos y costos        ",label: "6. Envíos y costos        ",trigger:"EC"},
           {value: "Seguimiento de pedido  ",label: "7. Seguimiento de pedido  ",trigger:"Seguimiento"},
           {value: "Métodos de pago        ",label: "8. Métodos de pago        ",trigger:"Metodosp"},
           {value: "Garantías              ",label: "9. Garantías              ",trigger:"garantias"},
           {value: "Flores para eventos    ",label: "10. Flores para eventos   ",trigger:"floresEventos"}
  ],
  
}, 
{
  id:'cuidadoFlores',
  options:[{value: "Rosas",        label: "Rosas        ",trigger:"Rosas"},
           {value: "Girasoles ",   label: "Girasoles   " ,trigger:"Girasoles"},
           {value: "Tulipanes  ",  label: "Tulipanes   ", trigger:"Tulipanes"},
           {value: "Lirios",       label: "Lirios",       trigger:"Lirios"},
           {value: "Orquídeas",    label: "Orquídeas",   trigger:"Orquídeas"},
          
  ],
  
},
{
  id:'duracionFlores',
  options:[{value: "Rosas",        label: "Rosas        ",trigger:"RosasD"},
           {value: "Girasoles ",   label: "Girasoles   " ,trigger:"GirasolesD"},
           {value: "Tulipanes  ",  label: "Tulipanes   ", trigger:"TulipanesD"},
           {value: "Lirios",       label: "Lirios",       trigger:"LiriosD"},
           {value: "Orquídeas",    label: "Orquídeas",   trigger:"OrquídeasD"},     
  ],
  
},
{
  id:'eventos',
  options:[{value: "AmorAniversario   ",label: "Amor Aniversario  ",trigger:"amorAni"},
          {value: "Condolencias       ",label: "Condolencias      ",trigger:"condolencias"},
          {value: "Cumpleaños         ",label: "Cumpleaños        ",trigger:"cumpleaños"},
          {value: "Bautizos           ",label: "Bautizos          ",trigger:"bautizos"},
          {value: "Agradecimiento     ",label: "Agradecimiento    ",trigger:"agradecimiento"},     
  ],
},
{
  id:'Populares',
  message:'Contamos con una gran cantidad de flores y la popularidad de ellas depende sobre todo de la temporada en la que nos encontremos. A lo largo del año las mas populares son: Rosas, Girasoles, Tulipanes, Orquídeas. Las rosas son un clasico que sin duda impresionan en cualquier circunstancia. Los girasoles son populares sobretodo por como transmiten alegría y vitalidad. Los tulipanes son un símbolo de elegancia y gracia. Las orquídeas son populares gracias a que demuestra exotismo y sofisticación.',  
  trigger:'opciones'
},
{
  id:'Cuidado',
  message: 'Seleccione la flor de la cual desea ver sus cuidados.',
  trigger:'cuidadoFlores'
},
{
  id:'floresEventos',
  message: 'Contamos con flores para los siguientes eventos:',
  trigger:'eventos'
},
{
  id: 'Rosas',
  message: 'Coloca las rosas en un lugar soleado con al menos 6 horas de luz directa al día.  Riégalas regularmente, manteniendo el suelo húmedo pero evitando el encharcamiento. Poda: Realiza podas regulares para promover un crecimiento saludable y eliminar las ramas muertas o enfermas. Fertilización: Aplica un fertilizante específico para rosas según las instrucciones del fabricante.',
  trigger: 'opciones'
},
{
  id: 'Girasoles',
  message: 'Riégalos regularmente, asegurándote de que el suelo se mantenga húmedo pero no encharcado. Los girasoles pueden crecer bastante altos, así que proporciona un soporte o estaca para ayudar a mantenerlos erguidos.  Aplica un fertilizante equilibrado en el suelo antes de plantar los girasoles.',
  trigger: 'opciones'
},
{
  id: 'Tulipanes',
  message: 'Riégalos moderadamente, evitando el encharcamiento. El suelo debe drenar bien. Después de que los tulipanes se marchiten, corta las flores marchitas para evitar que formen semillas y permitir que la planta conserve energía para el próximo año. Después de que las hojas se marchiten, permite que los bulbos descansen en el suelo durante el verano.',
  trigger: 'opciones'
},
{
  id: 'Lirios',
  message: 'Las plantas de lirios debe estar en un lugar soleado o parcialmente sombreado. Riégalos regularmente para mantener el suelo húmedo, pero evita el encharcamiento. Después de que las flores se marchiten, corta los tallos a nivel del suelo y deja que las hojas se marchiten naturalmente. Cada pocos años, puedes dividir los lirios para mantener su salud y vigor.',
  trigger: 'opciones'
},
{
  id: 'Orquídeas',
  message: 'Dependiendo de la variedad de orquídea, algunas pueden necesitar luz indirecta brillante, mientras que otras pueden tolerar luz solar filtrada. Riégalas con moderación, permitiendo que el medio de cultivo se seque ligeramente entre riegos. Las orquídeas suelen requerir un ambiente húmedo. Puedes colocarlas sobre una bandeja con guijarros y agua para aumentar la humedad alrededor de la planta.  Utiliza un fertilizante específico para orquídeas diluido y aplícalo según las instrucciones del fabricante.',
  trigger: 'opciones'
},
{
  id:'Ofrecemos',
  message:'Algunas de las flores que ofrecemos son: Rosas, girasoles, tulipanes, orquídeas, lirios, gerberas, margaritas.',  
  trigger:'opciones'
},

{
  id:'Duracion',
  message:'Selecciones un tipo de flor para saber su duración.',  
  trigger:'duracionFlores'
},
{
  id: 'RosasD',
  message: 'Las rosas frescas bien cuidadas pueden durar de 7 a 10 días. Sin embargo, algunas variedades de rosas más duraderas, como las rosas de jardín, pueden durar hasta 2 semanas.',
  trigger: 'opciones'
},
{
  id: 'GirasolesD',
  message: 'Los girasoles son flores robustas y duraderas. Pueden durar de 7 a 10 días o incluso más, dependiendo de las condiciones de cuidado.',
  trigger: 'opciones'
},
{
  id: 'TulipanesD',
  message: 'Los tulipanes suelen tener una vida útil de 5 a 7 días. A medida que envejecen, los tallos pueden doblarse y las flores se marchitarán.',
  trigger:'opciones'
},
{
  id: 'LiriosD',
  message: 'Los lirios tienen una vida útil de aproximadamente 1 a 2 semanas. A medida que las flores se marchitan, es común quitarlas del tallo para mantener la apariencia del ramo.',
  trigger:'opciones'
},
{
  id: 'OrquídeasD',
  message: 'Las orquídeas son conocidas por su longevidad. Dependiendo de la variedad, pueden durar de varias semanas a varios meses en condiciones adecuadas.',
  trigger: 'opciones'
},

{
  id:'RD',
  message:'Tendrá 15 días para hacer cualquier cambio, devolución  o reembolso de los productos entregados. Tendrá que envíar sus motivos y/o pruebas de los productos a cambiar o reembolsar. ',  
  trigger:'opciones'
},
{
  id:'EC',
  message:'Los envíos son a cualquier parte de la Ciudad de México. El envío es de $0.00 MXN.',  
  trigger:'opciones'
},
{
  id:'Seguimiento',
  message:'Puede ver el status de su envío en la opción "Seguimiento" que se encuentra en el menú principal.',  
  trigger:'opciones'
},
{
  id:'Metodosp',
  message:'Se puede realizar el pago con tarjetas  de débito y crédito de VISA, MasterCard, American Express, JCB, Diners Club INTERNATIONAL, Maestro y Discover.  ',  
  trigger:'opciones'
},
{
  id:'garantias',
  message:'Tendrá 15 días para hacer cambio o devolución en peluches, así mismo, para pedir un reembolos en arreglos florales que lleguen maltratados. La opción  de "Devolución" que se encuentra en su Historial de compras a la derecha de su pedido realizado, para mayor información y aclaración de dudas contacte al siguiente número: + 52 55 14 75  22 30',  
  trigger:'opciones'
},

{
  id:'amorAni',
  message:'Las flores para Amor o Aniversario son: Rosas, Margaritas, Lirios y Tulipanes',
  trigger:'opciones'
},
{
  id:'condolencias',
  message:'Las flores apropiadas para expresar condolencia son: Lirio blanco, Rosa blanca y Orquídeas blancas',
  trigger:'opciones'
},
{
  id:'cumpleaños',
  message:'Las flores aptas para cumpleaños son: Girasoles, Rosas de colores y Lirios',
  trigger:'opciones'
},
{
  id:'bautizos',
  message:'Las flores para un bautizo son: Tulipanes, Rosas y Lirios',
  trigger:'opciones'
},
{
  id:'agradecimiento',
  message:'Las flores para mostrar agradecimiento son: Tulipanes, Margaritas y Lilas',
  trigger:'opciones'
}

];

return(
    
  <ThemeProvider theme={otherFontTheme}>
   
    <ChatBot
        steps={steps}
        headerTitle= "Rossie-Servicio al Cliente"
      
        floatingStyle={{

          borderRadius: '50%',
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.3)'
        }}
        
        opened={false}
        floating={true}
        style={{ width: '450px', height: '470px', headerBgColor:'purple' }}
          floatingIcon={<img src="/images/Chatbot.png" height={'50px'} alt="Chatbot Icon" />}
          botAvatar="/images/Chatbot2.png"
        optionStyle={{ width: '200px', fontSize: '12px', background:'#d72d3b' }}
      />
  
     </ThemeProvider>
 
  

)
      };

