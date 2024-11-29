const { addKeyword, EVENTS, flowDynamic, endFlow, gotoFlow } = require('@bot-whatsapp/bot')
const { converText } = require('../funciones/convert-text.js');
const { sepParrafos } = require('../funciones/sep-parafos.js');

let codigo;
let apiData = null;

async function apiCodigos(codigo) {
    try {
        const res = await fetch(`https://chatbot-ws-3ce88-default-rtdb.firebaseio.com/aulas-codigo/${codigo}.json?key=AIzaSyCGu5fy0XiiV7WoPd2zudt7dLaXvYVzHYU`);
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        apiData = await res.json(); // Guardar los datos en la variable global
    } catch (error) {
            return endFlow(
            {
                body: 'Error al obtener los datos:', error
            }
        )
    }
}

let listaPiso1 = ['1a', '1b', '1c', '1d'];
let listaPiso2 = ['2a', '2b', '2c', '2d'];
let listaPiso3 = ['3a', '3b', '3c', '3d'];

const flowPiso1 = addKeyword('1')
    .addAnswer(
        [
            'Elegiste el piso #1. Indicame el código del aula a la que te quieres dirigir 🤔',
            '',
            '*1A --> Mecánica Aplicada*',
            '',
            '*1B --> Fábrica Inteligente*',
            '',
            '*1C --> Redes Eléctricas Inteligentes*',
            '',
            '*1D --> Instrumentación y Control de Procesos*',
            '',
            'O escriba *cancelar* para terminar la solicitud. 🚫'
        ],
        {
            capture: true
        },
        async (ctx, {flowDynamic, endFlow, gotoFlow}) => {
            if(converText(ctx.body) === 'cancelar'){
                await flowDynamic(
                    [
                        {
                            body: '🚫 La solicitud ha sido cancelada.'
                        }
                    ]
                )
                return gotoFlow() //Dirigir al flowCodigo, creando otro archivo para exportarlo.
            }
            else{
                codigo = converText(ctx.body)
                if(listaPiso1.includes(codigo)){
                    apiCodigos(codigo)
                    setTimeout(() => {
                        async function obtenerCodigo(){
                            await flowDynamic(
                                [
                                    
                                    {
                                        body: `*${apiData.nombre}*`,
                                        media: apiData.img
                                    }
                                ]
                            )
    
                            await flowDynamic(
                                [
                                    {
                                        body: sepParrafos(apiData.descripcion)
                                    }
                                ]
                            )
    
                            await flowDynamic(
                                [
                                    {
                                        body: 'audio',
                                        media: apiData.audio
                                    }
                                ]
                            ); //Intoducir audios.
    
                            return endFlow(sepParrafos('¡Gracias por utilizar el chatbot!. Vuelva pronto 👋'))
                        }
                        obtenerCodigo();
                    }, 9500)
                }
                else{
                    await flowDynamic(
                        [
                            {
                                body: `🚫 Error fatal, el codigo *${ctx.body}* no existe. Introduce un código valido.`
                            }
                        ]
                    )
                    return gotoFlow(flowPiso1)
                }

                await flowDynamic(
                    [
                        {
                            delay: 2000,
                            body: 'Estamos trabajando en ello... ⌛'
                        }
                    ]
                )
                await flowDynamic(
                    [
                        {
                            delay: 2000,
                            body: '⏳'
                        }
                    ]
                )
                await flowDynamic(
                    [
                        {
                            delay: 2000,
                            body: '⌛'
                        }
                    ]
                )
                await flowDynamic(
                    [
                        {
                            delay: 1000,
                            body: '⏳'
                        }
                    ]
                )
            }
        }
    )

