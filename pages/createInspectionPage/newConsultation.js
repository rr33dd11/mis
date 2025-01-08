import { selectSpeciality } from "../../components/selectSpeciality"

export const newConsultation = (container) => {
    const consultation = document.createElement('div')
    consultation.classList.add('consultation')
    consultation.innerHTML = `
        <div class='col'>
            <small>Специализация</small>
            <select id='specialitySelect' class="form-select specialitySelect"></select>
        </div>
        <div class="mb-3">
            <small>Комментарий</small>
            <textarea class="form-control comment" rows="2"></textarea>
        </div>
        <div class='mb-1 mt-3 row justify-content-end'>
            <div class='col-auto'>
                <button id='remove' type="button" class="btn btn-outline-danger btn-sm">Удалить консультацию</button>
            </div>
        </div>
    `

    container.appendChild(consultation)

    const deleteButton = consultation.querySelector('#remove')
    deleteButton.addEventListener('click', () => {
        container.removeChild(consultation)
    })

    selectSpeciality()
}