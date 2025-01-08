import { toDDMMYYYY } from "../../helpers/dataFormatter"

export const patientInfo = (data, container) => {
    const row = document.createElement('div')
    row.classList.add('row')

    const info = `
        <div class='col-auto me-auto'><h4 class="card-title">${data.name} <img src='../../assets/${data.gender}.svg'/></h4></div>
        <div class='col-auto'><p class='card-text'>Дата рождения: ${data.birthdate ? toDDMMYYYY(data.birthdate) : 'не указана'}</p></div>    
    `
    row.innerHTML = info
    container.appendChild(row)
}