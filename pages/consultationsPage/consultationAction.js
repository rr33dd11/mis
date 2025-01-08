import { api } from "../../axios/api"
import { filterForm } from "../patientPage/filterForm"
import { createPaginationBlock } from "../../components/paginationBlock"
import { InspectionCard } from "../../components/inspection"

export async function consultationAction() {
    const filerFormContainer = document.getElementById('filterForm')
    const consulationsStorage = document.getElementById('consulationsStorage')
    
    filterForm(filerFormContainer)

    async function getInspectionsRequest(search) {
        try {
            const response = await api.get(`/consultation`, {params: search})
            return response.data
        }
        catch (error) {
            //обработать 400 -- высветить такого пациента нет
        }   
    }

    const search = new URLSearchParams(window.location.search)
    const isGrouped = search.get('grouped') === 'true'
    const inspectionsData = await getInspectionsRequest(search);
    const inspections = inspectionsData.inspections;
    const pagination = inspectionsData.pagination;
    if (inspections && Array.isArray(inspections)) {
        inspections.map((inspection) => InspectionCard(inspection, consulationsStorage, 'consultation', isGrouped));
    }
    createPaginationBlock(pagination) 
}