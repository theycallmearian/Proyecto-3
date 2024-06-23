// Función para cambiar al modo oscuro
export function setupDarkModeSwitch() {
  const switchElement = document.querySelector('#switch')

  if (switchElement) {
    switchElement.oninput = () => {
      document.body.classList.toggle('dark', switchElement.checked)

      // Definir una función para actualizar los estilos de modo oscuro
      const updateDarkMode = () => {
        const header = document.querySelector('header')
        if (header) {
          header.classList.toggle('dark', switchElement.checked)
        }

        const main = document.querySelector('main')
        if (main) {
          main.classList.toggle('dark', switchElement.checked)
        }

        const toasts = document.querySelectorAll('.toast')
        toasts.forEach((toast) => {
          toast.classList.toggle('dark', switchElement.checked)
        })

        const images = document.querySelectorAll('img')
        images.forEach((img) => {
          img.classList.toggle('dark', switchElement.checked)
        })
      }

      // Llamar a la función para actualizar los estilos inicialmente
      updateDarkMode()

      // Crear un MutationObserver para observar cambios en el DOM
      const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList') {
            updateDarkMode()
          }
        }
      })

      // Configurar el observer para observar el documento completo
      observer.observe(document.body, { childList: true, subtree: true })
    }
  }
}
