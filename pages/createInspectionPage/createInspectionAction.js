import { api } from "../../axios/api"
import { selectSpeciality } from "../../components/selectSpeciality"
import { patientInfo } from "./patientInfo"
import { checkInspection } from "./checkInspection"
import { newConsultation } from "./newConsultation"
import { newDiagnosis } from "./newDiagnosis"
import { selectDiagnosis } from "../../components/selectDiagnosis"
import { router } from "../../scripts/router"
import { getInfo } from "../../helpers/formHelpers"
import { consultationsHandler } from "./consultationsHandler"
import { diagnosesHandler } from "./diagnosisHandler"
import { validator } from "./createInspectionValidator"
import axios from "axios"

export async function createInspectionAction() {
    const patientId = localStorage.getItem('patientId')
    const prevId = localStorage.getItem('prevId')

    let index = 1;

    const patientInfoRequest = async (id) => {
        try {
            const response = await api.get(`/patient/${id}`)
            return response;
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.status == 404) {
                    router.navigate('/notfound')
                }
            }
        }
    }

    const patientInfoResponse = await patientInfoRequest(patientId)
    const patientInfoDiv = document.getElementById('patientInfo')
    patientInfo(patientInfoResponse.data, patientInfoDiv)  

    const checkInspectionDiv = document.getElementById('checkInspection')
    checkInspection(prevId, checkInspectionDiv, patientId)

    selectDiagnosis()

    const needAuthCheck = document.getElementById('needCons');
    needAuthCheck.addEventListener('click', () => {
        const disables = document.querySelectorAll('.canBeDisabled')
        if (needAuthCheck.checked) {
            disables.forEach((element) => {
                element.removeAttribute('disabled')
                selectSpeciality()
            })
        }
        else {
            const consultationsDiv = document.getElementById('otherConsultations')
            consultationsDiv.innerHTML = ''
            disables.forEach((element) => {
                element.setAttribute('disabled', '')
            })
            const select = document.querySelector('.specialitySelect')
            select.innerHTML = ''           
        }
    })

    const addNewConsultation = document.getElementById('addNewConsultation')
    addNewConsultation.addEventListener('click', () => {
        const consultationsDiv = document.getElementById('otherConsultations')
        newConsultation(consultationsDiv)
        
    })

    const addNewDiagnosis = document.getElementById('addNewDiagnosis')
    addNewDiagnosis.addEventListener('click', () => {
        const diagnosisDiv = document.getElementById('otherDiagnoses')
        newDiagnosis(diagnosisDiv, index)
        index++;
    })


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

    const cancelButton = document.getElementById('cancel')
    cancelButton.addEventListener('click', () => {
        window.history.pushState({}, '', `/patient/${localStorage.getItem('patientId')}`);
        router.resolve();
    })

    const confirmButton = document.getElementById('confirm')
    confirmButton.addEventListener('click', async () => {
        const form = document.getElementById('inspectionCreate')
        const data = getInfo(form)
        data.consultations = consultationsHandler()
        data.diagnoses = diagnosesHandler()
        
        if (validator(data)) {
            await api.post(`/patient/${patientId}/inspections`, data)
            window.history.pushState({}, '', `/patient/${localStorage.getItem('patientId')}`);
            router.resolve();
        }

    })


}