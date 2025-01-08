import { toDDMMYYYYhhmm } from "../../helpers/dataFormatter";
import { api } from "../../axios/api";

export const checkInspection = async (prevId, container, patientId) => { 
    
    const checkInspection = `
        <div class='row mb-2'>
            <div class='col-auto pe-2'>Первичный осмотр</div>
                <div class='col-auto px-0'>
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" role="switch" id="switchInspection" ${prevId ? 'checked' : ''}>
                    </div>
                </div>
            <div class='col-auto px-0'>Повторный осмотр</div>
        </div>
        <div id='prevInsp' class='col-md-4 ${prevId ? '' : 'd-none'} mb-2'>
            <label class='mb-2' for="previousInspectionId">Предыдущий осмотр</label>
            <select id="previousInspectionId" class="form-control" name="previousInspectionId"></select>
        </div>
        <div id='date' class='col-md-4'>
            <label class='mb-2' for="datePicker">Дата осмотра</label>
            <input type="datetime-local" max=${new Date().toISOString().slice(0, 16)} id="datePicker" class="form-control" name="date" />
        </div>
        
    `

    container.innerHTML = checkInspection;

    const switchInsp = document.getElementById('switchInspection')
    switchInsp.addEventListener('click', () => {
        const prevInsp = document.getElementById('prevInsp');
        prevInsp.classList.contains('d-none') ? prevInsp.classList.remove('d-none') : prevInsp.classList.add('d-none')
    })

    const searchInspections = async (id) => {
        try {
            const response = await api.get(`/patient/${id}/inspections/search`)
            return response;
        }
        catch (error) {

        }
    }

    const searchInspectionsResponse = await searchInspections(patientId)
    const searchData = searchInspectionsResponse.data

    const selectElement = document.getElementById('previousInspectionId');

    searchData.forEach((item) => {
        const option = document.createElement('option');
        option.value = item.id;
        if (item.id == prevId) {
            option.selected = true;
        }
        option.textContent = `${toDDMMYYYYhhmm(item.date)} ${item.diagnosis.code} - ${item.diagnosis.name}`;
        selectElement.appendChild(option);
    });
}