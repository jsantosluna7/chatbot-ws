const { createBot, createProvider, createFlow, addKeyword, EVENTS, flowDynamic, endFlow, gotoFlow} = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock');
const { delay } = require('@whiskeysockets/baileys');
const { flowPiso1, flowPiso2, flowPiso3 } = require('./flows/flowPisos.js')

//Agregamos la variable del aula de entrada del usuario
let aula;


function converText(txt){
    // Convertir a minúsculas y reemplazar tildes
    const textoNormalizado = txt
        .toLowerCase()
        .normalize("NFD") // Descompone los caracteres con tilde
        .replace(/[\u0300-\u036f]/g, ""); // Elimina los caracteres de acento

    // Reemplazar la ñ por n
    const textoSinEspeciales = textoNormalizado.replace(/ñ/g, 'n');

    // Reemplazar espacios por guiones
    return textoSinEspeciales.replace(/\s+/g, '-');
}

function sepParrafos(texto) {
    // Usar regex para separar por puntos seguidos de espacio o final de línea
    const parrafos = texto.split(/(?<=\.)\s/);

    // Unir los párrafos con un salto de línea y espacio adicional
    const resultado = parrafos.join('\n\n');

    return resultado;
}

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

let listaAulas = ['bano', 'cafeteria', 'desarrollo-de-software', 'fabrica-inteligente', 'informatica-forense', 'instrumentacion-y-control-de-procesos', 'laboratorios-generales-de-informatica-i-y-ii', 'manufactura-automatizada', 'mecanica-aplicada', 'microelectronica', 'multimedia', 'redes-convergentes', 'redes-electricas-inteligentes', 'sistema-comunicaciones', 'sistemas-informaticos-y-diseño', 'taller-de-proyectos'];

const flowAula = addKeyword('aula')
    .addAnswer(
        [
            'Dime el nombre del aula que deseas buscar. 🔍',
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


const flowCodigo = addKeyword('codigo')
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
        null,
        null,
        [flowPiso1, flowPiso2, flowPiso3]
    )


const flowPrincipal = addKeyword(EVENTS.WELCOME)
    .addAnswer('Bienvenido/a al CIDIL 👋', {delay: 2000}) //Agregarle un delay.
    .addAnswer(
        [
            '¿Cómo quieres iniciar?',
            '',
            '*Para iniciar, escribe la palabra clave.*',
            '',
            '👉 *aula* *->* Busca por el nombre del aula.',
            '',
            '👉 *codigo* *->* Busca por el codigo del aula.'
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