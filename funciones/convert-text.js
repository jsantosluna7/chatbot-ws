const converText = (txt) => {
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

module.exports = { converText };