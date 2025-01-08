import { toDDMMYYYY } from '../../helpers/dataFormatter'
import { router } from '../../scripts/router'

export const PatientCard = (data, container) => {
    const patientCard = document.createElement('div')
    patientCard.classList.add('col-md-6')
    patientCard.innerHTML = `
            <div class="card text-bg-light">
                <div class="card-body">
                    <h5 class="card-title">
                        <a id='link' href="/patient/${data.id}" class="text-reset link-underline link-underline-opacity-0">
                            ${data.name}
                        </a>
                    </h5>
                    <p class="mb-1">Пол —  <b>${data.gender == 'Male' ? 'Мужчина' : 'Женщина'}</b></p>
                    <p class="mb-1">Дата рождения — ${data.birthday ? toDDMMYYYY(data.birthday) : 'Не указана'}</p>
                </div>
            </div>
    `

    container.appendChild(patientCard)

    const link = document.getElementById('link')
    const path = link.getAttribute('href')
    link.addEventListener('click', e => {
        e.preventDefault();
        router.navigate(path);
    });
}