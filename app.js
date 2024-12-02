const { createBot, createProvider, createFlow, addKeyword, EVENTS, flowDynamic, endFlow, gotoFlow} = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock');
const { delay } = require('@whiskeysockets/baileys');
const { converText } = require('./funciones/convert-text.js');
const { sepParrafos } = require('./funciones/sep-parafos.js');

let codigo;
let aula;

let apiData = null;

async function apiAulas(aula) {
    try {
        const res = await fetch(`https://chatbot-ws-3ce88-default-rtdb.firebaseio.com/aulas/${aula}.json?key=AIzaSyCGu5fy0XiiV7WoPd2zudt7dLaXvYVzHYU`);
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

let listaAulas = ['banos', 'cafeteria', 'desarrollo-de-software', 'fabrica-inteligente', 'informatica-forense', 'instrumentacion-y-control-de-procesos', 'laboratorios-generales-de-informatica-i-y-ii', 'manufactura-automatizada', 'mecanica-aplicada', 'microelectronica', 'multimedia', 'redes-convergentes', 'redes-electricas-inteligentes', 'sistema-comunicaciones', 'sistemas-informaticos-y-diseño', 'taller-de-proyectos'];

const flowAula = addKeyword(['aula', 'aulas'])
    .addAnswer(
        [
            'Dime el *nombre* del aula que deseas buscar. 🔍',
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
                return gotoFlow(flowPrincipal)
                
            }
            else{
                aula = converText(ctx.body)
                if(listaAulas.includes(aula)){
                    apiAulas(aula)
                    setTimeout(() => {
                        async function obtenerAulas(){
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
                                        body: 'Croquis, para guiarte al destino.',
                                        media: apiData.mapme
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
                        obtenerAulas();
                    }, 9500)
                }
                else{
                    await flowDynamic(
                        [
                            {
                                body: `🚫 Error fatal, ${ctx.body} no existe. Introduce un aula valida.`
                            }
                        ]
                    )
                    return gotoFlow(flowAula)
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

let listaPiso1 = ['1a', '1b', '1c', '1d', 'banos', 'cafeteria'];
let listaPiso2 = ['2a', '2b', '2c', '2d', 'banos', '2e'];
let listaPiso3 = ['3a', '3b', '3c', '3d', 'banos', '3e'];

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
            '*Baños --> Los baños para damas y caballeros*',
            '',
            '*Cafeteria --> Sitio para comer*',
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
                return gotoFlow(flowCodigo) //Dirigir al flowCodigo, creando otro archivo para exportarlo.
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
                                        body: 'Croquis, para guiarte al destino.',
                                        media: apiData.mapme
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
            '*2E --> Laboratorios Generales de Informática I y II*',
            '',
            '*Baños --> Los baños para damas y caballeros*',
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
                return gotoFlow(flowCodigo) //Dirigir al flowCodigo, creando otro archivo para exportarlo.
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
                                        body: 'Croquis, para guiarte al destino.',
                                        media: apiData.mapme
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
            '*3E --> Taller de Proyectos*',
            '',
            '*Baños --> Los baños para damas y caballeros*',
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
                return gotoFlow(flowCodigo) //Dirigir al flowCodigo, creando otro archivo para exportarlo.
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
                                        body: 'Croquis, para guiarte al destino.',
                                        media: apiData.mapme
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




const flowCodigo = addKeyword(['codigo', 'código'])
    .addAnswer(
        [
            'Introduce el piso donde está en aula. 🔍',
            '',
            '*1*',
            '',
            '*2*',
            '',
            '*3*',
            '',
            'O escriba *cancelar* para terminar la solicitud. 🚫'
        ],
        {
            capture: true
        },
        async (ctx, {gotoFlow, flowDynamic}) => {
            if(converText(ctx.body) === 'cancelar'){
                await flowDynamic(
                    [
                        {
                            body: '🚫 La solicitud ha sido cancelada.'
                        }
                    ]
                )
                return gotoFlow(flowPrincipal)
            }
        },
        [flowPiso1, flowPiso2, flowPiso3] //Areglar con un switch
    )


const flowPrincipal = addKeyword(EVENTS.WELCOME)
    .addAnswer('Bienvenido/a al CIDIL 👋', {delay: 2000}) //Agregarle un delay.
    .addAnswer(
        [
            '¿Cómo quieres iniciar?',
            '',
            '*Para iniciar, escribe una de las siguientes palabras clave:*',
            '',
            '👉 *Aula* *->* Busca por el nombre del aula.',
            '',
            '👉 *Código* *->* Busca por el código del aula.'
        ],
        null,
        null,
        [flowAula, flowCodigo]
    )


const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
