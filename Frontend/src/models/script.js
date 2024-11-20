// Obtener elementos del DOM
const contenedorDeFiltros = document.getElementById('contenedorDeFiltros');
const catalogo = document.getElementById('catalogo');
const claveAPI = "AIzaSyAZKC4M3tPRQS0T3L8F_yyQL5FXTAI0Ce0";

// Categorías estáticas
const categoriaAgregada = [
    { key: "fiction", name: "Ficción" },
    { key: "science", name: "Ciencia" },
    { key: "history", name: "Historia" },
    { key: "fantasy", name: "Fantasía" },
];

// Inicializar categorías y configuración predeterminada
async function inicializarCategorias() {
    creaFiltros(categoriaAgregada);
    const categoriaPredeterminada = "fiction";
    await fetchLibroPorCategoria(categoriaPredeterminada);
}

// Crear dinámicamente los filtros
function creaFiltros(categorias) {
    contenedorDeFiltros.innerHTML = '<h2>Filtrar libro por categoría</h2>';
    categorias.forEach(category => {
        const label = document.createElement('label');
        label.innerHTML = `
            <input type="checkbox" value="${category.key}" class="filtro">
            ${category.name}
        `;
        contenedorDeFiltros.appendChild(label);
    });
}

// Evento de cambio de filtros
contenedorDeFiltros.addEventListener('change', async () => {
    const seleccionarFiltro = Array.from(document.querySelectorAll('.filtro:checked'))
        .map(f => f.value);

    const query = seleccionarFiltro.length > 0
        ? seleccionarFiltro.join('|')
        : "fiction"; // Categoría predeterminada

    await fetchLibroPorCategoria(query, 0); // Comienza desde el inicio al cambiar de categoría
});

// Buscar libros por categoría usando la API de Google Books
async function fetchLibroPorCategoria(categorias, startIndex = 0) {
    try {
        const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${categorias}&maxResults=8&startIndex=${startIndex}&key=${claveAPI}`;
        const response = await fetch(url);
        const data = await response.json();
        verLibros(data.items, categorias, startIndex); // Mostrar los libros
    } catch (error) {
        console.error('Error al buscar los libros por categoría', error);
    }
}

// Mostrar los libros en el catálogo
function verLibros(libros, categorias, startIndex) {
    catalogo.innerHTML = ''; // Limpia el catálogo antes de mostrar nuevos libros
    if (!libros || libros.length === 0) {
        catalogo.innerHTML = '<p>No se encontraron libros.</p>';
        return;
    }

    libros.forEach(libro => {
        const div = document.createElement('div');
        div.className = 'libro';
        div.innerHTML = `
            <h3>${libro.volumeInfo.title || 'Título no disponible'}</h3>
            <p><strong>Autor:</strong> ${libro.volumeInfo.authors?.join(', ') || 'Desconocido'}</p>
            <a href="detalle.html?id=${libro.id}">
                <img src="${libro.volumeInfo.imageLinks?.thumbnail || 'Imagen no disponible'}" alt="Portada del libro">
            </a>
        `;
        catalogo.appendChild(div);
    });    

    // Agregar botones de navegación
    const nav = document.createElement('div');
    nav.className = 'navegacion';
    nav.innerHTML = `
        <button ${startIndex === 0 ? 'disabled' : ''} id="anterior">Anterior</button>
        <button ${libros.length < 40 ? 'disabled' : ''} id="siguiente">Siguiente</button>
    `;
    catalogo.appendChild(nav);

    // Eventos para los botones
    document.getElementById('anterior')?.addEventListener('click', () => {
        fetchLibroPorCategoria(categorias, startIndex - 40);
    });
    document.getElementById('siguiente')?.addEventListener('click', () => {
        fetchLibroPorCategoria(categorias, startIndex + 40);
    });
}

// Función de búsqueda
async function buscarLibro(event) {
    event.preventDefault();  // Evitar el comportamiento predeterminado del formulario

    const terminoBusqueda = document.getElementById('Ibusqueda').value;  // Obtener el valor del input
    if (!terminoBusqueda) {
        alert("Por favor ingresa un título para buscar.");
        return;
    }

    try {
        const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${terminoBusqueda}&key=${claveAPI}`;
        const response = await fetch(url);
        const data = await response.json();
        verLibros(data.items, terminoBusqueda);  // Mostrar los libros encontrados
    } catch (error) {
        console.error('Error al realizar la búsqueda', error);
    }
}

// Agregar el evento al formulario de búsqueda
const formularioBusqueda = document.getElementById('busqueda');
formularioBusqueda.addEventListener('submit', buscarLibro);

// Inicializar la página
inicializarCategorias();
