import { toDDMMYYYY } from "../../helpers/dataFormatter";
import { router } from "../../scripts/router";

export const infoCard = (container, patientData) => {
    const patientInfo = `
        <div class="row mb-2">
            <div class="col mb-auto mt-auto">
                <div class="d-flex justify-content-start">
                    <h1 class="fw-bold">Медицинская карта пациента</h1>
                </div>
            </div>
            <div class="col mb-auto mt-auto">
                <div class="d-flex justify-content-end">
                    <button class="btn btn-info text-light btn-sm" id="addNewInspection">Добавить
                        осмотр</button>
                </div>
            </div>
        </div>
        <div class="row mb-1">
            <div class="col mb-auto mt-auto">
                <div class="d-flex justify-content-start mt-auto">
                    <h3>${patientData.name} <img src='../../assets/${patientData.gender}.svg'/></h3>
                    
                </div>
            </div>
            <div class="col mb-auto mt-auto">
                <div class="d-flex justify-content-end align-items-center">
                    <p>Дата рождения: ${patientData.birthday ? toDDMMYYYY(patientData.birthday) : 'не указана'}</p>
                </div>
            </div>
        </div>
    `;

    container.innerHTML = patientInfo;

    const addInspectionButton = document.getElementById('addNewInspection')
    addInspectionButton.addEventListener('click', () => {
        if (localStorage.getItem('prevId')) {localStorage.removeItem('prevId')}
        localStorage.setItem('patientId', patientData.id)
        window.history.pushState({}, '', `/inspection/create`);
        router.resolve();
    })
};
