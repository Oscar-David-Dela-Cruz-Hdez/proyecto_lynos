// Obtener el ID del libro desde la URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const bookId = urlParams.get('id');

const contenedor_libro_detalle = document.getElementById('libro-detalle');

// Verificar si se obtuvo el ID
if (bookId) {
    // Hacer la solicitud a la API para obtener los detalles
    fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
        .then(response => response.json())
        .then(data => {
            const book = data;

            // Mostrar los detalles del libro
            contenedor_libro_detalle.innerHTML = `
            <div class="libro">
                <h2>${book.volumeInfo.title || 'Título no disponible'}</h2>
                <img src="${book.volumeInfo.imageLinks?.thumbnail || 'Imagen no disponible'}" alt="Portada del libro">
                <p><strong>Autor:</strong> ${book.volumeInfo.authors?.join(', ') || 'Desconocido'}</p>
                <p><strong>Descripción:</strong> ${book.volumeInfo.description || 'Sin descripción'}</p>
            </div>
        `;
        })
        .catch(error => {
            console.error('Error al obtener detalles del libro:', error);
            contenedor_libro_detalle.innerHTML = '<p>Error al cargar los detalles del libro.</p>';
        });
} else {
    contenedor_libro_detalle.innerHTML = '<p>ID del libro no proporcionado.</p>';
}
