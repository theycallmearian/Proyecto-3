import './style.css'

//! CREAR HEADER
import { createHeader } from './src/components/header/header'
import { button } from './src/components/button/button'
import { setupDarkModeSwitch } from './src/functions/function_darkmode'
import { setupEventListeners } from './src/functions/function_searchbar'
createHeader()

// Función para insertar el botón "¿Quieres ver más?"

function insertShowMoreButton() {
  const mainElement = document.querySelector('main')
  const divResultado = document.getElementById('resultado-busqueda')

  if (mainElement && divResultado) {
    const botonHTML = button({ texto: '¿Quieres ver más?' })
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = botonHTML
    mainElement.insertBefore(tempDiv.firstChild, divResultado.nextSibling)
  }
}

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
  setupDarkModeSwitch()
  insertShowMoreButton()
  setupEventListeners()
})
