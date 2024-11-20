const url_de_backend = 'http://localhost:3000/api/cita';
const url_para_traducir = 'https://api.mymemory.translated.net/get';

const Cita_contenedor = document.getElementById('contenedor-cita');
const citacion = document.getElementById('cita');
const AUTOR = document.getElementById('autor');

// Llamar al backend para obtener la cita
fetch(url_de_backend)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const cita = data.content; // Contenido de la cita
        const author = data.author; // Autor de la cita

        // Mostrar la cita y el autor en inglés
        citacion.textContent = cita;
        AUTOR.textContent = `- ${author}`;

        // Traducir cita a español
        traducir_cita(cita);
    })
    .catch(error => {
        console.error('Error al obtener la cita:', error);
        citacion.textContent = 'Error al cargar la cita.';
    });

// Función para traducir cita a español
function traducir_cita(cita) {
    const parametros = new URLSearchParams({
        q: cita,
        langpair: 'en|es' // Traducción de inglés a español
    });

    // Realizar solicitud de traducción
    fetch(`${url_para_traducir}?${parametros}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const translatedQuote = data.responseData.translatedText;

            // Mostrar cita traducida
            const translatedCitaElement = document.createElement('p');
            translatedCitaElement.textContent = `Traducción: ${translatedQuote}`;
            Cita_contenedor.appendChild(translatedCitaElement); // Agregar la cita traducida al contenedor
        })
        .catch(error => {
            console.error('Error al traducir la cita:', error);
            citacion.textContent = 'Error al cargar la cita traducida.';
        });
}