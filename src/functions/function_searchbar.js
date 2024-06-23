let keyword = 'marvel' // Variable que guarda la palabra a buscar

async function buscarImagenes(
  keywordParam,
  page,
  resultadoBusqueda,
  accesKey,
  clearInput
) {
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keywordParam}&client_id=${accesKey}&per_page=20`

  try {
    const response = await fetch(url)
    const data = await response.json()

    if (page === 1) {
      resultadoBusqueda.innerHTML = ''
    }

    const resultados = data.results

    if (resultados.length === 0) {
      await showToast(
        `No se han encontrado resultados para: '${keywordParam}'. ¿Pero a quién no le va a gustar una búsqueda de lindos gatitos?`
      )

      // Realizar nueva búsqueda con "gatos"
      keyword = 'gatos'
      return buscarImagenes(
        'gatos',
        page,
        resultadoBusqueda,
        accesKey,
        clearInput
      )
    } else {
      resultados.forEach((result) => {
        const imagen = document.createElement('img')
        imagen.src = result.urls.regular
        const imagenLink = document.createElement('a')
        imagenLink.href = result.links.html
        imagenLink.target = '_blank'

        imagenLink.appendChild(imagen)
        resultadoBusqueda.appendChild(imagenLink)
      })
    }

    // Limpiar el input después de la búsqueda
    if (clearInput) clearInput.value = ''
  } catch (error) {
    console.error('Error fetching images:', error)
    await showToast('Hubo un error al buscar las imágenes.')
  } finally {
    enableSearch()
    scrollToBottom()
  }
}

// Función para desplazar la barra de desplazamiento hacia la parte inferior
function scrollToBottom() {
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
}

// Función para deshabilitar la búsqueda
function disableSearch() {
  const formBusqueda = document.querySelector('.search-form')
  const mostrarMas = document.querySelector('.main-button')
  const logo = document.querySelector('.logo')
  const inicio = document.querySelector('.inicio')

  if (formBusqueda) formBusqueda.querySelector('button').disabled = true
  if (mostrarMas) mostrarMas.disabled = true
  if (logo) logo.disabled = true
  if (inicio) inicio.disabled = true
}

// Función para habilitar la búsqueda
function enableSearch() {
  const formBusqueda = document.querySelector('.search-form')
  const mostrarMas = document.querySelector('.main-button')
  const logo = document.querySelector('.logo')
  const inicio = document.querySelector('.inicio')

  if (formBusqueda) formBusqueda.querySelector('button').disabled = false
  if (mostrarMas) mostrarMas.disabled = false
  if (logo) logo.disabled = false
  if (inicio) inicio.disabled = false
}

// Configuración de eventos
export function setupEventListeners() {
  const formBusqueda = document.querySelector('.search-form')
  const cajaBusqueda = document.querySelector('.search-bar')
  const resultadoBusqueda = document.querySelector('#resultado-busqueda')
  const mostrarMas = document.querySelector('.main-button')
  const logo = document.querySelector('.logo')
  const inicio = document.querySelector('.inicio')

  let page = 1 // Página donde buscar
  const accesKey = 'X00jin0uqDWByOLZ4Z1_OAqmdH817FUPHtdqQYXxpjQ'

  // Indicar cuando debe ejecutarse la búsqueda
  if (formBusqueda) {
    formBusqueda.addEventListener('submit', async (e) => {
      e.preventDefault()
      page = 1
      keyword = cajaBusqueda.value || 'marvel'
      disableSearch()
      await buscarImagenes(
        keyword,
        page,
        resultadoBusqueda,
        accesKey,
        cajaBusqueda
      )
    })
  }

  // Agregar funcionalidad al botón "¿Quieres ver más?"
  if (mostrarMas) {
    mostrarMas.addEventListener('click', async () => {
      page++
      disableSearch()
      await buscarImagenes(keyword, page, resultadoBusqueda, accesKey)
    })
  }

  // Reiniciar búsqueda al hacer clic en el logo
  if (logo) {
    logo.addEventListener('click', async () => {
      page = 1
      keyword = 'marvel'
      disableSearch()
      await buscarImagenes(keyword, page, resultadoBusqueda, accesKey)
    })
  }

  // Reiniciar búsqueda al hacer clic en el inicio
  if (inicio) {
    inicio.addEventListener('click', async () => {
      page = 1
      keyword = 'marvel'
      disableSearch()
      await buscarImagenes(keyword, page, resultadoBusqueda, accesKey)
    })
  }

  // Realizar la búsqueda inicial
  buscarImagenes(keyword, page, resultadoBusqueda, accesKey)
}

function showToast(message) {
  return new Promise((resolve) => {
    const toast = document.createElement('div')
    toast.classList.add('toast')

    const img = document.createElement('img')
    img.src =
      'https://res.cloudinary.com/dye4qdrys/image/upload/v1719140331/game-over-game_mhnvsf.gif'
    img.classList.add('toastimg')

    const p = document.createElement('p')
    p.textContent = message

    toast.appendChild(img)
    toast.appendChild(p)

    const main = document.querySelector('main')
    main.appendChild(toast)

    // Eliminar el toast después de unos segundos
    setTimeout(() => {
      toast.remove()
      resolve() // Resolver la promesa cuando el toast desaparezca
    }, 3000) // 3000 milisegundos = 3 segundos
  })
}
