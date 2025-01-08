import { api } from '../axios/api'
import { toDDMMYYYY } from '../helpers/dataFormatter'
import { router } from '../scripts/router'

export const InspectionCard = async (data, container, variant, isGrouped) => {

    const inspectionCard = document.createElement('div')
    inspectionCard.classList.add(isGrouped && data.previousId ? 'col' : 'col-lg-6');
    if (isGrouped && data.previousId) {
        inspectionCard.classList.add('mt-2');
    }

    inspectionCard.innerHTML = `
        <div class="card ${data.conclusion == 'Death' && variant == 'inspection' ? 'bg-warning-subtle' : 'text-bg-light'}">
            <div class="card-body">
                <div class="row mb-2 align-items-center">
                    <div class="col mb-auto mt-auto">
                        <div class="d-flex justify-content-start">
                            <h5>Амбулаторный осмотр</h5>
                        </div>
                    </div>
                    <div class="col mb-auto mt-auto">
                        <div class="d-flex justify-content-end">
                            <a class="btn btn-secondary btn-sm disabled" name="date" role="button">${toDDMMYYYY(data.date)}</a>
                            <button class="d-none ms-1 btn btn-secondary btn-sm" id="showMore">+</button>
                        </div>
                    </div>
                </div>
                <div class="row mb-2">
                    <div class="col mb-auto mt-auto">

                        <div class="d-flex justify-content-start">
                            <a class="text-primary link-underline link-underline-opacity-0" href="/inspection/${data.id}" id="details"><img
                                    src="../assets/note.svg">Детали осмотра</a>
                        </div>
                    </div>
                    <div class="col mb-auto mt-auto">
                        <div class="d-flex justify-content-end ${data.conclusion == 'Death' || variant == 'consultation' ? 'd-none' : ''}">
                            <a class="text-primary link-underline link-underline-opacity-0" id="addInspection"
                                name="hasNested" href="/inspection/create"><img src="../assets/search.svg">Добавить осмотр</a>
                        </div>
                    </div>
                </div>

                <p class="mb-1">Заключение: ${data.conclusion == 'Disease' ? 'болезнь' : data.conclusion == 'Death' ? 'смерть' : 'выздоровление'}</p>
                <p class="mb-1">Основной диагноз: ${data.diagnosis.name} (${data.diagnosis.code})</p>
                <p class="mb-1 fw-light">Медицинский работник: ${data.doctor}</p>
            </div>
        </div>
        <div class='d-none' id="${data.id}"></div>
    `

    container.appendChild(inspectionCard)

    const addInspection = inspectionCard.querySelector('#addInspection')
    const pathInspection = addInspection.getAttribute('href')
    addInspection.addEventListener('click', e => {
        e.preventDefault();
        localStorage.setItem('prevId', data.id)
        localStorage.setItem('patientId', data.patientId)
        window.history.pushState({}, '', pathInspection);
        router.resolve();
    });

    const details = inspectionCard.querySelector('#details')
    const pathDetails = details.getAttribute('href')
    details.addEventListener('click', e => {
        e.preventDefault();
        window.history.pushState({}, '', pathDetails);
        router.resolve();
    });

    const getInspectionChain = async (id) => {
        return await api.get(`/inspection/${id}/chain`)
    }

    const setTree = async () => {
        const level = !data.previousId ? 1 : Number(document.getElementById(data.previousId).getAttribute('level')) + 1
        const chainStorage = inspectionCard.querySelector(`[id="${data.id}"]`)
        if (level < 3) {
            chainStorage.classList.add('ps-3')
        }
        chainStorage.setAttribute('level', level)

        if (data.hasChain) {
            const inspectionsChainResponse = await getInspectionChain(data.id)
            const inspections = inspectionsChainResponse.data;
            if (inspections && Array.isArray(inspections)) {

                inspections.map((inspection) => {
                    const inspectionsStorage = inspectionCard.querySelector(`[id="${inspection.previousId}"]`)
                    InspectionCard(inspection, inspectionsStorage, variant, isGrouped);
                })
            }
        }

        if (data.hasNested) {
            const showMoreButton = inspectionCard.querySelector('#showMore') 
            showMoreButton.classList.remove('d-none')
            showMoreButton.addEventListener('click', () => {
                if (chainStorage.classList.contains('d-none')) {
                    chainStorage.classList.remove('d-none')
                    showMoreButton.innerText = '-'
                }
                else {
                    chainStorage.classList.add('d-none')
                    showMoreButton.innerText = '+'
                }
            })
        }
    }

    if (isGrouped) {
        await setTree()
    }
}