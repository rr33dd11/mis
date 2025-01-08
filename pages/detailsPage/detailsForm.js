import { toDDMMYYYY, toDDMMYYYYhhmm } from "../../helpers/dataFormatter"
import { Consultation } from "./consultation";
import { Diagnosis } from "./diagnosis";
import { editModal } from "./editModal";

export const DetailsForm = (data, container, id) => {
    const detailsForm = `
        <div class='row g-2'>
            <div class="col-12 ">
                <div class="card text-bg-light">
                    <div class="card-body">
                        <div class='row'>
                            <div class='col-auto me-auto'><h3 class="card-title">Амбулаторный осмотр от ${toDDMMYYYYhhmm(data.createTime)}</h3></div>
                            <div class='col-auto'>
                                <button id='edit' type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal">
                                    Редактировать осмотр
                                </button>
                                <div id='editModalContainer'></div>
                            </div>
                        </div>
                        <p class="card-text mb-1"><strong><small>Пациент: ${data.patient.name}</small></strong></p>
                        <p class="card-text mb-1"><small>Пол: ${data.patient.gender == 'Male' ? 'мужской' : 'женский'}</small></p>
                        <p class="card-text mb-2"><small>Дата рождения: ${data.birthday ? toDDMMYYYY(data.birthday) : 'не указана'}</small></p>
                        <p class="card-text mb-1"><small>Медицинский работник: ${data.doctor.name}</small></p>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="card text-bg-light">
                    <div class="card-body">
                        <h4 class="card-title">Жалобы</h4>
                        <p class="card-text"><small>${data.complaints}</small></p>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="card text-bg-light">
                    <div class="card-body">
                        <h4 class="card-title">Анамнез заболевания</h4>
                        <p class="card-text"><small>${data.anamnesis}</small></p>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="card text-bg-light">
                    <div class="card-body">
                        <h4 class="card-title">Консультация</h4>
                        <div id='consultationsStorage'></div>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="card text-bg-light">
                    <div class="card-body" id='diagnosisStorage'>
                        <h4 class="card-title">Диагнозы</h4>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="card text-bg-light">
                    <div class="card-body">
                        <h4 class="card-title">Рекомендации по лечению</h4>
                        <p class="card-text"><small>${data.treatment}</small></p>
                    </div>
                </div>
            </div>
            <div class="col-12 mb-3">
                <div class="card text-bg-light">
                    <div class="card-body">
                        <h4 class="card-title">Заключение</h4>
                        <p class="card-text mb-1"><small><strong>${data.conclusion == 'Death'
                            ? 'Смерть' 
                            : data.conclusion == 'Recovery' 
                                ? 'Выздоровление' 
                                : 'Болезнь'}
                        </strong></small></p>
                        <p class="card-text"><small>${data.conclusion == 'Death'
                            ? `Дата смерти: ${toDDMMYYYYhhmm(data.deathDate)}` 
                            : data.conclusion == 'Recovery' 
                                ? '' 
                                : `Дата следующего визита: ${toDDMMYYYYhhmm(data.nextVisitDate)}` }
                        </small></p>
                    </div>
                </div>
            </div>
        </div >
    `

    container.innerHTML = detailsForm

    const editButton = document.getElementById('edit')
    if (data.doctor.id != localStorage.getItem('myId')) {
        editButton.setAttribute('disabled', '')
    }

    editModal(data, id)
    
    const diagnosisStorage = document.getElementById('diagnosisStorage')
    data.diagnoses.forEach(diagnosis => Diagnosis(diagnosis, diagnosisStorage));
    const consultationsStorage = document.getElementById('consultationsStorage')
    data.consultations.forEach(consultation => Consultation(consultation, consultationsStorage))
}