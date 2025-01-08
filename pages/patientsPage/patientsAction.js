import {modalNewPatient} from './modalNewPatient'
import { filterForm } from './filterForm'
import { api } from '../../axios/api'
import { PatientCard } from './patientCard'
import { createPaginationBlock } from '../../components/paginationBlock'

export async function patientsAction() {

    const modalContainer = document.getElementById('modalNewPatient')
    const filerFormContainer = document.getElementById('filterForm')
    const patientsStorage = document.getElementById('patientsStorage')
    
    modalNewPatient(modalContainer)
    filterForm(filerFormContainer)

    const params = new URLSearchParams(window.location.search)

    async function getPatientsRequest(params) {
        try {
            const response = await api.get('/patient', {params: params})
            return response.data
        }
        catch (error) {
            
        }   
    }

    const patientsData = await getPatientsRequest(params);
    const patients = patientsData.patients;
    const pagination = patientsData.pagination;
    if (patients && Array.isArray(patients)) {
        patients.map((patient) => PatientCard(patient, patientsStorage));
    }
    createPaginationBlock(pagination) 
}