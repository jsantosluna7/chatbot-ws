// const { addKeyword, EVENTS } = require('@bot-whatsapp/bot');
// const { flowCodigo } = require('./flowCodigo.js');
// const { flowAula } = require('./flowAula.js')


// const flowPrincipal = addKeyword(EVENTS.WELCOME)
//     .addAnswer('Bienvenido/a al CIDIL 👋', {delay: 2000}) //Agregarle un delay.
//     .addAnswer(
//         [
//             '¿Cómo quieres iniciar?',
//             '',
//             '*Para iniciar, escribe una de las siguientes palabras clave:*',
//             '',
//             '👉 *Aula* *->* Busca por el nombre del aula.',
//             '',
//             '👉 *Código* *->* Busca por el código del aula.'
//         ],
//         null,
//         null,
//         [flowAula, flowCodigo]
//     )

// module.exports = { flowPrincipal };