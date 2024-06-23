/* quiero que la barra de busqueda sugiera posibles busquedas en bucle y tengan una animacion que sea typescript tipo maquina de escribir */

import './header.css'

export const createHeader = () => {
  // Crear elementos
  const navbar = document.querySelector('header')
  const logo = document.createElement('img')
  const ul = document.createElement('ul')
  const explorar = document.createElement('li')
  const inicio = document.createElement('li')
  const buscador = document.createElement('form')
  const inputBuscar = document.createElement('input')
  const btnBuscar = document.createElement('button')
  const btnImg = document.createElement('img')
  const notificaciones = document.createElement('img')
  const mensajes = document.createElement('img')

  // Establecer atributos y propiedades
  logo.src =
    'https://res.cloudinary.com/dye4qdrys/image/upload/v1719140330/logo_little_yz84uc.svg'
  logo.classList.add('logo')

  inicio.textContent = 'Inicio'
  inicio.classList.add('inicio')

  explorar.textContent = 'Explorar'
  explorar.classList.add('explorar')

  btnBuscar.classList.add('search')

  buscador.classList.add('search-form')
  inputBuscar.type = 'text'
  inputBuscar.placeholder = ''
  inputBuscar.classList.add('search-bar')

  // Palabras sugeridas para el placeholder
  const suggestedWords = [
    'Busca aquí lo que quieras...',
    'Vinilos',
    'Pelicula',
    'Queso',
    'Viajes',
    'Ohana',
    '¿Necesitas inspiración?',
    'Marvel',
    'Pizza',
    'Star Wars',
    'Hamburguesas'
  ]

  let currentWordIndex = 0
  let placeholderIndex = 0
  const placeholderInterval = 70 // Tiempo entre cada letra (en milisegundos)

  function animatePlaceholder() {
    const currentWord = suggestedWords[currentWordIndex]
    if (placeholderIndex < currentWord.length) {
      inputBuscar.placeholder += currentWord.charAt(placeholderIndex)
      placeholderIndex++
      setTimeout(animatePlaceholder, placeholderInterval)
    } else {
      // Esperar antes de borrar el placeholder actual y comenzar con el siguiente
      setTimeout(() => {
        deletePlaceholder()
      }, 2000) // Tiempo de espera antes de borrar el placeholder (en milisegundos)
    }
  }

  function deletePlaceholder() {
    if (placeholderIndex >= 0) {
      const currentWord = suggestedWords[currentWordIndex]
      inputBuscar.placeholder = currentWord.slice(0, placeholderIndex)
      placeholderIndex--
      setTimeout(deletePlaceholder, placeholderInterval)
    } else {
      // Pasar a la siguiente palabra sugerida
      currentWordIndex = (currentWordIndex + 1) % suggestedWords.length
      setTimeout(animatePlaceholder, placeholderInterval)
    }
  }

  animatePlaceholder() // Iniciar la animación del placeholder

  btnBuscar.type = 'submit'
  btnBuscar.classList.add('search-button')
  btnImg.src =
    'https://res.cloudinary.com/dye4qdrys/image/upload/v1719140330/search_tpru3u.svg'
  btnImg.classList.add('button-img')

  notificaciones.src =
    'https://res.cloudinary.com/dye4qdrys/image/upload/v1719140330/inbox_udb0hk.svg'
  notificaciones.classList.add('notificaciones')

  mensajes.src =
    'https://res.cloudinary.com/dye4qdrys/image/upload/v1719140330/messages_obfwxe.svg'
  mensajes.classList.add('mensajes')

  // Crear el switch
  const switchLabel = document.createElement('label')
  switchLabel.classList.add('ui-switch', 'switch__label')
  switchLabel.setAttribute('for', 'switch')

  const switchInput = document.createElement('input')
  switchInput.id = 'switch'
  switchInput.classList.add('switch__input')
  switchInput.name = 'switch'
  switchInput.type = 'checkbox'

  const slider = document.createElement('div')
  slider.classList.add('slider')

  const circle = document.createElement('div')
  circle.classList.add('circle')
  // Agregar elementos al DOM
  navbar.appendChild(logo)
  navbar.appendChild(ul)
  ul.appendChild(inicio)
  ul.appendChild(explorar)

  navbar.appendChild(buscador)
  buscador.appendChild(inputBuscar)
  btnBuscar.appendChild(btnImg)
  buscador.appendChild(btnBuscar)

  navbar.appendChild(notificaciones)
  navbar.appendChild(mensajes)

  // Agregar el switch al final del header
  switchLabel.appendChild(switchInput)
  switchLabel.appendChild(slider)
  slider.appendChild(circle)
  navbar.appendChild(switchLabel)
}
