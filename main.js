let ultimaFechaHora = null;

function executeActions(ultimaOrden) {
    const abrirGoogle = 'abre google';
    const buscarGoogle = 'busca en google';
    const abrirYoutube = 'abre youtube';
    const buscarYoutube = 'busca en youtube';
    const abrirChatgpt = 'abre chat gpt';

    let mostrarOrden = ultimaOrden; // Guardar la última orden para mostrarla en el recuadro

    const fecha = new Date();
    const formatFecha = fecha.toLocaleString(); // Para convertir la fecha a la zona horaria del usuario

    // Resto del código para ejecutar las acciones basadas en la última orden obtenida...
    if (ultimaOrden.includes(abrirGoogle)) {
        window.open("https://www.google.com/", "_blank");
        console.log("Nueva pestaña del navegador abierta");
    } else if (ultimaOrden.includes(abrirYoutube)) {
        window.open("https://www.youtube.com/", "_blank");
        console.log("Se ha visitado YouTube");
    } else if (ultimaOrden.includes(abrirChatgpt)) {
        window.open("https://chat.openai.com/", "_blank");
        console.log("El tamaño de la ventana del navegador ha cambiado a 800x600");
    } else if (ultimaOrden.includes(buscarGoogle)) {
        const searchQuery = ultimaOrden.replace(buscarGoogle, "").trim();
        if (searchQuery !== "") {
            const googleSearchURL = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
            window.open(googleSearchURL, "_blank");
        }
        console.log("Buscando en Google:", searchQuery);
    } else if (ultimaOrden.includes(buscarYoutube)) {
        const searchQueryYouTube = ultimaOrden.replace(buscarYoutube, "").trim();
        if (searchQueryYouTube !== "") {
            const youTubeSearchURL = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQueryYouTube)}`;
            window.open(youTubeSearchURL, "_blank");
        }
        console.log("Buscando en YouTube:", searchQueryYouTube);
    } else {
        console.log("Orden no reconocida:", ultimaOrden);
    }

    // Mostrar la última orden en el recuadro
    const ordenElement = document.getElementById('orden');
    ordenElement.innerText = mostrarOrden;
    ordenElement.classList.add('recognized'); // Agregar la clase recognized para activar la animación

    // Quitar la clase recognized después de 1 segundo para detener la animación
    setTimeout(() => {
        ordenElement.classList.remove('recognized');
    }, 1000);

    console.log("Ejecutando acciones para:", ultimaOrden);
}

function obtenerUltimaOrden() {
    axios.get('https://660b579accda4cbc75dcaf79.mockapi.io/Orders')
        .then(function(response) {
            if (response.data.length > 0) { // Verificar si hay registros
                const ultimaOrden = response.data[response.data.length - 1].order; // Obtener el contenido de la última orden
                const ultimaFechaHoraOrden = response.data[response.data.length - 1].datetime; // Obtener la fecha y hora de la última orden
                console.log("Última orden:", ultimaOrden); // Mostrar el contenido en la consola
                console.log("Fecha y hora de la última orden:", ultimaFechaHoraOrden); // Mostrar la fecha y hora en la consola

                // Verificar si la última fecha y hora son diferentes a la última fecha y hora consultadas
                if (ultimaFechaHora !== ultimaFechaHoraOrden) {
                    executeActions(ultimaOrden); // Ejecutar la última orden obtenida
                    ultimaFechaHora = ultimaFechaHoraOrden; // Actualizar la última fecha y hora consultadas
                } else {
                    console.log("La última orden es la misma que la anterior. No se ejecutan acciones.");
                }
            } else {
                console.log("No hay registros disponibles");
            }
        })
        .catch(function(error) {
            console.log(error);
        });
}

// Llamar a la función para obtener la última orden cada 2 segundos
setInterval(obtenerUltimaOrden, 2000);
