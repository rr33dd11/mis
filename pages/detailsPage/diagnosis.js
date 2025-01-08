export const Diagnosis = (data, container) => {
    const diagnosis = document.createElement('div')
    diagnosis.classList.add('mt-3')
    diagnosis.innerHTML = `
        <p class='mb-2'><strong>(${data.code}) ${data.name}</strong></p>
        <p class="card-text --bs-light-text-emphasis mb-1">
            <small>Тип в осмотре: ${data.type == 'Main' ? 'Основной' : data.type == 'Concomitant' ? 'Сопутствующий' : 'Осложнение'}</small>
        </p>
        <p class="card-text --bs-light-text-emphasis">
            <small>Расшифровка: ${data.description ? data.description : 'отсутствует'}</small>
        </p>
    `

    container.appendChild(diagnosis)
}