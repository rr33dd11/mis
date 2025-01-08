export const consultationsHandler = () => {
    let consultations = [];
    const consultationStorage = document.getElementById('consultationStorage')
    const cons = consultationStorage.querySelectorAll('.consultation')
    cons.forEach((con) => {
        const speciality = con.querySelector('.specialitySelect')
        const comment = con.querySelector('.comment')

        const currentConsultation = {
            'specialityId': speciality.value,
            'comment': {
                'content': comment.value
            }
        };

        consultations.push(currentConsultation)
    });

    return consultations
}