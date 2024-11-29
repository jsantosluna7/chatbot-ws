const { addKeyword } = require('@bot-whatsapp/bot')
const { flowPiso1, flowPiso2, flowPiso3 } = require('./flowPisos.js')

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
        null,
        null,
        [flowPiso1, flowPiso2, flowPiso3] //Areglar con un switch
    )

module.exports = { flowCodigo };