import { api } from "../../axios/api"
import { infoCard } from "./infoCard"
import { filterForm } from "./filterForm"
import { createPaginationBlock } from "../../components/paginationBlock"
import { InspectionCard } from "../../components/inspection"

export async function patientAction(params) {
    const infoContainer = document.getElementById('patientInfo')
    const filerFormContainer = document.getElementById('filterForm')
    const inspectionsStorage = document.getElementById('inspectionsStorage')

    const getPatientInfo = async (id) => {
        try {
            const responsePatientInfo = await api.get(`/patient/${id}`)
            return responsePatientInfo.data
        }
        catch (error) {
            //при 404 кинуть на страницу нот фаунда
        }
    }
    
    const patientInfo = await getPatientInfo(params.data.id)
    infoCard(infoContainer, patientInfo)
    filterForm(filerFormContainer)

    async function getInspectionsRequest(id, search) {
        try {
            const response = await api.get(`/patient/${id}/inspections`, {params: search})
            return response.data
        }
        catch (error) {
            //обработать 400 -- высветить такого пациента нет
        }   
    }

    const search = new URLSearchParams(window.location.search)
    const isGrouped = search.get('grouped') === 'true'
    const inspectionsData = await getInspectionsRequest(params.data.id, search);
    const inspections = inspectionsData.inspections;
    const pagination = inspectionsData.pagination;
    if (inspections && Array.isArray(inspections)) {
        inspections.map((inspection) => InspectionCard(inspection, inspectionsStorage, 'inspection', isGrouped));
    }
    createPaginationBlock(pagination) 
}