const flowPiso2 = addKeyword('2')
    .addAnswer(
        [
            'Elegiste el piso #2. Indicame el código del aula a la que te quieres dirigir 🤔',
            '',
            '*2A --> Microelectrónica*',
            '',
            '*2B --> Manufactura automatizada*',
            '',
            '*2C --> Sistemas de Comunicaciones*',
            '',
            '*2D --> Multimedia*',
            '',
            'O escriba *cancelar* para terminar la solicitud. 🚫'
        ],
        {
            capture: true
        },
        async (ctx, {flowDynamic, endFlow, gotoFlow}) => {
            if(converText(ctx.body) === 'cancelar'){
                await flowDynamic(
                    [
                        {
                            body: '🚫 La solicitud ha sido cancelada.'
                        }
                    ]
                )
                return gotoFlow() //Dirigir al flowCodigo, creando otro archivo para exportarlo.
            }
            else{
                codigo = converText(ctx.body)
                if(listaPiso2.includes(codigo)){
                    apiCodigos(codigo)
                    setTimeout(() => {
                        async function obtenerCodigo(){
                            await flowDynamic(
                                [
                                    
                                    {
                                        body: `*${apiData.nombre}*`,
                                        media: apiData.img
                                    }
                                ]
                            )
    
                            await flowDynamic(
                                [
                                    {
                                        body: sepParrafos(apiData.descripcion)
                                    }
                                ]
                            )
    
                            await flowDynamic(
                                [
                                    {
                                        body: 'audio',
                                        media: apiData.audio
                                    }
                                ]
                            ); //Intoducir audios.
    
                            return endFlow(sepParrafos('¡Gracias por utilizar el chatbot!. Vuelva pronto 👋'))
                        }
                        obtenerCodigo();
                    }, 9500)
                }
                else{
                    await flowDynamic(
                        [
                            {
                                body: `🚫 Error fatal, el codigo *${ctx.body}* no existe. Introduce un código valido.`
                            }
                        ]
                    )
                    return gotoFlow(flowPiso2)
                }

                await flowDynamic(
                    [
                        {
                            delay: 2000,
                            body: 'Estamos trabajando en ello... ⌛'
                        }
                    ]
                )
                await flowDynamic(
                    [
                        {
                            delay: 2000,
                            body: '⏳'
                        }
                    ]
                )
                await flowDynamic(
                    [
                        {
                            delay: 2000,
                            body: '⌛'
                        }
                    ]
                )
                await flowDynamic(
                    [
                        {
                            delay: 1000,
                            body: '⏳'
                        }
                    ]
                )
            }
        }
    )

const flowPiso3 = addKeyword('3')
    .addAnswer(
        [
            'Elegiste el piso #3. Indicame el código del aula a la que te quieres dirigir 🤔',
            '',
            '*3A --> Desarrollo de software*',
            '',
            '*3B --> Sistemas informáticos y diseño*',
            '',
            '*3C --> Redes Convergentes*',
            '',
            '*3D --> Informática Forense*',
            '',
            'O escriba *cancelar* para terminar la solicitud. 🚫'
        ],
        {
            capture: true
        },
        async (ctx, {flowDynamic, endFlow, gotoFlow}) => {
            if(converText(ctx.body) === 'cancelar'){
                await flowDynamic(
                    [
                        {
                            body: '🚫 La solicitud ha sido cancelada.'
                        }
                    ]
                )
                return gotoFlow() //Dirigir al flowCodigo, creando otro archivo para exportarlo.
            }
            else{
                codigo = converText(ctx.body)
                if(listaPiso3.includes(codigo)){
                    apiCodigos(codigo)
                    setTimeout(() => {
                        async function obtenerCodigo(){
                            await flowDynamic(
                                [
                                    
                                    {
                                        body: `*${apiData.nombre}*`,
                                        media: apiData.img
                                    }
                                ]
                            )
    
                            await flowDynamic(
                                [
                                    {
                                        body: sepParrafos(apiData.descripcion)
                                    }
                                ]
                            )
    
                            await flowDynamic(
                                [
                                    {
                                        body: 'audio',
                                        media: apiData.audio
                                    }
                                ]
                            ); //Intoducir audios.
    
                            return endFlow(sepParrafos('¡Gracias por utilizar el chatbot!. Vuelva pronto 👋'))
                        }
                        obtenerCodigo();
                    }, 9500)
                }
                else{
                    await flowDynamic(
                        [
                            {
                                body: `🚫 Error fatal, el codigo *${ctx.body}* no existe. Introduce un código valido.`
                            }
                        ]
                    )
                    return gotoFlow(flowPiso3)
                }

                await flowDynamic(
                    [
                        {
                            delay: 2000,
                            body: 'Estamos trabajando en ello... ⌛'
                        }
                    ]
                )
                await flowDynamic(
                    [
                        {
                            delay: 2000,
                            body: '⏳'
                        }
                    ]
                )
                await flowDynamic(
                    [
                        {
                            delay: 2000,
                            body: '⌛'
                        }
                    ]
                )
                await flowDynamic(
                    [
                        {
                            delay: 1000,
                            body: '⏳'
                        }
                    ]
                )
            }
        }
    )

module.exports = { flowPiso1, flowPiso2, flowPiso3 };