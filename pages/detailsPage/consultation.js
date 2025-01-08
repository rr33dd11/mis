export const Consultation = (data, container) => {
    const consultation = document.createElement('div')
    consultation.classList.add('mt-3')
    consultation.innerHTML = `
        <p class='mb-2'>Специализация консультанта ${data.speciality.name}</p>
    `

    container.appendChild(consultation)
}