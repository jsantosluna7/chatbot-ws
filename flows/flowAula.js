// const { addKeyword, EVENTS, flowDynamic, endFlow, gotoFlow} = require('@bot-whatsapp/bot');
// const { converText } = require('../funciones/convert-text.js');
// const { sepParrafos } = require('../funciones/sep-parafos.js');


// let aula;

// let apiData = null;

// async function apiAulas(aula) {
//     try {
//         const res = await fetch(`https://chatbot-ws-3ce88-default-rtdb.firebaseio.com/aulas/${aula}.json?key=AIzaSyCGu5fy0XiiV7WoPd2zudt7dLaXvYVzHYU`);
//         if (!res.ok) {
//             throw new Error(`HTTP error! Status: ${res.status}`);
//         }
//         apiData = await res.json(); // Guardar los datos en la variable global
//     } catch (error) {
//             return endFlow(
//             {
//                 body: 'Error al obtener los datos:', error
//             }
//         )
//     }
// }

// let listaAulas = ['bano', 'cafeteria', 'desarrollo-de-software', 'fabrica-inteligente', 'informatica-forense', 'instrumentacion-y-control-de-procesos', 'laboratorios-generales-de-informatica-i-y-ii', 'manufactura-automatizada', 'mecanica-aplicada', 'microelectronica', 'multimedia', 'redes-convergentes', 'redes-electricas-inteligentes', 'sistema-comunicaciones', 'sistemas-informaticos-y-diseño', 'taller-de-proyectos'];

// const flowAula = addKeyword(['aula', 'aulas'])
//     .addAnswer(
//         [
//             'Dime el *nombre* del aula que deseas buscar. 🔍',
//             '',
//             'O escriba *cancelar* para terminar la solicitud. 🚫'
//         ],
//         {
//             capture: true
//         },
//         async (ctx, {flowDynamic, endFlow, gotoFlow}) => {
//             if(converText(ctx.body) === 'cancelar'){
//                 await flowDynamic(
//                     [
//                         {
//                             body: '🚫 La solicitud ha sido cancelada.'
//                         }
//                     ]
//                 )
//                 return gotoFlow()
                
//             }
//             else{
//                 aula = converText(ctx.body)
//                 if(listaAulas.includes(aula)){
//                     apiAulas(aula)
//                     setTimeout(() => {
//                         async function obtenerAulas(){
//                             await flowDynamic(
//                                 [
                                    
//                                     {
//                                         body: `*${apiData.nombre}*`,
//                                         media: apiData.img
//                                     }
//                                 ]
//                             )
    
//                             await flowDynamic(
//                                 [
//                                     {
//                                         body: sepParrafos(apiData.descripcion)
//                                     }
//                                 ]
//                             )
    
//                             await flowDynamic(
//                                 [
//                                     {
//                                         body: 'audio',
//                                         media: apiData.audio
//                                     }
//                                 ]
//                             ); //Intoducir audios.
    
//                             return endFlow(sepParrafos('¡Gracias por utilizar el chatbot!. Vuelva pronto 👋'))
//                         }
//                         obtenerAulas();
//                     }, 9500)
//                 }
//                 else{
//                     await flowDynamic(
//                         [
//                             {
//                                 body: `🚫 Error fatal, ${ctx.body} no existe. Introduce un aula valida.`
//                             }
//                         ]
//                     )
//                     return gotoFlow(flowAula)
//                 }
                
//                 await flowDynamic(
//                     [
//                         {
//                             delay: 2000,
//                             body: 'Estamos trabajando en ello... ⌛'
//                         }
//                     ]
//                 )
//                 await flowDynamic(
//                     [
//                         {
//                             delay: 2000,
//                             body: '⏳'
//                         }
//                     ]
//                 )
//                 await flowDynamic(
//                     [
//                         {
//                             delay: 2000,
//                             body: '⌛'
//                         }
//                     ]
//                 )
//                 await flowDynamic(
//                     [
//                         {
//                             delay: 1000,
//                             body: '⏳'
//                         }
//                     ]
//                 )
//             }
//         }
//     )

// module.exports = { flowAula };