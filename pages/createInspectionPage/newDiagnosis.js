import { selectDiagnosis } from "../../components/selectDiagnosis"

export const newDiagnosis = (container, index) => {
    const diagnosis = document.createElement('div')
    diagnosis.classList.add('diagnosisBox')
    diagnosis.innerHTML = `
        <label class="mt-3" for="diagnosis">Болезни</label>
        <select class="form-select mb-2 diagnosis" id="diagnosis" data-placeholder="Выбрать" name="icdDiagnosisId" required></select>
        <input class="form-control mt-2 mb-2 description" placeholder='Описание'>
        <p>Тип диагноза в осмотре</p>
        <div class='mb-2'>
            <div class="form-check form-check-inline">
                <input class="form-check-input type" name='diagnoses${index}' type="radio" id="main${index}" value="Main">
                <label class="form-check-label" for="main${index}">Основной</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input type" name='diagnoses${index}' type="radio" id="concomitant${index}" value="Concomitant">
                <label class="form-check-label" for="concomitant${index}">Сопутствующий</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input type" name='diagnoses${index}' type="radio" id="complication${index}" value="Complication">
                <label class="form-check-label" for="complication${index}">Осложнение</label>
            </div>
        </div>
        <div class='mb-1 mt-3 row justify-content-end'>
            <div class='col-auto'>
                <button id='remove' type="button" class="btn btn-outline-danger btn-sm">Удалить диагноз</button>
            </div>
        </div>
    `

    container.appendChild(diagnosis)

    const deleteButton = diagnosis.querySelector('#remove')
    deleteButton.addEventListener('click', () => {
        container.removeChild(diagnosis)
    })

    selectDiagnosis()
}