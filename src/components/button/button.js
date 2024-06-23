import './button.css'

export const button = ({ texto = 'Pon aquí tu texto' }) => {
  return `<button class="main-button">${texto}</button>`
}
