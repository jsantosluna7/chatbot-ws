const sepParrafos = (texto) => {
    // Usar regex para separar por puntos seguidos de espacio o final de línea
    const parrafos = texto.split(/(?<=\.)\s/);

    // Unir los párrafos con un salto de línea y espacio adicional
    const resultado = parrafos.join('\n\n');

    return resultado;
}

module.exports = { sepParrafos }