import { api } from "../../axios/api"
import { getInfo } from "../../helpers/formHelpers"
import { validator } from "../createInspectionPage/createInspectionValidator"

export const editModal = (data, id) => {
    const storage = document.getElementById('editModalContainer')
    storage.innerHTML = `
        <div class="modal fade" id="editModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title">Редактирование осмотра</h3>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id='editInspectionForm'>
                            <div class='row g-3'>
                                <div class="col-12 ">
                                    <div class="card text-bg-light">
                                        <div id='complaints' class="card-body">
                                            <h5>Жалобы</h5>
                                            <textarea class="form-control" name='complaints' rows="2"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 ">
                                    <div class="card text-bg-light">
                                        <div id='anamnesis' class="card-body">
                                            <h5>Анамнез заболевания</h5>
                                            <textarea class="form-control" name='anamnesis' rows="2"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 ">
                                    <div class="card text-bg-light">
                                        <div id='treatment' class="card-body">
                                            <h5>Рекомендация по лечению</h5>
                                            <textarea class="form-control" name='treatment' rows="2"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 ">
                                    <div class="card text-bg-light">
                                        <div class="card-body">
                                            <h5>Заключение</h5>
                                            <div class='row'>
                                                <div class='col-md-6'>
                                                    <label class='mb-2' for='conclusion'>Заключение</label>
                                                    <select class="form-select" name='conclusion' id='conclusion'>
                                                        <option value="Recovery">Выздоровление</option>
                                                        <option value="Disease">Болезнь</option>
                                                        <option value="Death">Смерть</option>
                                                    </select>
                                                </div>
                                                <div class='col-md-6' id='eventDate'>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class='d-flex justify-content-center'>
                        <div class='row g-1 mb-3'>
                            <div class='col-auto'><button id='saveChanges' type="button" class="btn btn-primary">Сохранить изменения</button></div>
                            <div class='col-auto'><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `

    const conclusionSelect = document.getElementById('conclusion')
    conclusionSelect.addEventListener('change', () => {
       const currentValue = conclusionSelect.value
       const eventDiv = document.getElementById('eventDate')
        if (currentValue == 'Death') {
            eventDiv.innerHTML = `
                <label class='mb-2' for="deathDate">Дата и время смерти</label>
                <input type="datetime-local" id="deathDate" class="form-control" name="deathDate" />`
        }
        else if (currentValue == 'Recovery') {
            eventDiv.innerHTML = ``
        }
        else {
            eventDiv.innerHTML = `
                <label class='mb-2' for="nextVisitDate">Дата следующего визита</label>
                <input type="datetime-local" min=${new Date().toISOString().slice(0, 16)} id="nextVisitDate" class="form-control" name="nextVisitDate" />`
        }
    
    })


    document.querySelector('textarea[name="complaints"]').value = data.complaints;
    document.querySelector('textarea[name="anamnesis"]').value = data.anamnesis;
    document.querySelector('textarea[name="treatment"]').value = data.treatment;
    document.querySelector('select[name="conclusion"]').value = data.conclusion;

    const eventDiv = document.getElementById('eventDate')
    if (data.conclusion == 'Death') {
        eventDiv.innerHTML = `
            <label class='mb-2' for="deathDate">Дата и время смерти</label>
            <input type="datetime-local" id="deathDate" class="form-control" name="deathDate" />`
            document.querySelector('input[name="deathDate"]').value = data.deathDate.slice(0, 16);
    }
    else if (data.conclusion == 'Disease') {
        eventDiv.innerHTML = `
            <label class='mb-2' for="nextVisitDate">Дата следующего визита</label>
            <input type="datetime-local" min=${new Date().toISOString().slice(0, 16)} id="nextVisitDate" class="form-control" name="nextVisitDate" />`
            document.querySelector('input[name="nextVisitDate"]').value = data.nextVisitDate.slice(0, 16);
    }


    const saveChangesButton = document.getElementById('saveChanges')
    saveChangesButton.addEventListener('click', async (event) => {
        event.preventDefault()
        const data = getInfo(document.getElementById('editInspectionForm'))
        await api.put(`/inspection/${id}`, data)
    })
    
}