import { api } from "../../axios/api"
import { DetailsForm } from "./detailsForm"

export async function detailsAction(id) {

    const getDetails = async (id) => {
        try {
            const response = await api.get(`/inspection/${id}`)
            return response
        }
        catch (error) {

        }
    }

    const getDetailsResponse = await getDetails(id)
    const detailsData = getDetailsResponse.data;

    const formContainer = document.getElementById('details')
    DetailsForm(detailsData, formContainer, id)


    
}